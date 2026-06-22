export const BRAND = {
  tagline: "Dream it, we'll design it.",
  subheading: 'Custom wardrobes designed to fit your space. Quoted in 60 minutes.',
  director: 'Yash Bagmar',
  role: 'Director',
  phone: '+91 98819 84488',
  whatsappPhone: '919881984488',
  email: 'support@furnitects.com',
  website: 'furnitects.com',
  office: 'Office No 910, Apex Business Court, Pune – 411037',
} as const;

export const PROCESS_STEPS = [
  {
    step: 1,
    title: 'Client Selects',
    description: 'Catalog module or custom design',
    detail:
      'Browse our wardrobe catalog or share your custom design with top, front & side views.',
  },
  {
    step: 2,
    title: 'Specs Sent',
    description: 'Dimensions or measurements',
    detail:
      'For catalog styles, send Height × Width × Length. For custom, include full measurements with your views.',
  },
  {
    step: 3,
    title: 'Quoted on WhatsApp',
    description: 'Within 1 hour',
    detail:
      'Get a confirmed, all-inclusive price quote on WhatsApp — with a clear ask to confirm and pick your delivery date.',
  },
  {
    step: 4,
    title: 'Client Confirms',
    description: 'Picks a delivery date',
    detail: 'Reply on WhatsApp to accept the quote and tell us your preferred build & delivery date.',
  },
  {
    step: 5,
    title: 'Build & Deliver',
    description: 'Made and delivered on time',
    detail:
      'We build to your confirmed specs and deliver & install directly at your address, on schedule.',
  },
  {
    step: 6,
    title: 'Check-In',
    description: 'Post-delivery satisfaction',
    detail:
      'Every order ends with a check-in — confirming you\'re happy, and fixing anything that isn\'t right.',
  },
] as const;

export const VALUE_PROPS = [
  {
    title: 'No wasted visits',
    description:
      'Specs alone are enough to generate a price — no one drives out just to quote.',
    icon: 'route',
  },
  {
    title: '1-hour SLA',
    description: 'Clients get a real number fast, before they shop elsewhere.',
    icon: 'clock',
  },
  {
    title: 'Trust loop',
    description:
      'The post-delivery check-in turns one-time buyers into repeat clients & referrals.',
    icon: 'heart',
  },
  {
    title: 'Pricing edge',
    description:
      'Lower overhead than big-brand competitors means we win on cost, not just speed.',
    icon: 'tag',
  },
] as const;

export const WHY_FURNITECTS = [
  {
    title: 'Trend-Led Catalog',
    description:
      'Designs curated around the styles already popular with major furniture brands — the looks clients are already searching for.',
  },
  {
    title: 'Lean Cost Base',
    description:
      'No big showrooms, no heavy brand marketing spend — overhead stays low.',
  },
  {
    title: 'Same Quality Bar',
    description:
      'Materials and finish held to the same standard, just without the brand premium.',
  },
] as const;

export const CATALOG_FALLBACK = [
  {
    id: 'hinged-2-door' as const,
    name: 'Hinged 2-Door',
    description: 'Classic swing-door wardrobe — ideal for compact bedrooms',
    fromPrice: 18000,
  },
  {
    id: 'sliding-3-door' as const,
    name: 'Sliding 3-Door',
    description: 'Space-saving sliding panels for larger storage needs',
    fromPrice: 32000,
  },
  {
    id: 'walk-in' as const,
    name: 'Walk-In Layout',
    description: 'Open hanging rods & shelving for a dedicated space',
    fromPrice: 65000,
  },
  {
    id: 'modular' as const,
    name: 'Modular Open Shelving',
    description: 'Flexible cube shelving — mix open & closed storage',
    fromPrice: 22000,
  },
];

export const STYLE_ICONS: Record<string, string> = {
  'hinged-2-door': '🚪',
  'sliding-3-door': '↔️',
  'walk-in': '🏠',
  modular: '📦',
  custom: '✏️',
};
