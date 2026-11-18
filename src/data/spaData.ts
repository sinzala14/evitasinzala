export interface SpaTreatment {
  id: 'massage' | 'facial' | 'scrub' | 'waxing' | 'manipedi' | 'makeup_hair';
  number: string;
  category: 'Massage & Body' | 'Facials & Skin' | 'Nails & Waxing' | 'Makeup & Hair';
  title: string;
  subtitle: string;
  priceRange?: string;
  description: string;
  durations: string[];
  focusOptions: string[];
  careStandard: string;
}

export interface PriceListItem {
  id: string;
  category: 'Nails' | 'Makeup' | 'Hair';
  name: string;
  detail: string;
  duration: string;
  priceKwacha: number;
}

export interface WellnessPrompt {
  id: string;
  topic: 'Healthy Skin' | 'Healthy Living';
  label: string;
  question: string;
}

export const THERAPIST_PROFILE = {
  name: 'Evita Sinzala',
  role: 'Spa Therapist · Certified Cosmetology Professional',
  studioName: 'Evita Sinzala Studio',
  address: 'Plot 970, Siavonga, Southern Province, Zambia',
  shortLocation: 'Plot 970, Siavonga',
  phoneLocal: '0779 333 941',
  phoneRaw: '0779333941',
  whatsappNumber: '260779333941',
  email: 'evitasinzala03@icloud.com',
  school: 'ASHCA School of Beauty — Lusaka',
  qualification: 'Certificate in Cosmetology',
  trainingSummary: '6 Months Professional Training · 2 Months Attachment Training',
  graduatedDate: '23 October 2026',
  cvPath: '/assets/aistudio/Evita_Sinzala_be2a4149.pdf',
  experienceRole: 'Independent Spa & Beauty Service Provider',
  experienceLocation: 'Private Client Services · Siavonga, Zambia',
} as const;

export const SPA_TREATMENTS: SpaTreatment[] = [
  {
    id: 'massage',
    number: '01',
    category: 'Massage & Body',
    title: 'Professional Massage Therapy',
    subtitle: 'Full-body tension release & calm restoration',
    description:
      'Tailored therapeutic massage designed around your comfort level and pressure preference, helping ease tight shoulders, lower back stiffness, and everyday fatigue.',
    durations: ['45 min', '60 min', '90 min'],
    focusOptions: [
      'Swedish Full-Body Relaxation',
      'Back, Neck & Shoulder Relief',
      'Deep Calm Muscle Recovery',
    ],
    careStandard: 'Client pressure consultation · Freshly sanitized linens',
  },
  {
    id: 'facial',
    number: '02',
    category: 'Facials & Skin',
    title: 'Facial Treatments & Skincare',
    subtitle: 'Gentle cleansing, hydration & barrier balance',
    description:
      'Personalized facial care that cleanses congested pores, replenishes moisture in sunny climates, and leaves skin calm, balanced, and naturally radiant.',
    durations: ['45 min', '60 min'],
    focusOptions: [
      'Hydrating Botanical Glow Facial',
      'Deep Pore Clarifying Cleanse',
      'Soothing Sensitive Skin Care',
    ],
    careStandard: 'Skin-type consultation · Gentle non-stripping steps',
  },
  {
    id: 'scrub',
    number: '03',
    category: 'Massage & Body',
    title: 'Body Scrubs & Body-Care',
    subtitle: 'Smooth exfoliation & nourishing moisture seal',
    description:
      'Fine exfoliating body polish to sweep away dull surface dryness, stimulate gentle circulation, and leave arms, back, and legs soft and hydrated.',
    durations: ['45 min', '60 min'],
    focusOptions: [
      'Rose & Mineral Salt Body Polish',
      'Gentle Sugar & Botanical Scrub',
      'Nourishing Moisture Body-Care',
    ],
    careStandard: 'Warm towel finish · Skin-softening hydration',
  },
  {
    id: 'waxing',
    number: '04',
    category: 'Nails & Waxing',
    title: 'Hygienic Waxing Services',
    subtitle: 'Clean technique with soothing post-care',
    description:
      'Careful, hygienic waxing carried out in a private, calm setting with clean preparation and calming post-wax skincare to minimize irritation.',
    durations: ['20 min', '30 min', '45 min'],
    focusOptions: [
      'Underarm & Arm Care',
      'Half or Full Leg Waxing',
      'Facial & Brow Neatening',
    ],
    careStandard: 'Single-use applicators · Strict spa sanitation',
  },
  {
    id: 'manipedi',
    number: '05',
    category: 'Nails & Waxing',
    title: 'Nails, Manicure & Pedicure',
    subtitle: 'Gel polish, acrylics & soothing foot care',
    priceRange: 'K100 – K260',
    description:
      'Restorative hand and foot care featuring precision nail shaping, cuticle grooming, gel or acrylic finishes, heel smoothing, and a relaxing hand and foot massage.',
    durations: ['45 min', '60 min', '90 min'],
    focusOptions: [
      'Classic Manicure & Gel Polish (K100)',
      'Spa Pedicure & Foot Exfoliation (K140)',
      'Acrylic Overlay / Short Tips (K180)',
      'Full Acrylic Extensions & Nail Art (K220)',
      'Deluxe Manicure & Pedicure Combo (K260)',
    ],
    careStandard: 'Sanitized tools · K100 to K260 transparent rates',
  },
  {
    id: 'makeup_hair',
    number: '06',
    category: 'Makeup & Hair',
    title: 'Makeup & Hair Styling',
    subtitle: 'Soft glam, occasion looks & hair care',
    priceRange: 'K200 – K450',
    description:
      'Skin-prepped soft or full glam makeup and neat hair styling crafted for everyday confidence, weekend outings, photoshoots, and special celebrations.',
    durations: ['45 min', '60 min', '120 min'],
    focusOptions: [
      'Natural Soft Glam Makeup (K200)',
      'Silk Press, Blowout & Styling (K250)',
      'Full Occasion Glam Makeup (K300)',
      'Knotless / Box Braids & Hair Styling (K350)',
      'Bridal / VIP Makeup & Hair Package (K450)',
    ],
    careStandard: 'Skin-prep included · K200 to K450 transparent rates',
  },
];

