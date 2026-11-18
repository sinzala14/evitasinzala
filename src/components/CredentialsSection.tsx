import { Award, FileText, HeartHandshake, Mail, MapPin, Phone } from 'lucide-react';
import { THERAPIST_PROFILE } from '../data/spaData';

export function CredentialsSection() {
  return (
    <section
      id="credentials"
      className="border-b border-[#F5D3DF] bg-[#FFEBF2]/55 py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-wide text-[#C22D6B]">
              Meet Your Therapist
            </p>
            <h2 className="mt-1 font-display text-2xl sm:text-4xl font-semibold tracking-tight text-[#421C2D] text-balance">
              Trained Care &amp; Gentle Hygiene
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#6B3B50]">
              {THERAPIST_PROFILE.name} is a warm, client-focused Spa Therapist and
              Certified Cosmetology Professional based in Siavonga, dedicated to making
              every private session calm, cozy, and spotless.
            </p>

            <div className="mt-5 sm:mt-6">
              <a
                href={THERAPIST_PROFILE.cvPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] items-center gap-2 rounded-2xl border border-[#F0C2D3] bg-white px-5 py-2.5 text-sm font-semibold text-[#421C2D] transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#FFF0F6] whitespace-nowrap active:scale-95"
              >
                <FileText className="h-4 w-4 text-[#C22D6B]" aria-hidden="true" />
                View Curriculum Vitae (PDF)
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:col-span-7">
            <div className="rounded-3xl border border-[#F3C8D8] bg-white p-5 sm:p-6 shadow-[0_8px_24px_-14px_rgba(194,45,107,0.14)]">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FFEBF2] text-[#C22D6B]">
                  <Award className="h-4 w-4" aria-hidden="true" />
                </span>
                <p className="text-xs font-semibold text-[#C22D6B]">
                  Certification &amp; Training
                </p>
              </div>
              <h3 className="mt-2.5 font-display text-xl sm:text-2xl font-semibold text-[#421C2D]">
                {THERAPIST_PROFILE.school}
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-[#6B3B50]">
                {THERAPIST_PROFILE.qualification} · Graduated{' '}
                {THERAPIST_PROFILE.graduatedDate}
              </p>
              <p className="mt-2.5 text-xs leading-relaxed text-[#8B4D67]">
                {THERAPIST_PROFILE.trainingSummary}. Practical training covered massage
                therapy, facials, body scrubs, waxing, manicure, pedicure, and spa sanitation.
              </p>
            </div>

            <div className="rounded-3xl border border-[#F3C8D8] bg-white p-5 sm:p-6 shadow-[0_8px_24px_-14px_rgba(194,45,107,0.14)]">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FFEBF2] text-[#C22D6B]">
                  <HeartHandshake className="h-4 w-4" aria-hidden="true" />
                </span>
                <p className="text-xs font-semibold text-[#C22D6B]">
                  Private Practice &amp; Contact
                </p>
              </div>
              <h3 className="mt-2.5 font-display text-xl sm:text-2xl font-semibold text-[#421C2D]">
                {THERAPIST_PROFILE.experienceRole}
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-[#6B3B50]">
                {THERAPIST_PROFILE.experienceLocation}
              </p>
              <ul className="mt-3.5 space-y-2 text-xs text-[#6B3B50]">
                <li className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-[#C22D6B]" aria-hidden="true" />
                  <span>{THERAPIST_PROFILE.address}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 shrink-0 text-[#C22D6B]" aria-hidden="true" />
                  <a href={`tel:${THERAPIST_PROFILE.phoneRaw}`} className="tabular-nums font-semibold hover:text-[#C22D6B]">
                    {THERAPIST_PROFILE.phoneLocal}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 shrink-0 text-[#C22D6B]" aria-hidden="true" />
                  <a
                    href={`mailto:${THERAPIST_PROFILE.email}`}
                    className="underline decoration-[#E2A5BD] underline-offset-4 hover:text-[#C22D6B]"
                  >
                    {THERAPIST_PROFILE.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
