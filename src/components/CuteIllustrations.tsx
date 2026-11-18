import type { SpaTreatment } from '../data/spaData';

export function HeroSpaIllustration() {
  return (
    <svg
      width="88"
      height="88"
      viewBox="0 0 96 96"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="48" cy="48" r="44" fill="#FFE8F0" stroke="#F4BDD1" strokeWidth="1.5" />
      {/* Soft blossom petals */}
      <path
        d="M48 22C52 30 56 36 48 44C40 36 44 30 48 22Z"
        fill="#F9B8D0"
        stroke="#C93B76"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M27 36C36 35 43 37 46 46C37 48 31 44 27 36Z"
        fill="#FCD3E2"
        stroke="#C93B76"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M69 36C60 35 53 37 50 46C59 48 65 44 69 36Z"
        fill="#FCD3E2"
        stroke="#C93B76"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* Cute spa stone / dish */}
      <path
        d="M26 56C26 51.5817 35.8497 48 48 48C60.1503 48 70 51.5817 70 56C70 63.5 60.1503 70 48 70C35.8497 70 26 63.5 26 56Z"
        fill="#FFFFFF"
        stroke="#C93B76"
        strokeWidth="1.6"
      />
      <path
        d="M35 56C38.5 58.2 43 59.2 48 59.2C53 59.2 57.5 58.2 61 56"
        stroke="#EC8FB3"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Tiny sparkle stars */}
      <path
        d="M73 24L74.3 27.2L77.5 28.5L74.3 29.8L73 33L71.7 29.8L68.5 28.5L71.7 27.2L73 24Z"
        fill="#D94682"
      />
      <circle cx="23" cy="27" r="2.2" fill="#EC8FB3" />
    </svg>
  );
}

