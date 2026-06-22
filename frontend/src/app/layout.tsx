import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppFloat from '@/components/layout/WhatsAppFloat';
import JsonLd from '@/components/JsonLd';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Furnitects — Custom Wardrobes | Dream it, we\'ll design it.',
  description:
    'Custom wardrobes designed to fit your space. Browse our catalog, enter dimensions, and get an instant quote in 60 minutes. Pune-based, delivered nationwide.',
  keywords: [
    'custom wardrobe',
    'wardrobe design Pune',
    'Furnitects',
    'modular wardrobe',
    'sliding wardrobe',
  ],
  openGraph: {
    title: 'Furnitects — Custom Wardrobes',
    description: 'Dream it, we\'ll design it. Instant quotes, no login required.',
    type: 'website',
    locale: 'en_IN',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} h-full scroll-smooth`}>
      <head>
        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col font-body antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
