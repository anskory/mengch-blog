import { Github, Mail, Heart, type LucideIcon } from 'lucide-react';
import { site } from '@/lib/data';
import BeianBadge from './BeianBadge';

const socialIcons: Record<string, LucideIcon> = {
  GitHub: Github,
  Email: Mail,
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-ink-900/8 bg-cream-200/40">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lemon-400/40 to-transparent" />
      <div className="container max-w-6xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2.5">
              <img
                src="/favicon.svg"
                alt={site.name}
                className="w-9 h-9 rounded-lg shadow-soft"
              />
              <span className="font-display text-lg text-ink-900 font-semibold">
                {site.name}
              </span>
            </div>
            <p className="mt-4 text-sm text-ink-600 leading-relaxed max-w-xs">
              {site.description}
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-ink-900 tracking-wide">
              站点
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-ink-600">
              {site.nav.map((item) => (
                <li key={item.to}>
                  <a
                    href={item.to}
                    className="hover:text-orange-500 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-ink-900 tracking-wide">
              联系
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-ink-600">
              {site.social.map((s) => {
                const Icon = socialIcons[s.label] ?? Mail;
                return (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      target={s.url.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 hover:text-orange-500 transition-colors"
                    >
                      <Icon size={14} />
                      {s.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="divider-soft my-8" />

        <div className="flex flex-col items-center gap-3 text-center">
          <BeianBadge />
          <p className="text-xs text-ink-500 inline-flex items-center gap-1">
            © {year} {site.name} · Made with
            <Heart size={12} className="text-orange-500 fill-orange-500" />
            by {site.owner}
          </p>
        </div>
      </div>
    </footer>
  );
}
