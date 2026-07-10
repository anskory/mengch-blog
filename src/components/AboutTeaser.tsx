/**
 * 关于作者预告组件
 * 在首页展示博主的简要介绍，包括头像、昵称、个人简介和联系方式
 * 带有渐变装饰背景，营造温馨友好的视觉效果
 */
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { site } from '@/lib/data';

/**
 * 关于作者预告组件
 * 展示博主头像、昵称、个人简介以及"更多关于我"和邮箱链接
 */
export default function AboutTeaser() {
  return (
    <section className="container max-w-6xl">
      <div className="relative overflow-hidden rounded-3xl bg-cream-200/70 border border-ink-900/8 p-8 md:p-12">
        {/* 装饰性渐变光斑：右上角太阳光晕 */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 -right-16 w-72 h-72 rounded-full bg-sun-gradient opacity-20 blur-3xl"
        />
        {/* 装饰性渐变光斑：左下角薄荷绿光晕 */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-10 w-64 h-64 rounded-full bg-mint-300 opacity-30 blur-3xl"
        />

        {/* 主要内容区域：左侧头像 + 右侧文字信息 */}
        <div className="relative grid md:grid-cols-[auto,1fr] gap-8 items-center">
          {/* 头像区域 */}
          <div className="relative">
            {/* 外层圆形边框：太阳光渐变效果 */}
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-sun-gradient p-1 shadow-soft">
              {/* 内层圆形头像容器 */}
              <div className="w-full h-full rounded-full bg-cream-100 flex items-center justify-center overflow-hidden">
                {/* 头像文字："檬"字 */}
                <span className="font-display text-4xl md:text-5xl font-bold text-ink-900">
                  檬
                </span>
              </div>
            </div>
            {/* 右下角小徽章：字母 M */}
            <span className="absolute -bottom-1 -right-1 inline-flex items-center justify-center w-9 h-9 rounded-full bg-mint-400 border-4 border-cream-200 text-cream-50 text-xs font-bold">
              M
            </span>
          </div>

          {/* 文字信息区域 */}
          <div>
            {/* 眉题：About the author */}
            <p className="text-xs uppercase tracking-[0.2em] text-orange-500 font-medium">
              About the author
            </p>
            {/* 标题：博主昵称 */}
            <h2 className="mt-2 font-display text-2xl md:text-3xl text-ink-900 font-semibold">
              你好，我是{site.owner} 👋
            </h2>
            {/* 个人简介 */}
            <p className="mt-3 text-ink-700 leading-relaxed max-w-xl text-pretty">
              一名喜欢写代码的普通上班族。白天是工程师、夜晚是写字的人。
              喜欢设计、动画、独处、还有夏天的橘子味汽水。
              这个博客就是我留给自己的一个小角落。
            </p>
            {/* 操作按钮区域 */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              {/* 更多关于我按钮：跳转至关于页面 */}
              <Link
                to="/about"
                className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-ink-900 text-cream-50 text-sm font-medium hover:bg-orange-600 transition-colors"
              >
                更多关于我
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
              {/* 邮箱链接 */}
              <a
                href={`mailto:${site.email}`}
                className="text-sm text-ink-700 hover:text-orange-600 transition-colors"
              >
                {site.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
