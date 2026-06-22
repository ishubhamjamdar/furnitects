import { BRAND } from '@/lib/constants';

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Furnitects',
  description: BRAND.subheading,
  url: `https://${BRAND.website}`,
  telephone: BRAND.phone,
  email: BRAND.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: BRAND.office,
    addressLocality: 'Pune',
    postalCode: '411037',
    addressCountry: 'IN',
  },
  priceRange: '₹₹',
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
    />
  );
}
