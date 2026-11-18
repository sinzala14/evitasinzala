import {
  ArrowRight,
  Award,
  Flower2,
  Heart,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { SPA_TREATMENTS, THERAPIST_PROFILE } from '../data/spaData';
import { HeroSpaIllustration, TreatmentCuteIcon } from './CuteIllustrations';

interface HeroSectionProps {
  selectedCount: number;
  onQuickSelectTreatment: (treatmentId: (typeof SPA_TREATMENTS)[number]['id']) => void;
}

export function HeroSection({
  selectedCount,
  onQuickSelectTreatment,
}: HeroSectionProps) {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-gradient-to-br from-[#3A1426] via-[#5E1C3D] to-[#9B2459] text-white"
    >
      {/* Decorative glows (clipped by overflow-hidden) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-20 -z-10 h-72 w-72 rounded-full bg-[#FF7EB3]/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 -z-10 h-80 w-80 rounded-full bg-[#FFB8D2]/20 blur-3xl"
      />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-5 pt-8 pb-12 sm:px-6 sm:pt-12 sm:pb-16 lg:grid-cols-12 lg:items-center lg:gap-12 lg:pt-16 lg:pb-20">
        {/* Left: headline */}
        <div className="min-w-0 lg:col-span-7">
          <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] sm:text-xs font-semibold text-[#FFD6E6] backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate">Certified Cosmetologist · {THERAPIST_PROFILE.shortLocation}</span>
          </span>

          <h1 className="mt-5 font-display text-[2.35rem] leading-[1.05] sm:text-5xl lg:text-6xl font-semibold tracking-tight text-balance">
            Sweet, Calm &amp;{' '}
            <span className="italic font-medium bg-gradient-to-r from-[#FF9CC4] via-[#FFC2DA] to-[#FF8AB8] bg-clip-text text-transparent">
              Glowing
            </span>{' '}
            Spa Care
          </h1>

          <p className="mt-4 max-w-xl text-[15px] sm:text-lg leading-relaxed text-white/80">
            Massage, facials, body scrubs, waxing, nails, makeup &amp; hair — private,
            hygienic sessions with {THERAPIST_PROFILE.name} in Siavonga.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="#booking"
              className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-2xl bg-white px-6 py-3 text-[15px] font-bold text-[#9B2459] shadow-[0_14px_34px_-12px_rgba(0,0,0,0.5)] transition-all hover:-translate-y-0.5 hover:bg-[#FFF0F6] active:scale-[0.98]"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Book Your Session
              {selectedCount > 0 && (
                <span className="rounded-full bg-[#C22D6B] px-2 py-0.5 text-xs font-bold text-white tabular-nums">
                  {selectedCount}
                </span>
              )}
            </a>
            <a
              href="#treatments"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/5 px-6 py-3 text-[15px] font-semibold text-white backdrop-blur transition-all hover:bg-white/15 active:scale-[0.98]"
            >
              <Flower2 className="h-5 w-5" aria-hidden="true" />
              View Menu &amp; Prices
            </a>
          </div>

          {/* Trust stats */}
          <dl className="mt-8 grid grid-cols-3 gap-2 sm:gap-4 border-t border-white/15 pt-6">
            <div className="min-w-0">
              <dt className="flex items-center gap-1 text-[11px] sm:text-xs text-white/60">
                <Award className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> Trained
              </dt>
              <dd className="mt-1 font-display text-lg sm:text-2xl font-semibold">ASHCA</dd>
            </div>
            <div className="min-w-0">
              <dt className="flex items-center gap-1 text-[11px] sm:text-xs text-white/60">
                <Heart className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> Nails from
              </dt>
              <dd className="mt-1 font-display text-lg sm:text-2xl font-semibold tabular-nums">K100</dd>
            </div>
            <div className="min-w-0">
              <dt className="flex items-center gap-1 text-[11px] sm:text-xs text-white/60">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> Sessions
              </dt>
              <dd className="mt-1 font-display text-lg sm:text-2xl font-semibold">Private</dd>
            </div>
          </dl>
        </div>

        {/* Right: pamper menu card */}
        <div className="min-w-0 lg:col-span-5">
          <div className="rounded-3xl bg-white p-5 sm:p-6 text-[#421C2D] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)] ring-1 ring-white/40">
            <div className="flex items-center justify-between gap-3 border-b border-[#FCE4ED] pb-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#C22D6B]">Pamper Menu</p>
                <h2 className="mt-0.5 font-display text-xl sm:text-2xl font-semibold">
                  Pick Your Ritual
                </h2>
                <p className="mt-0.5 text-xs text-[#8B4D67]">Tap to add to your booking</p>
              </div>
              <div className="shrink-0 scale-75 sm:scale-90 origin-right">
                <HeroSpaIllustration />
              </div>
            </div>

            <ul className="mt-2 divide-y divide-[#FCE8F0]">
              {SPA_TREATMENTS.map((treatment) => (
                <li key={treatment.id}>
                  <button
                    type="button"
                    onClick={() => onQuickSelectTreatment(treatment.id)}
                    className="group flex w-full min-w-0 items-center gap-3 rounded-2xl px-1 py-2.5 text-left transition-colors hover:bg-[#FFF5F9] active:bg-[#FFEBF2]"
                  >
                    <TreatmentCuteIcon id={treatment.id} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold group-hover:text-[#C22D6B]">
                        {treatment.title}
                      </p>
                      <p className="truncate text-xs text-[#8B4D67] tabular-nums">
                        {treatment.priceRange ?? treatment.subtitle}
                      </p>
                    </div>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFEBF2] text-[#C22D6B] transition-colors group-hover:bg-[#C22D6B] group-hover:text-white">
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
