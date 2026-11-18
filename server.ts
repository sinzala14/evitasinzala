import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GoogleGenAI, Type } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

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
1. Keep replies clear, calm, practical, and easy to read (about 90 to 160 words, using short paragraphs or clean numbered/bulleted steps without heavy markdown clutter).
2. Always give actionable healthy skin tips or healthy wellness tips (hydration, sleep, gentle cleansers, SPF, post-treatment aftercare, nail/hair health, muscle stretching, stress relief).
3. Include a concise, memorable takeaway tip in "skinCareTip" (max 18 words).
4. In "recommendedTreatments", include 0 to 2 matching treatment IDs strictly from: ["massage", "facial", "scrub", "waxing", "manipedi", "makeup_hair"] only when genuinely relevant to the user's question.
5. For persistent rashes, infections, severe acne, or medical conditions, kindly advise consulting a licensed dermatologist or healthcare clinician alongside gentle daily skincare.`;

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    throw new Error('MISSING_API_KEY');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function startServer(): Promise<void> {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.post('/api/therapist-chat', async (req: Request, res: Response) => {
    try {
      const body = req.body as { messages?: IncomingMessage[] };
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
        res.status(400).json({
          error: 'Please enter a skincare or wellness question to ask the AI Spa Therapist.',
        });
        return;
      }

      const ai = getGeminiClient();

      const contents = sanitizedMessages.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.text.trim() }],
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents,
        config: {
          systemInstruction: THERAPIST_SYSTEM_INSTRUCTION,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              reply: {
                type: Type.STRING,
                description:
                  'Helpful, warm, structured spa therapist advice covering healthy skin and wellness tips.',
              },
              skinCareTip: {
                type: Type.STRING,
                description:
                  'One concise daily healthy skin or wellness takeaway (10-18 words).',
              },
              recommendedTreatments: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description:
                  'Optional array of 0-2 relevant treatment IDs from: massage, facial, scrub, waxing, manipedi.',
              },
            },
            required: ['reply', 'skinCareTip', 'recommendedTreatments'],
          },
        },
      });

      const rawText = (response.text ?? '').trim();
      if (!rawText) {
        res.status(502).json({
          error: 'The AI Spa Therapist returned an empty response. Please try asking again.',
        });
        return;
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
          skinCareTip: 'Drink water steadily throughout the day and protect skin with gentle daily SPF.',
          recommendedTreatments: [],
        };
      }

      const recommendedTreatments = Array.isArray(parsed.recommendedTreatments)
        ? parsed.recommendedTreatments
            .filter((id): id is string => typeof id === 'string' && VALID_TREATMENT_IDS.has(id))
            .slice(0, 2)
        : [];

      const stripStars = (t: string) =>
        t
          .replace(/\*\*/g, '')
          .replace(/^\s*\*\s+/gm, '• ')
          .replace(/\*/g, '')
          .replace(/^#+\s+/gm, '')
          .trim();

      res.json({
        reply: stripStars(typeof parsed.reply === 'string' ? parsed.reply : rawText),
        skinCareTip: stripStars(
          typeof parsed.skinCareTip === 'string' ? parsed.skinCareTip : ''
        ),
        recommendedTreatments,
      });
    } catch (err: unknown) {
      const status =
        typeof err === 'object' && err !== null && 'status' in err
          ? Number((err as { status?: unknown }).status)
          : undefined;
      const message = err instanceof Error ? err.message : String(err);

      if (message === 'MISSING_API_KEY') {
        res.status(500).json({
          error:
            'Gemini API key is not configured yet. Please add GEMINI_API_KEY in Settings > Secrets.',
        });
        return;
      }
      if (
        status === 403 ||
        status === 401 ||
        message.includes('PERMISSION_DENIED') ||
        message.includes('API_KEY_INVALID')
      ) {
        res.status(403).json({
          error:
            'Unable to authenticate with Gemini. Please verify your GEMINI_API_KEY in Settings > Secrets.',
        });
        return;
      }
      if (status === 429 || message.includes('RESOURCE_EXHAUSTED')) {
        res.status(429).json({
          error:
            'The AI Spa Therapist is temporarily busy. Please wait a moment and try your question again.',
        });
        return;
      }
      if (status === 400 || status === 404) {
        console.error('Gemini request error:', status, message);
        res.status(status).json({
          error:
            'The AI Spa Therapist could not process that request. Please try rephrasing your question.',
        });
        return;
      }
      console.error('Therapist chat error:', status, message);
      res.status(500).json({
        error: 'Unable to reach the AI Spa Therapist right now. Please try again in a moment.',
      });
    }
  });

  if (!IS_PRODUCTION) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    const publicDir = path.resolve(__dirname, 'public');
    if (fs.existsSync(publicDir)) {
      app.use(express.static(publicDir));
    }
    if (fs.existsSync(distDir)) {
      app.use(express.static(distDir));
      app.get('*', (_req: Request, res: Response) => {
        res.sendFile(path.join(distDir, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Evita Sinzala Spa server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
