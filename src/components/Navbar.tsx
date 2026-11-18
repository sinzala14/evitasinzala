import { MessageCircle, Phone } from 'lucide-react';
import { THERAPIST_PROFILE } from '../data/spaData';

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#F5D3DF]/90 bg-[#FFF7FA]/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-3.5">
        <a
          href="#top"
          className="group flex flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C22D6B]"
        >
          <span className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-[#421C2D] group-hover:text-[#C22D6B] transition-colors whitespace-nowrap">
            Evita Sinzala
          </span>
          <span className="text-[11px] sm:text-xs font-medium text-[#8B4D67]">
            Spa &amp; Cosmetology · Siavonga
          </span>
        </a>

        <div className="flex items-center gap-2 sm:gap-4">
          <p className="hidden md:block font-display italic text-lg font-medium text-[#C22D6B] whitespace-nowrap">
            Stay Beautiful
          </p>

          <a
            href={`https://wa.me/${THERAPIST_PROFILE.whatsappNumber}?text=${encodeURIComponent(
              'Hello Evita, I would like to inquire about spa treatments and availability.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="inline-flex min-h-[38px] items-center gap-1.5 rounded-full bg-[#25D366] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#20BD5A] hover:shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
          >
            <MessageCircle className="h-4 w-4 fill-white" aria-hidden="true" />
            <span className="font-medium">WhatsApp</span>
          </a>

          <a
            href={`tel:${THERAPIST_PROFILE.phoneRaw}`}
            aria-label="Call Evita"
            className="hidden sm:inline-flex min-h-[38px] items-center gap-1.5 rounded-full border border-[#F0C2D3] bg-white px-3 py-1.5 text-xs font-semibold text-[#421C2D] transition-colors hover:bg-[#FFEBF2]"
          >
            <Phone className="h-3.5 w-3.5 text-[#C22D6B]" aria-hidden="true" />
            <span className="tabular-nums">0779 333 941</span>
          </a>
        </div>
      </div>
    </header>
  );
}