export function TreatmentCuteIcon({ id }: { id: SpaTreatment['id'] }) {
  switch (id) {
    case 'massage':
      return (
        <svg width="46" height="46" viewBox="0 0 48 48" fill="none" aria-hidden="true" className="shrink-0">
          <rect x="2" y="2" width="44" height="44" rx="14" fill="#FFEAF1" />
          {/* Aroma oil bottle & blossom */}
          <rect x="17" y="18" width="14" height="18" rx="5" fill="#FFFFFF" stroke="#C93B76" strokeWidth="1.5" />
          <rect x="20.5" y="13" width="7" height="5" rx="1.5" fill="#F9B8D0" stroke="#C93B76" strokeWidth="1.5" />
          <path d="M24 10V13" stroke="#C93B76" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M24 24.5C24 24.5 21 26.8 21 29C21 30.6569 22.3431 32 24 32C25.6569 32 27 30.6569 27 29C27 26.8 24 24.5 24 24.5Z" fill="#F9B8D0" />
          <circle cx="35" cy="14" r="1.8" fill="#D94682" />
        </svg>
      );
    case 'facial':
      return (
        <svg width="46" height="46" viewBox="0 0 48 48" fill="none" aria-hidden="true" className="shrink-0">
          <rect x="2" y="2" width="44" height="44" rx="14" fill="#FFEAF1" />
          {/* Serum dropper bottle */}
          <rect x="17" y="20" width="14" height="16" rx="4.5" fill="#FFFFFF" stroke="#C93B76" strokeWidth="1.5" />
          <path d="M21 20V16.5C21 14.8431 22.3431 13.5 24 13.5C25.6569 13.5 27 14.8431 27 16.5V20" fill="#F9B8D0" stroke="#C93B76" strokeWidth="1.5" />
          <rect x="19.5" y="17.5" width="9" height="3" rx="1.5" fill="#FFFFFF" stroke="#C93B76" strokeWidth="1.3" />
          <path d="M13 16L14 18.2L16.2 19.2L14 20.2L13 22.4L12 20.2L9.8 19.2L12 18.2L13 16Z" fill="#D94682" />
          <path d="M21 27.5H27" stroke="#EC8FB3" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M22.5 30.5H25.5" stroke="#EC8FB3" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'scrub':
      return (
        <svg width="46" height="46" viewBox="0 0 48 48" fill="none" aria-hidden="true" className="shrink-0">
          <rect x="2" y="2" width="44" height="44" rx="14" fill="#FFEAF1" />
          {/* Cute body scrub jar */}
          <rect x="13" y="20" width="22" height="15" rx="5" fill="#FFFFFF" stroke="#C93B76" strokeWidth="1.5" />
          <rect x="15" y="15.5" width="18" height="4.5" rx="2" fill="#F9B8D0" stroke="#C93B76" strokeWidth="1.5" />
          <circle cx="20" cy="27.5" r="1.4" fill="#EC8FB3" />
          <circle cx="24" cy="26" r="1.4" fill="#D94682" />
          <circle cx="28" cy="28" r="1.4" fill="#EC8FB3" />
          <path d="M31 12L35 16" stroke="#C93B76" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'waxing':
      return (
        <svg width="46" height="46" viewBox="0 0 48 48" fill="none" aria-hidden="true" className="shrink-0">
          <rect x="2" y="2" width="44" height="44" rx="14" fill="#FFEAF1" />
          {/* Smooth botanical petal & ribbon */}
          <path
            d="M24 35C24 27 17 21 13 17C19 16 23 19 24 24C25 19 29 16 35 17C31 21 24 27 24 35Z"
            fill="#FFFFFF"
            stroke="#C93B76"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="24" cy="14" r="2.2" fill="#F9B8D0" stroke="#C93B76" strokeWidth="1.3" />
        </svg>
      );
    case 'manipedi':
      return (
        <svg width="46" height="46" viewBox="0 0 48 48" fill="none" aria-hidden="true" className="shrink-0">
          <rect x="2" y="2" width="44" height="44" rx="14" fill="#FFEAF1" />
          {/* Cute nail polish bottle */}
          <path
            d="M16 24C16 21.7909 17.7909 20 20 20H28C30.2091 20 32 21.7909 32 24V32C32 34.2091 30.2091 36 28 36H20C17.7909 36 16 34.2091 16 32V24Z"
            fill="#FFFFFF"
            stroke="#C93B76"
            strokeWidth="1.5"
          />
          <rect x="20.5" y="12" width="7" height="8" rx="2" fill="#F9B8D0" stroke="#C93B76" strokeWidth="1.5" />
          <path d="M24 26.2C23.2 25.1 21.5 25.3 21.2 26.7C20.9 28.2 22.8 29.7 24 30.8C25.2 29.7 27.1 28.2 26.8 26.7C26.5 25.3 24.8 25.1 24 26.2Z" fill="#EC8FB3" />
        </svg>
      );
    case 'makeup_hair':
      return (
        <svg width="46" height="46" viewBox="0 0 48 48" fill="none" aria-hidden="true" className="shrink-0">
          <rect x="2" y="2" width="44" height="44" rx="14" fill="#FFEAF1" />
          {/* Cute lipstick & glow star */}
          <rect x="18" y="24" width="12" height="12" rx="3" fill="#FFFFFF" stroke="#C93B76" strokeWidth="1.5" />
          <rect x="19.5" y="20" width="9" height="4" rx="1" fill="#FCD3E2" stroke="#C93B76" strokeWidth="1.4" />
          <path d="M21 20V14.5C21 13.5 27 11.5 27 14.5V20" fill="#D94682" stroke="#C93B76" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M34 13L35 15.2L37.2 16.2L35 17.2L34 19.4L33 17.2L30.8 16.2L33 15.2L34 13Z" fill="#D94682" />
        </svg>
      );
  }
}

export function TherapistAvatarIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true" className="shrink-0">
      <circle cx="20" cy="20" r="19" fill="#FFE8F0" stroke="#F4BDD1" strokeWidth="1.5" />
      <path
        d="M20 29C20 23 15 19 11.5 16.5C15.5 15.5 18.8 17.5 20 21.5C21.2 17.5 24.5 15.5 28.5 16.5C25 19 20 23 20 29Z"
        fill="#F9B8D0"
        stroke="#C93B76"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="12.5" r="2" fill="#D94682" />
    </svg>
  );
}