export const BEAUTY_PRICE_LIST: PriceListItem[] = [
  {
    id: 'nail-gel',
    category: 'Nails',
    name: 'Classic Manicure & Gel Polish',
    detail: 'Nail shaping, cuticle care, hand lotion & long-wear gel color',
    duration: '45 min',
    priceKwacha: 100,
  },
  {
    id: 'nail-pedi',
    category: 'Nails',
    name: 'Spa Pedicure & Foot Exfoliation',
    detail: 'Warm foot soak, heel smoothing, scrub, polish & relaxing massage',
    duration: '60 min',
    priceKwacha: 140,
  },
  {
    id: 'nail-overlay',
    category: 'Nails',
    name: 'Acrylic Overlay / Short Tips',
    detail: 'Strengthening acrylic overlay or natural-length tips with gel finish',
    duration: '75 min',
    priceKwacha: 180,
  },
  {
    id: 'nail-extensions',
    category: 'Nails',
    name: 'Full Acrylic Extensions & Nail Art',
    detail: 'Custom sculpted extensions, pink/french tips or delicate nail art',
    duration: '90 min',
    priceKwacha: 220,
  },
  {
    id: 'nail-combo',
    category: 'Nails',
    name: 'Deluxe Manicure & Pedicure Combo',
    detail: 'Full hand & foot pamper with gel polish, scrub & soothing massage',
    duration: '105 min',
    priceKwacha: 260,
  },
  {
    id: 'makeup-soft',
    category: 'Makeup',
    name: 'Natural Soft Glam Makeup',
    detail: 'Hydrating skin prep, lightweight base, soft blush & lip finish',
    duration: '45 min',
    priceKwacha: 200,
  },
  {
    id: 'makeup-full',
    category: 'Makeup',
    name: 'Full Event / Occasion Glam Makeup',
    detail: 'Long-wear skin-prepped glam with lashes for parties & celebrations',
    duration: '60 min',
    priceKwacha: 300,
  },
  {
    id: 'hair-blowout',
    category: 'Hair',
    name: 'Silk Press, Blowout & Neat Styling',
    detail: 'Moisturizing heat-protected blowout, sleek press & soft curls',
    duration: '60 min',
    priceKwacha: 250,
  },
  {
    id: 'hair-braids',
    category: 'Hair',
    name: 'Knotless / Box Braids & Hair Styling',
    detail: 'Gentle tension-free parting, scalp oil & neat protective braids',
    duration: '120 min',
    priceKwacha: 350,
  },
  {
    id: 'makeup-hair-vip',
    category: 'Makeup',
    name: 'Bridal / VIP Makeup & Hair Package',
    detail: 'Complete glow skin prep, full glam makeup & occasion hair styling',
    duration: '150 min',
    priceKwacha: 450,
  },
];

export const WELLNESS_PROMPTS: WellnessPrompt[] = [
  {
    id: 'skin-sun',
    topic: 'Healthy Skin',
    label: 'Daily Hydration & Sun Protection',
    question:
      'What is a simple, healthy daily skincare routine for sunny warm weather in Siavonga to keep skin hydrated and glowing?',
  },
  {
    id: 'skin-prep',
    topic: 'Healthy Skin',
    label: 'Pre & Post Facial Care',
    question:
      'How should I care for my skin before and after a facial treatment or gentle body scrub so it stays calm and healthy?',
  },
  {
    id: 'skin-sensitive',
    topic: 'Healthy Skin',
    label: 'Soothing Sensitive & Dry Skin',
    question:
      'My skin feels tight and sensitive after cleansing. What healthy skin habits and ingredients help repair my skin barrier?',
  },
  {
    id: 'wellness-massage',
    topic: 'Healthy Living',
    label: 'Post-Massage Recovery Habits',
    question:
      'What healthy wellness tips should I follow after a relaxing massage therapy session to keep muscles loose and hydrated?',
  },
  {
    id: 'wellness-glow',
    topic: 'Healthy Living',
    label: 'Nutrition & Water for Skin Health',
    question:
      'What everyday hydration, food, and sleep habits naturally support clear skin, healthy nails, and energy?',
  },
  {
    id: 'wellness-evening',
    topic: 'Healthy Living',
    label: 'Evening Stress & Sleep Ritual',
    question:
      'Can you share a 10-minute evening spa-inspired self-care ritual to unwind stress and improve sleep quality?',
  },
];

