/**
 * 顶部导航栏组件
 * 固定在页面顶部，包含 Logo、导航菜单和移动端抽屉菜单
 * 滚动时会添加毛玻璃背景和边框效果
 */
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { site } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function Navbar() {
  /** 移动端菜单是否展开 */
  const [open, setOpen] = useState(false);
  /** 页面是否已滚动（用于切换导航栏样式） */
  const [scrolled, setScrolled] = useState(false);

  // 监听滚动事件，滚动超过 8px 时切换导航栏样式
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll(); // 初始化时执行一次
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-cream-100/80 backdrop-blur-md border-b border-ink-900/5' // 滚动后：毛玻璃背景 + 底部边框
          : 'bg-transparent' // 顶部时：透明背景
      )}
    >
      <div className="container max-w-6xl flex items-center justify-between h-16">
        {/* Logo 和博客名称，点击跳转首页 */}
        <NavLink to="/" className="group flex items-center gap-2.5">
          <img
            src="/favicon.png"
            alt="檬橙博客"
            className="w-9 h-9 rounded-lg shadow-soft object-cover"
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

        {/* 桌面端导航菜单（中等屏幕以上显示） */}
        <nav className="hidden md:flex items-center gap-1">
          {site.nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'} // 首页需要精确匹配，避免其他页面也高亮
              className={({ isActive }) =>
                cn(
                  'relative px-4 py-2 text-sm font-medium rounded-full transition-colors',
                  isActive
                    ? 'text-ink-900 bg-cream-200' // 激活状态：深色文字 + 背景
                    : 'text-ink-700 hover:text-ink-900 hover:bg-cream-200/60' // 未激活：悬浮效果
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* 移动端菜单按钮（中等屏幕以下显示） */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-cream-200/70 text-ink-800 hover:bg-cream-200"
          aria-label="切换菜单"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* 移动端展开菜单 */}
      {open && (
        <div className="md:hidden border-t border-ink-900/5 bg-cream-100/95 backdrop-blur-md">
          <nav className="container max-w-6xl py-3 flex flex-col">
            {site.nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setOpen(false)} // 点击后自动关闭菜单
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
