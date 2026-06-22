'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { BRAND } from '@/lib/constants';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '#catalog', label: 'Catalog' },
  { href: '#quote', label: 'Get Quote' },
  { href: '#process', label: 'Process' },
  { href: '#why', label: 'Why Us' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 shadow-sm backdrop-blur-md'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-heading text-xl font-bold tracking-tight text-navy sm:text-2xl">
          FURNITECTS
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-charcoal transition-colors hover:text-emerald"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#quote"
              className="rounded-full bg-emerald px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy"
            >
              Get a Quote
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="rounded-lg p-2 text-navy md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-cream bg-white px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block py-2 text-base font-medium text-charcoal"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#quote"
                className="mt-2 block rounded-full bg-emerald px-5 py-3 text-center text-sm font-semibold text-white"
                onClick={() => setMobileOpen(false)}
              >
                Get a Quote
              </a>
            </li>
          </ul>
        </div>
      )}

      <div className="sr-only">{BRAND.tagline}</div>
    </header>
  );
}
