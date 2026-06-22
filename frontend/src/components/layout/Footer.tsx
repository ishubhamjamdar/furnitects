import { BRAND } from '@/lib/constants';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy text-cream">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h2 className="font-heading text-2xl font-bold text-white">FURNITECTS</h2>
            <p className="mt-3 text-sm leading-relaxed text-cream/80">{BRAND.tagline}</p>
            <p className="mt-2 text-sm italic text-gold">One Process. Every Order.</p>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-gold">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-cream/90">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-emerald" />
                <span>
                  {BRAND.director}, {BRAND.role}
                  <br />
                  {BRAND.office}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-emerald" />
                <a href={`tel:${BRAND.phone.replace(/\s/g, '')}`} className="hover:text-white">
                  {BRAND.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="shrink-0 text-emerald" />
                <a href={`mailto:${BRAND.email}`} className="hover:text-white">
                  {BRAND.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-gold">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                { href: '#catalog', label: 'Wardrobe Catalog' },
                { href: '#quote', label: 'Instant Quote' },
                { href: '#process', label: 'How It Works' },
                { href: '#why', label: 'Why Furnitects' },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-cream/80 transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-cream/60">
          <p>
            © {new Date().getFullYear()} Furnitects. {BRAND.website} · All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
