export interface Env {
  ASSETS: {
    fetch: (request: Request) => Promise<Response>;
  };
  GEMINI_API_KEY?: string;
}

type ChatRole = 'user' | 'model';

interface IncomingMessage {
  role: ChatRole;
  text: string;
}

const VALID_TREATMENT_IDS = new Set([
  'massage',
  'facial',
  'scrub',
  'waxing',
  'manipedi',
  'makeup_hair',
]);

const THERAPIST_SYSTEM_INSTRUCTION = `You are the AI Spa Therapist & Skincare Advisor for Evita Sinzala's private spa and cosmetology studio in Siavonga, Southern Province, Zambia (Plot 970, Siavonga).

Your role is to provide warm, practical, evidence-informed healthy skin tips, self-care routines, and healthy spa lifestyle guidance tailored to the user's questions—taking into account warm sunny climates like Siavonga / Lake Kariba when relevant (e.g., hydration, gentle cleansing, daily broad-spectrum sunscreen, avoiding harsh over-exfoliation, scalp & hair moisture care, and skin prep before makeup).

Evita Sinzala's real services (Certified Cosmetology Professional, ASHCA School of Beauty Lusaka):
- massage: Professional Massage Therapy (Swedish relaxation, deep tension relief, back & shoulder recovery)
- facial: Facial Treatments & Skincare Services (hydrating botanical facial, clarifying cleanse, sun-soothing glow care)
- scrub: Body Scrubs & Body-Care Treatments (mineral/sugar polish, gentle exfoliation, nourishing body care)
- waxing: Hygienic Waxing Services (gentle hair removal, skin-soothing pre/post care)
- manipedi: Manicure, Pedicure & Nails (K100–K260: gel polish, spa pedicure, acrylic overlay/extensions, combo care)
- makeup_hair: Makeup & Hair Styling (K200–K450: natural soft glam, occasion makeup, silk press/blowout, braids & styling, bridal/VIP package up to K450)

Guidelines:
1. Keep replies clear, calm, practical, and easy to read (about 90 to 160 words, using short paragraphs or clean numbered steps).
2. NEVER use markdown formatting or asterisks (** or *) anywhere in your response. Write clean plain text only.
3. Always give actionable healthy skin tips or healthy wellness tips (hydration, sleep, gentle cleansers, SPF, post-treatment aftercare, nail/hair health, muscle stretching, stress relief).
4. Include a concise, memorable takeaway tip in "skinCareTip" (max 18 words, plain text with no asterisks).
5. In "recommendedTreatments", include 0 to 2 matching treatment IDs strictly from: ["massage", "facial", "scrub", "waxing", "manipedi", "makeup_hair"] only when genuinely relevant to the user's question.
6. For persistent rashes, infections, severe acne, or medical conditions, kindly advise consulting a licensed dermatologist or healthcare clinician alongside gentle daily skincare.`;

