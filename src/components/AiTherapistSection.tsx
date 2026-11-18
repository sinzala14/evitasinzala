import { FormEvent, useRef, useState } from 'react';
import { ArrowRight, RotateCcw, Send, Sparkles } from 'lucide-react';
import { SPA_TREATMENTS, WELLNESS_PROMPTS } from '../data/spaData';
import type { SpaTreatment } from '../data/spaData';
import { TherapistAvatarIcon } from './CuteIllustrations';

interface TherapistMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  skinCareTip?: string;
  recommendedTreatments?: SpaTreatment['id'][];
}

interface AiTherapistSectionProps {
  selectedTreatmentIds: SpaTreatment['id'][];
  onAddTreatmentFromAi: (treatmentId: SpaTreatment['id']) => void;
}

const INITIAL_ASSISTANT_MESSAGE: TherapistMessage = {
  id: 'welcome-tip',
  role: 'model',
  text: 'Hi lovely! Ask me anything about gentle healthy skin routines, keeping skin glowing in warm Siavonga sunshine, facial aftercare, or relaxing post-massage recovery.',
  skinCareTip:
    'Sip water throughout the day and protect your glow with gentle daily SPF.',
  recommendedTreatments: [],
};

export function AiTherapistSection({
  selectedTreatmentIds,
  onAddTreatmentFromAi,
}: AiTherapistSectionProps) {
  const [messages, setMessages] = useState<TherapistMessage[]>([
    INITIAL_ASSISTANT_MESSAGE,
  ]);
  const [input, setInput] = useState('');
  const [topicFilter, setTopicFilter] = useState<'All' | 'Healthy Skin' | 'Healthy Living'>('All');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const visiblePrompts =
    topicFilter === 'All'
      ? WELLNESS_PROMPTS
      : WELLNESS_PROMPTS.filter((p) => p.topic === topicFilter);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop =
          scrollContainerRef.current.scrollHeight;
      }
    });
  };

  const sendQuestion = async (questionText: string) => {
    const trimmed = questionText.trim();
    if (!trimmed || isLoading) return;

    setErrorMessage(null);
    const userMsg: TherapistMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);
    scrollToBottom();

    try {
      const apiMessages = nextMessages
        .filter((m) => m.id !== 'welcome-tip')
        .map((m) => ({ role: m.role, text: m.text }));

      const response = await fetch('/api/therapist-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = (await response.json()) as {
        reply?: string;
        skinCareTip?: string;
        recommendedTreatments?: SpaTreatment['id'][];
        error?: string;
      };

      if (!response.ok) {
        throw new Error(
          data.error || 'Unable to get a response from the AI Spa Therapist.'
        );
      }

      const modelMsg: TherapistMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: data.reply || 'I am happy to help with your skincare and spa routine.',
        skinCareTip: data.skinCareTip,
        recommendedTreatments: data.recommendedTreatments ?? [],
      };

      setMessages((prev) => [...prev, modelMsg]);
      scrollToBottom();
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Something went wrong reaching the AI Spa Therapist.';
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    void sendQuestion(input);
  };

  const handleReset = () => {
    setMessages([INITIAL_ASSISTANT_MESSAGE]);
    setErrorMessage(null);
    setInput('');
  };

  return (
    <section
      id="ai-therapist"
      className="border-b border-[#F5D3DF] bg-[#FFF7FA] py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wide text-[#C22D6B]">
              Kind Skincare &amp; Wellness Chat
            </p>
            <h2 className="mt-1 font-display text-2xl sm:text-4xl font-semibold tracking-tight text-[#421C2D] text-balance">
              Ask the AI Spa Therapist
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#6B3B50]">
              Get sweet, practical healthy skin tips, sun-care reminders, and soothing wellness routines anytime before or after your visit.
            </p>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex min-h-[38px] items-center gap-1.5 self-start rounded-2xl border border-[#F0C2D3] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#6B3B50] transition-colors hover:bg-[#FFEBF2] hover:text-[#421C2D] whitespace-nowrap shrink-0 active:scale-95"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            New Consultation
          </button>
        </div>

        <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
          {/* Quick-Ask Topics Panel */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#F3C8D8] bg-[#FFEBF2]/70 p-4 sm:p-6 lg:col-span-5">
            <div>
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-lg sm:text-2xl font-semibold text-[#421C2D]">
                  Cute Glow &amp; Wellness Prompts
                </h3>
                <Sparkles className="h-4 w-4 text-[#C22D6B]" aria-hidden="true" />
              </div>

              {/* Mobile swipeable topic tabs */}
              <div
                role="tablist"
                aria-label="Filter wellness prompt topics"
                className="mt-3 flex overflow-x-auto no-scrollbar items-center gap-1 rounded-2xl bg-[#FAD8E5] p-1 -mx-1 px-1 sm:mx-0"
              >
                {(['All', 'Healthy Skin', 'Healthy Living'] as const).map((tab) => {
                  const active = topicFilter === tab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setTopicFilter(tab)}
                      className={`rounded-xl px-3 py-1 text-xs font-semibold transition-all whitespace-nowrap shrink-0 active:scale-95 ${
                        active
                          ? 'bg-white text-[#421C2D] shadow-xs'
                          : 'text-[#703C52] hover:text-[#421C2D]'
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>

              {/* Prompt buttons - Horizontal swipeable on mobile, list on tablet/desktop */}
              <div className="mt-4 flex sm:flex-col overflow-x-auto no-scrollbar gap-2 sm:gap-0 sm:divide-y sm:divide-[#F4CEDC] pb-2 sm:pb-0 -mx-1 px-1 sm:mx-0">
                {visiblePrompts.map((prompt) => (
                  <button
                    key={prompt.id}
                    type="button"
                    disabled={isLoading}
                    onClick={() => void sendQuestion(prompt.question)}
                    className="group flex flex-col sm:flex-row min-w-[200px] sm:min-w-0 sm:w-full items-start sm:items-center justify-between gap-2 rounded-2xl border border-[#F4CEDC] sm:border-0 bg-white sm:bg-transparent p-3 sm:py-2.5 sm:px-2 transition-all hover:bg-white/80 disabled:opacity-60 text-left active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C22D6B]"
                  >
                    <div className="min-w-0">
                      <p className="text-[11px] font-medium text-[#C22D6B]">
                        {prompt.topic}
                      </p>
                      <p className="mt-0.5 text-xs sm:text-sm font-semibold text-[#421C2D] group-hover:text-[#C22D6B] transition-colors line-clamp-2">
                        {prompt.label}
                      </p>
                    </div>
                    <ArrowRight
                      className="hidden sm:block h-4 w-4 shrink-0 text-[#C22D6B] transition-transform duration-150 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-4 border-t border-[#F4CEDC] pt-3 text-[11px] sm:text-xs leading-relaxed text-[#8B4D67]">
              Covers gentle skincare, spa aftercare, and healthy habits. For medical conditions, please see a clinician.
            </p>
          </div>

          {/* Right Live AI Conversation */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#F3C8D8] bg-white shadow-[0_12px_34px_-16px_rgba(194,45,107,0.18)] lg:col-span-7">
            <div className="flex items-center gap-3 border-b border-[#FCE4ED] px-4 py-3 sm:px-6 sm:py-4">
              <TherapistAvatarIcon />
              <div>
                <p className="text-sm font-semibold text-[#421C2D]">
                  AI Spa Therapist
                </p>
                <p className="text-xs text-[#8B4D67]">
                  Healthy skin care · Hydration · Cozy self-care tips
                </p>
              </div>
            </div>

            <div
              ref={scrollContainerRef}
              className="flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6 min-h-[300px] max-h-[420px]"
            >
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <span className="mb-1 text-[11px] font-medium text-[#8B4D67]">
                      {isUser ? 'You' : 'AI Spa Therapist'}
                    </span>

                    <div
                      className={`max-w-[92%] sm:max-w-[85%] rounded-3xl px-4 py-3 sm:px-5 sm:py-3.5 text-xs sm:text-sm leading-relaxed ${
                        isUser
                          ? 'bg-[#C22D6B] text-white'
                          : 'bg-[#FFF5F9] text-[#421C2D] border border-[#FCE0EC]'
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>

                      {!isUser && msg.skinCareTip && (
                        <div className="mt-2.5 border-t border-[#F5D3DF] pt-2">
                          <p className="text-[11px] font-semibold text-[#C22D6B]">
                            Little Glow Note
                          </p>
                          <p className="mt-0.5 text-xs text-[#6B3B50]">
                            {msg.skinCareTip}
                          </p>
                        </div>
                      )}

                      {!isUser &&
                        msg.recommendedTreatments &&
                        msg.recommendedTreatments.length > 0 && (
                          <div className="mt-3 border-t border-[#F5D3DF] pt-2.5">
                            <p className="text-[11px] font-medium text-[#8B4D67]">
                              Lovely Matches on Our Menu:
                            </p>
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                              {msg.recommendedTreatments.map((tId) => {
                                const treatment = SPA_TREATMENTS.find(
                                  (t) => t.id === tId
                                );
                                if (!treatment) return null;
                                const alreadyAdded =
                                  selectedTreatmentIds.includes(tId);
                                return (
                                  <button
                                    key={tId}
                                    type="button"
                                    onClick={() => onAddTreatmentFromAi(tId)}
                                    className="inline-flex min-h-[34px] items-center gap-1 rounded-xl border border-[#EFAFC7] bg-white px-3 py-1 text-xs font-semibold text-[#A8225A] transition-colors hover:bg-[#FFEBF2] whitespace-nowrap active:scale-95"
                                  >
                                    {alreadyAdded
                                      ? `View ${treatment.title}`
                                      : `Book ${treatment.title}`}
                                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex flex-col items-start">
                  <span className="mb-1 text-[11px] font-medium text-[#8B4D67]">
                    AI Spa Therapist
                  </span>
                  <div className="rounded-3xl border border-[#FCE0EC] bg-[#FFF5F9] px-4 py-2.5 text-xs sm:text-sm text-[#8B4D67]">
                    Preparing your healthy skin and wellness tips...
                  </div>
                </div>
              )}

              {errorMessage && (
                <div
                  role="alert"
                  className="rounded-2xl border border-[#EFA4BE] bg-[#FFEBF2] px-3.5 py-2.5 text-xs text-[#8C1D4B]"
                >
                  <p className="font-semibold">Unable to complete reply</p>
                  <p className="mt-0.5">{errorMessage}</p>
                </div>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="border-t border-[#FCE4ED] bg-[#FFF9FB] p-3 sm:p-4 rounded-b-3xl"
            >
              <label htmlFor="therapist-input" className="sr-only">
                Ask the AI Spa Therapist about healthy skin or wellness tips
              </label>
              <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
                <input
                  id="therapist-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  placeholder="Ask about dry skin, sun care, massage recovery..."
                  className="w-full min-h-[46px] rounded-2xl border border-[#F0C2D3] bg-white px-3.5 py-2 text-base sm:text-sm text-[#421C2D] placeholder:text-[#BA8DA0] focus:border-[#C22D6B] focus:outline-none focus:ring-2 focus:ring-[#C22D6B]/20"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-2xl bg-[#C22D6B] px-5 py-2 text-sm font-semibold text-white transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#A8225A] disabled:opacity-50 whitespace-nowrap shrink-0 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C22D6B]"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Ask Therapist
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