export const TIME_WINDOWS = [
  'Morning (08:30 – 11:30)',
  'Midday (12:00 – 15:00)',
  'Late Afternoon (15:30 – 18:00)',
] as const;

export interface BookingFormState {
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  preferredChannel: 'whatsapp' | 'email';
  preferredDate: string;
  timeWindow: string;
  exactTime: string;
  sessionSetting: 'studio' | 'home';
  homeArea: string;
  skinNotes: string;
  selectedTreatments: Array<{
    treatmentId: SpaTreatment['id'];
    focus: string;
    duration: string;
  }>;
  selectedPriceIds: string[];
}

export function formatReadableDate(isoDate: string): string {
  if (!isoDate) return 'Not selected yet';
  const parts = isoDate.split('-');
  if (parts.length !== 3) return isoDate;
  const year = Number(parts[0]);
  const month = Number(parts[1]) - 1;
  const day = Number(parts[2]);
  const dateObj = new Date(year, month, day);
  if (Number.isNaN(dateObj.getTime())) return isoDate;
  return dateObj.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function getSelectedPriceItems(selectedPriceIds: string[]): PriceListItem[] {
  return selectedPriceIds
    .map((id) => BEAUTY_PRICE_LIST.find((item) => item.id === id))
    .filter((item): item is PriceListItem => Boolean(item));
}

export function buildBookingSubject(booking: BookingFormState): string {
  return `Spa & Beauty Booking Request — ${booking.clientName.trim() || 'Client'}`;
}

export function buildWhatsAppMessage(booking: BookingFormState): string {
  const treatmentLines = booking.selectedTreatments.map((item) => {
    const treatment = SPA_TREATMENTS.find((t) => t.id === item.treatmentId);
    return `• ${treatment?.title ?? item.treatmentId} — ${item.focus} (${item.duration})`;
  });

  const pricedItems = getSelectedPriceItems(booking.selectedPriceIds);
  const priceLines = pricedItems.map(
    (item) => `• ${item.name} (${item.category}, ${item.duration}) — K${item.priceKwacha}`
  );
  const pricedSubtotal = pricedItems.reduce((sum, item) => sum + item.priceKwacha, 0);

  const combinedRequested = [...treatmentLines, ...priceLines];
  const requestedBlock =
    combinedRequested.length > 0
      ? combinedRequested.join('\n')
      : '• General Spa & Beauty Consultation';

  const settingText =
    booking.sessionSetting === 'studio'
      ? 'Private Studio Session (Plot 970, Siavonga)'
      : `Private Home Session in Siavonga${booking.homeArea.trim() ? ` (${booking.homeArea.trim()})` : ''}`;

  const timeText = booking.exactTime.trim()
    ? `${booking.timeWindow} · Preferred time: ${booking.exactTime.trim()}`
    : booking.timeWindow;

  const lines = [
    `Hello Evita Sinzala, I would like to book a spa & beauty session.`,
    ``,
    `Client Name: ${booking.clientName.trim() || 'Guest'}`,
    `Contact Number: ${booking.clientPhone.trim() || 'Provided upon reply'}`,
  ];

  if (booking.clientEmail.trim()) {
    lines.push(`Client Email: ${booking.clientEmail.trim()}`);
  }

  lines.push(
    `Session Setting: ${settingText}`,
    `Preferred Date: ${formatReadableDate(booking.preferredDate)}`,
    `Preferred Time: ${timeText}`,
    ``,
    `Requested Services:`,
    requestedBlock
  );

  if (pricedSubtotal > 0) {
    lines.push(
      `Price List Total (${pricedItems.length} item${pricedItems.length === 1 ? '' : 's'}): K${pricedSubtotal}`
    );
  }

  if (booking.skinNotes.trim()) {
    lines.push('', `Skin, Pressure & Comfort Notes: ${booking.skinNotes.trim()}`);
  }

  lines.push('', 'Please let me know your availability. Stay Beautiful!');

  return lines.join('\n');
}

export function buildWhatsAppUrl(booking: BookingFormState): string {
  const text = encodeURIComponent(buildWhatsAppMessage(booking));
  return `https://wa.me/${THERAPIST_PROFILE.whatsappNumber}?text=${text}`;
}

export function buildEmailUrl(booking: BookingFormState): string {
  const subject = encodeURIComponent(buildBookingSubject(booking));
  const body = encodeURIComponent(buildWhatsAppMessage(booking));
  return `mailto:${THERAPIST_PROFILE.email}?subject=${subject}&body=${body}`;
}
