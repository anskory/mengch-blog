/**
 * 页脚组件
 * 展示博客简介、站点导航、联系方式、备案号和版权信息
 * 采用三列布局，移动端自动折叠为单列
 */
import { Github, Mail, Heart, type LucideIcon } from 'lucide-react';
import { site } from '@/lib/data';
import BeianBadge from './BeianBadge';

/** 社交平台名称到图标的映射表 */
const socialIcons: Record<string, LucideIcon> = {
  GitHub: Github,
  Email: Mail,
};

export default function Footer() {
  /** 当前年份，用于版权信息 */
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-ink-900/8 bg-cream-200/40">
      {/* 顶部装饰线：柠檬色渐变分隔线 */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lemon-400/40 to-transparent" />
      <div className="container max-w-6xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* 第一列：博客 Logo 和简介 */}
          <div>
            <div className="flex items-center gap-2.5">
              <img
                src="/favicon.png"
                alt={site.name}
                className="w-9 h-9 rounded-lg shadow-soft object-cover"
              />
              <span className="font-display text-lg text-ink-900 font-semibold">
                {site.name}
              </span>
            </div>
            <p className="mt-4 text-sm text-ink-600 leading-relaxed max-w-xs">
              {site.description}
            </p>
          </div>

          {/* 第二列：站点导航链接 */}
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

          {/* 第三列：联系方式 */}
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

        {/* 分隔线 */}
        <div className="divider-soft my-8" />

        {/* 底部备案号和版权信息，居中显示 */}
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
