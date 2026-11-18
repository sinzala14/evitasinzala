import { THERAPIST_PROFILE } from '../data/spaData';

export function Footer() {
  return (
    <footer className="bg-[#FFF7FA] pt-10 pb-32 sm:pb-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-xl font-semibold text-[#421C2D]">
            {THERAPIST_PROFILE.name}
          </p>
          <p className="mt-1 text-xs text-[#8B4D67]">
            {THERAPIST_PROFILE.address} ·{' '}
            <a href={`tel:${THERAPIST_PROFILE.phoneRaw}`} className="tabular-nums font-semibold hover:text-[#C22D6B]">
              {THERAPIST_PROFILE.phoneLocal}
            </a>{' '}
            ·{' '}
            <a href={`mailto:${THERAPIST_PROFILE.email}`} className="hover:text-[#C22D6B]">
              {THERAPIST_PROFILE.email}
            </a>
          </p>
        </div>

        <nav
          aria-label="Footer Navigation"
          className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-semibold text-[#6B3B50]"
        >
          <a href="#treatments" className="hover:text-[#C22D6B] whitespace-nowrap">
            Treatments
          </a>
          <a href="#booking" className="hover:text-[#C22D6B] whitespace-nowrap">
            WhatsApp Booking
          </a>
          <a href="#ai-therapist" className="hover:text-[#C22D6B] whitespace-nowrap">
            AI Spa Therapist
          </a>
          <a href="#credentials" className="hover:text-[#C22D6B] whitespace-nowrap">
            Credentials
          </a>
        </nav>
      </div>
    </footer>
  );
}
