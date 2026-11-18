import {
  ArrowRight,
  CalendarHeart,
  Flower2,
  GraduationCap,
  Heart,
  HeartHandshake,
  MapPin,
  MessageCircle,
  Phone,
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
  const quickStartCards = [
    {
      href: '#treatments',
      title: 'Menu',
      subtitle: 'Nails K100–K260',
      detail: 'Massage, facials, scrubs, waxing, nails & hair',
      Icon: Flower2,
    },
    {
      href: '#booking',
      title: 'Book',
      subtitle:
        selectedCount > 0
          ? `${selectedCount} Selected`
          : 'WhatsApp / Email',
      detail: 'Pick your date & send directly to Evita',
      Icon: CalendarHeart,
    },
    {
      href: '#ai-therapist',
      title: 'AI Tips',
      subtitle: 'Healthy Skin & Glow',
      detail: 'Ask for skincare routines & advice',
      Icon: Sparkles,
    },
    {
      href: '#credentials',
      title: 'About',
      subtitle: 'ASHCA Certified',
      detail: 'Cosmetology training & Siavonga studio',
      Icon: HeartHandshake,
    },
  ];

  return (
    <section
      id="top"
      className="border-b border-[#F5D3DF] bg-gradient-to-b from-[#FFF7FA] via-[#FFEFF5] to-[#FFE8F1]"
    >
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-20">
        {/* First Thing Seen: 4 Interactive Navigation Cards */}
        <nav
          aria-label="Studio Quick Access Cards"
          className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4"
        >
          {quickStartCards.map(({ href, title, subtitle, detail, Icon }) => (
            <a
              key={href}
              href={href}
              className="group flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-[#F3C8D8] bg-white p-3.5 sm:p-5 shadow-[0_8px_24px_-12px_rgba(194,45,107,0.18)] transition-all duration-150 hover:-translate-y-0.5 hover:border-[#C22D6B] hover:bg-[#FFF5F9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C22D6B] active:scale-[0.98]"
            >
              <div className="flex items-start justify-between gap-1.5">
                <span className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-[#FFEAF1] text-[#C22D6B] transition-colors group-hover:bg-[#C22D6B] group-hover:text-white">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                </span>
                <ArrowRight
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-[#C22D6B] opacity-70 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </div>

              <div className="mt-2.5 sm:mt-4">
                <h2 className="font-display text-base sm:text-2xl font-semibold text-[#421C2D] group-hover:text-[#C22D6B] transition-colors leading-tight">
                  {title}
                </h2>
                <p className="mt-0.5 text-[11px] sm:text-xs font-semibold text-[#A8225A] tabular-nums truncate">
                  {subtitle}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-[#703C52] hidden sm:block">
                  {detail}
                </p>
              </div>
            </a>
          ))}
        </nav>

        {/* Main Welcome & Pamper Menu Split */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 items-stretch gap-8 lg:mt-12 lg:grid-cols-12 lg:gap-12">
          {/* Left Editorial Column */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              <div className="inline-flex flex-wrap items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-[#8B4D67] border border-[#F3C8D8]">
                <span>{THERAPIST_PROFILE.shortLocation}</span>
                <span className="text-[#D99AB3]" aria-hidden="true">·</span>
                <span>{THERAPIST_PROFILE.qualification}</span>
                <span className="text-[#D99AB3]" aria-hidden="true">·</span>
                <span className="text-[#C22D6B] font-semibold">{THERAPIST_PROFILE.school}</span>
              </div>

              <h1 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#421C2D] leading-[1.12] text-balance">
                Sweet, Calm &amp;{' '}
                <span className="italic font-medium text-[#C22D6B]">Glowing</span>{' '}
                Spa Care in Siavonga
              </h1>

              <p className="mt-3.5 sm:mt-5 text-sm sm:text-base leading-relaxed text-[#6B3B50]">
                Step into a gentle, private space for relaxing massage, hydrating facials,
                body scrubs, waxing, nails (K100–K260), plus makeup and hair styling up to K450
                with {THERAPIST_PROFILE.name}. Send your booking via WhatsApp or Email in seconds.
              </p>

              <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href="#booking"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-2xl bg-[#C22D6B] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(194,45,107,0.55)] transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#A8225A] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C22D6B]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Book via WhatsApp or Email
                </a>

                <a
                  href="#price-list"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-[#F0C2D3] bg-white px-5 py-3 text-sm font-semibold text-[#421C2D] transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#FFF0F6] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C22D6B]"
                >
                  <Flower2 className="h-4 w-4 text-[#C22D6B]" aria-hidden="true" />
                  View Nails &amp; Hair Prices
                </a>
              </div>
            </div>

            <div className="mt-7 sm:mt-10 pt-4 sm:pt-6 border-t border-[#F4CEDC]">
              <p className="text-xs font-semibold tracking-wide text-[#8B4D67]">
                Personal WhatsApp Concierge
              </p>
              <p className="mt-1 text-sm text-[#6B3B50]">
                Confirmed warmly by {THERAPIST_PROFILE.name} on{' '}
                <a
                  href={`tel:${THERAPIST_PROFILE.phoneRaw}`}
                  className="font-semibold text-[#421C2D] underline decoration-[#E2A5BD] underline-offset-4 hover:text-[#C22D6B] tabular-nums"
                >
                  {THERAPIST_PROFILE.phoneLocal}
                </a>{' '}
                or{' '}
                <a
                  href={`mailto:${THERAPIST_PROFILE.email}`}
                  className="underline decoration-[#E2A5BD] underline-offset-4 hover:text-[#C22D6B]"
                >
                  {THERAPIST_PROFILE.email}
                </a>
              </p>
            </div>
          </div>

          {/* Right Cute Botanical Pamper Menu Card */}
          <div className="lg:col-span-5 flex">
            <div className="relative flex w-full flex-col justify-between rounded-3xl border border-[#F3C8D8] bg-white p-5 sm:p-7 shadow-[0_12px_32px_-14px_rgba(194,45,107,0.18)]">
              <div className="flex items-center justify-between gap-3 border-b border-[#FCE4ED] pb-4">
                <div>
                  <p className="text-xs font-semibold text-[#C22D6B]">
                    Pamper Menu
                  </p>
                  <h2 className="mt-0.5 font-display text-xl sm:text-2xl font-semibold text-[#421C2D]">
                    Pick Your Ritual
                  </h2>
                </div>
                <HeroSpaIllustration />
              </div>

              <div className="my-3 divide-y divide-[#FCE8F0]">
                {SPA_TREATMENTS.map((treatment) => (
                  <button
                    key={treatment.id}
                    type="button"
                    onClick={() => onQuickSelectTreatment(treatment.id)}
                    className="group flex w-full items-center justify-between gap-2.5 py-2.5 text-left transition-colors hover:bg-[#FFF5F9] rounded-2xl px-2 -mx-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C22D6B] active:bg-[#FFEBF2]"
                  >
                    <div className="flex min-w-0 items-center gap-2.5">
                      <TreatmentCuteIcon id={treatment.id} />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#421C2D] group-hover:text-[#C22D6B] transition-colors truncate">
                          {treatment.title}
                        </p>
                        <p className="text-xs text-[#8B4D67] truncate tabular-nums">
                          {treatment.priceRange
                            ? `${treatment.priceRange} · ${treatment.subtitle}`
                            : treatment.subtitle}
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#C22D6B] whitespace-nowrap shrink-0">
                      Book
                      <ArrowRight
                        className="h-3 w-3 transition-transform duration-150 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2.5 rounded-2xl bg-[#FFEBF2] px-3.5 py-2.5">
                <Heart className="h-4 w-4 shrink-0 text-[#C22D6B]" aria-hidden="true" />
                <p className="text-xs font-medium text-[#6B3B50]">
                  Not sure what your skin needs? Chat with our AI Spa Therapist below for daily glow tips.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Studio Strip (2x2 on Mobile, 4-col on Desktop) */}
        <div className="mt-8 sm:mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 border-t border-[#F4CEDC] pt-6 sm:pt-8">
          <div className="flex items-start gap-2.5 rounded-2xl bg-white/70 p-3 sm:bg-transparent sm:p-0 border border-[#F3C8D8]/70 sm:border-0">
            <span className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-white text-[#C22D6B] border border-[#F3C8D8] shadow-xs">
              <MapPin className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-medium text-[#8B4D67]">Studio</p>
              <p className="mt-0.5 text-xs sm:text-sm font-semibold text-[#421C2D] truncate sm:whitespace-normal">
                {THERAPIST_PROFILE.address}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-2xl bg-white/70 p-3 sm:bg-transparent sm:p-0 border border-[#F3C8D8]/70 sm:border-0">
            <span className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-white text-[#C22D6B] border border-[#F3C8D8] shadow-xs">
              <GraduationCap className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-medium text-[#8B4D67]">Training</p>
              <p className="mt-0.5 text-xs sm:text-sm font-semibold text-[#421C2D] truncate sm:whitespace-normal">
                {THERAPIST_PROFILE.school}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-2xl bg-white/70 p-3 sm:bg-transparent sm:p-0 border border-[#F3C8D8]/70 sm:border-0">
            <span className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-white text-[#C22D6B] border border-[#F3C8D8] shadow-xs">
              <Phone className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-medium text-[#8B4D67]">WhatsApp</p>
              <a
                href={`tel:${THERAPIST_PROFILE.phoneRaw}`}
                className="mt-0.5 block text-xs sm:text-sm font-semibold text-[#421C2D] tabular-nums truncate hover:text-[#C22D6B]"
              >
                {THERAPIST_PROFILE.phoneLocal}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-2xl bg-white/70 p-3 sm:bg-transparent sm:p-0 border border-[#F3C8D8]/70 sm:border-0">
            <span className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-white text-[#C22D6B] border border-[#F3C8D8] shadow-xs">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-medium text-[#8B4D67]">Care Standard</p>
              <p className="mt-0.5 text-xs sm:text-sm font-semibold text-[#421C2D] truncate sm:whitespace-normal">
                Private &amp; Hygienic
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
