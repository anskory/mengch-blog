import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { site } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-cream-100/80 backdrop-blur-md border-b border-ink-900/5'
          : 'bg-transparent'
      )}
    >
      <div className="container max-w-6xl flex items-center justify-between h-16">
        <NavLink to="/" className="group flex items-center gap-2.5">
          <img
            src="/favicon.svg"
            alt="檬橙博客"
            className="w-9 h-9 rounded-lg shadow-soft"
          />
          <div className="leading-tight">
            <div className="font-display text-lg text-ink-900 font-semibold tracking-tight">
              檬橙博客
            </div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-ink-600 -mt-0.5">
              Mengch · Blog
            </div>
          </div>
        </NavLink>

        <nav className="hidden md:flex items-center gap-1">
          {site.nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cn(
                  'relative px-4 py-2 text-sm font-medium rounded-full transition-colors',
                  isActive
                    ? 'text-ink-900 bg-cream-200'
                    : 'text-ink-700 hover:text-ink-900 hover:bg-cream-200/60'
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-cream-200/70 text-ink-800 hover:bg-cream-200"
          aria-label="切换菜单"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-ink-900/5 bg-cream-100/95 backdrop-blur-md">
          <nav className="container max-w-6xl py-3 flex flex-col">
            {site.nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'px-4 py-3 rounded-xl text-base',
                    isActive
                      ? 'text-ink-900 bg-cream-200 font-semibold'
                      : 'text-ink-700 hover:bg-cream-200/60'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