function stripMarkdownStars(text: string): string {
  return text
    .replace(/\*\*/g, '')
    .replace(/^\s*\*\s+/gm, '• ')
    .replace(/\*/g, '')
    .replace(/^#+\s+/gm, '')
    .trim();
}

const JSON_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

async function callGeminiApi(
  apiKey: string,
  sanitizedMessages: IncomingMessage[]
): Promise<Response> {
  const models = [
    'gemini-2.5-flash',
    'gemini-2.5-flash-lite',
    'gemini-2.0-flash',
    'gemini-2.0-flash-lite',
    'gemini-1.5-flash',
  ];
  let lastError: Error | null = null;
  let sawRateLimitOrOverload = false;

  for (const model of models) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      const contents = sanitizedMessages.map((msg) => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text.trim() }],
      }));

      const payload = {
        system_instruction: {
          parts: [{ text: THERAPIST_SYSTEM_INSTRUCTION }],
        },
        contents,
        generationConfig: {
          response_mime_type: 'application/json',
          response_schema: {
            type: 'OBJECT',
            properties: {
              reply: {
                type: 'STRING',
                description:
                  'Helpful, warm, structured spa therapist advice covering healthy skin and wellness tips.',
              },
              skinCareTip: {
                type: 'STRING',
                description:
                  'One concise daily healthy skin or wellness takeaway (10-18 words).',
              },
              recommendedTreatments: {
                type: 'ARRAY',
                items: { type: 'STRING' },
                description:
                  'Optional array of 0-2 relevant treatment IDs from: massage, facial, scrub, waxing, manipedi, makeup_hair.',
              },
            },
            required: ['reply', 'skinCareTip', 'recommendedTreatments'],
          },
        },
      };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'evita-spa-worker/1.0',
        },
        body: JSON.stringify(payload),
      });

      if (res.status === 404) {
        // Model not found, try next fallback model
        continue;
      }

      if (res.status === 503 || res.status === 429 || res.status === 500 || res.status === 502) {
        // Model temporarily overloaded or rate-limited — automatically try the next model
        sawRateLimitOrOverload = true;
        continue;
      }

      if (!res.ok) {
        const errBody = await res.text();
        let message = `Gemini API error (status ${res.status})`;
        try {
          const parsedErr = JSON.parse(errBody) as { error?: { message?: string } };
          if (parsedErr.error?.message) {
            message = parsedErr.error.message;
          }
        } catch {
          // Keep raw
        }

        if (res.status === 400 || res.status === 403 || res.status === 401) {
          return new Response(
            JSON.stringify({
              error:
                'Unable to authenticate with Gemini. Please verify your GEMINI_API_KEY secret on Cloudflare.',
            }),
            { status: 403, headers: JSON_HEADERS }
          );
        }

        throw new Error(message);
      }

      const data = (await res.json()) as {
        candidates?: Array<{
          content?: {
            parts?: Array<{ text?: string }>;
          };
        }>;
      };

      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? '';
      if (!rawText) {
        return new Response(
          JSON.stringify({
            error:
              'The AI Spa Therapist returned an empty response. Please try asking again.',
          }),
          { status: 502, headers: JSON_HEADERS }
        );
      }

      let parsed: {
        reply?: string;
        skinCareTip?: string;
        recommendedTreatments?: string[];
      };

      try {
        parsed = JSON.parse(rawText);
      } catch {
        parsed = {
          reply: rawText,
          skinCareTip:
            'Drink water steadily throughout the day and protect skin with gentle daily SPF.',
          recommendedTreatments: [],
        };
      }

      const recommendedTreatments = Array.isArray(parsed.recommendedTreatments)
        ? parsed.recommendedTreatments
            .filter((id): id is string => typeof id === 'string' && VALID_TREATMENT_IDS.has(id))
            .slice(0, 2)
        : [];

      return new Response(
        JSON.stringify({
          reply: stripMarkdownStars(
            typeof parsed.reply === 'string' ? parsed.reply : rawText
          ),
          skinCareTip: stripMarkdownStars(
            typeof parsed.skinCareTip === 'string' ? parsed.skinCareTip : ''
          ),
          recommendedTreatments,
        }),
        { status: 200, headers: JSON_HEADERS }
      );
    } catch (err: unknown) {
      lastError = err instanceof Error ? err : new Error(String(err));
    }
  }

  if (sawRateLimitOrOverload && !lastError) {
    return new Response(
      JSON.stringify({
        error:
          'The AI Spa Therapist is temporarily busy. Please wait a few seconds and try your question again.',
      }),
      { status: 503, headers: JSON_HEADERS }
    );
  }

  return new Response(
    JSON.stringify({
      error:
        lastError?.message ||
        'Unable to reach the AI Spa Therapist right now. Please try again in a moment.',
    }),
    { status: 500, headers: JSON_HEADERS }
  );
}

async function handleTherapistChat(
  request: Request,
  env: Env
): Promise<Response> {
  const apiKey = env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return new Response(
      JSON.stringify({
        error:
          'GEMINI_API_KEY is not configured yet. Run `wrangler secret put GEMINI_API_KEY` or add it under Cloudflare Settings > Variables and Secrets.',
      }),
      { status: 500, headers: JSON_HEADERS }
    );
  }

  try {
    const body = (await request.json()) as { messages?: IncomingMessage[] };
    const rawMessages = Array.isArray(body?.messages) ? body.messages : [];

    const sanitizedMessages = rawMessages
      .filter(
        (m): m is IncomingMessage =>
          Boolean(m) &&
          (m.role === 'user' || m.role === 'model') &&
          typeof m.text === 'string' &&
          m.text.trim().length > 0
      )
      .slice(-12);

    if (sanitizedMessages.length === 0) {
      return new Response(
        JSON.stringify({
          error:
            'Please enter a skincare or wellness question to ask the AI Spa Therapist.',
        }),
        { status: 400, headers: JSON_HEADERS }
      );
    }

    return await callGeminiApi(apiKey, sanitizedMessages);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return new Response(
      JSON.stringify({
        error: `Could not parse request: ${message}`,
      }),
      { status: 400, headers: JSON_HEADERS }
    );
  }
}

export default {
  async fetch(
    request: Request,
    env: Env
  ): Promise<Response> {
    const url = new URL(request.url);

    // 1. CORS Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: JSON_HEADERS,
      });
    }

    // 2. Health check
    if (url.pathname === '/api/health') {
      return new Response(
        JSON.stringify({
          status: 'ok',
          service: 'Evita Sinzala Spa Studio',
          timestamp: new Date().toISOString(),
        }),
        { status: 200, headers: JSON_HEADERS }
      );
    }

    // 3. AI Therapist API Endpoint
    if (url.pathname === '/api/therapist-chat') {
      if (request.method !== 'POST') {
        return new Response(
          JSON.stringify({ error: 'Method Not Allowed. Use POST.' }),
          { status: 405, headers: JSON_HEADERS }
        );
      }
      return await handleTherapistChat(request, env);
    }

    // 4. Static Assets with Single Page Application Fallback
    try {
      let response = await env.ASSETS.fetch(request);

      // If static file is not found (404) and this is an HTML route request, serve index.html
      if (response.status === 404 && !url.pathname.includes('.')) {
        const spaRequest = new Request(new URL('/index.html', request.url), request);
        response = await env.ASSETS.fetch(spaRequest);
      }

      return response;
    } catch {
      return new Response('Not Found', { status: 404 });
    }
  },
};
