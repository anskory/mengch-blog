/**
 * 首页 Hero 区组件
 * 包含打字机动画标题、副标题、CTA 按钮和统计数据
 * 背景有渐变光斑和漂浮装饰球，营造清新活泼的视觉氛围
 */
import { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { site } from '@/lib/data';

/** 打字机循环展示的关键词列表 */
const rotatingWords = ['前端', '生活', '随笔', '设计', '思考', '代码'];

export default function Hero() {
  /** 当前展示的关键词索引 */
  const [wordIdx, setWordIdx] = useState(0);
  /** 当前已打出的文字 */
  const [typed, setTyped] = useState('');
  /** 打字机当前阶段：打字中 / 停留 / 擦除中 */
  const [phase, setPhase] = useState<'typing' | 'hold' | 'erasing'>('typing');

  // 打字机动画效果
  // 循环：打字 → 停留 → 擦除 → 切换到下一个词
  useEffect(() => {
    const word = rotatingWords[wordIdx];
    let timer: number;

    if (phase === 'typing') {
      // 打字阶段：逐个字符添加
      if (typed.length < word.length) {
        timer = window.setTimeout(() => setTyped(word.slice(0, typed.length + 1)), 110);
      } else {
        // 打完后停留一会儿
        timer = window.setTimeout(() => setPhase('hold'), 1100);
      }
    } else if (phase === 'hold') {
      // 停留阶段：展示完整词语
      timer = window.setTimeout(() => setPhase('erasing'), 800);
    } else if (phase === 'erasing') {
      // 擦除阶段：逐个字符删除
      if (typed.length > 0) {
        timer = window.setTimeout(() => setTyped(word.slice(0, typed.length - 1)), 55);
      } else {
        // 擦完后切换到下一个词，循环
        setWordIdx((i) => (i + 1) % rotatingWords.length);
        setPhase('typing');
      }
    }
    return () => clearTimeout(timer);
  }, [typed, phase, wordIdx]);

  return (
    <section className="relative overflow-hidden">
      {/* 背景装饰：大渐变光斑 */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 w-[480px] h-[480px] rounded-full bg-sun-gradient opacity-[0.10] blur-3xl" />
        <div className="absolute top-32 right-[-120px] w-[420px] h-[420px] rounded-full bg-blush-400 opacity-[0.18] blur-3xl" />
        <div className="absolute bottom-[-160px] left-1/3 w-[520px] h-[520px] rounded-full bg-mint-400 opacity-[0.10] blur-3xl" />
      </div>

      {/* 背景装饰：漂浮小球 */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-28 right-[12%] w-8 h-8 rounded-full bg-lemon-400/80 animate-floaty shadow-soft" />
        <div
          className="absolute top-44 left-[8%] w-6 h-6 rounded-full bg-orange-400/80 animate-floaty shadow-soft"
          style={{ animationDelay: '1.2s' }}
        />
        <div
          className="absolute bottom-24 right-[18%] w-5 h-5 rounded-full bg-mint-400/80 animate-floaty shadow-soft"
          style={{ animationDelay: '2.4s' }}
        />
        <div
          className="absolute top-1/2 left-[5%] w-3 h-3 rounded-full bg-blush-400 animate-floaty shadow-soft"
          style={{ animationDelay: '0.6s' }}
        />
      </div>

      <div className="container max-w-6xl pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="max-w-3xl">
          {/* 顶部小标签 */}
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream-50 border border-ink-900/8 text-xs text-ink-700 shadow-soft animate-fade-up"
            style={{ animationDelay: '0.05s' }}
          >
            <Sparkles size={12} className="text-orange-500" />
            <span>夏日新刊 · 第 03 期</span>
          </div>

          {/* 主标题：带打字机动画 */}
          <h1
            className="mt-6 font-display text-[2.6rem] sm:text-6xl md:text-7xl leading-[1.05] tracking-tight text-ink-900 text-balance animate-fade-up"
            style={{ animationDelay: '0.15s' }}
          >
            <span className="block">在柠檬与橙光之间，</span>
            <span className="block">
              记录下一些
              <span className="relative inline-block ml-2 align-baseline">
                {/* 打字机渐变色文字 */}
                <span
                  className="bg-sun-gradient bg-clip-text text-transparent"
                  style={{ WebkitBackgroundClip: 'text' }}
                >
                  {typed}
                </span>
                {/* 打字光标 */}
                <span className="inline-block w-[3px] h-[0.9em] align-middle bg-orange-500 ml-0.5 animate-cursor" />
              </span>
            </span>
            <span className="block heading-italic text-ink-700/90 text-4xl sm:text-5xl md:text-6xl mt-1">
              柔软的事。
            </span>
          </h1>

          {/* 副标题描述 */}
          <p
            className="mt-7 max-w-xl text-base sm:text-lg text-ink-600 leading-relaxed text-pretty animate-fade-up"
            style={{ animationDelay: '0.3s' }}
          >
            {site.description} 这里是我的一个小角落，
            <span className="whitespace-nowrap">有文字、有色彩、</span>
            也有写代码时的一点固执。
          </p>

          {/* 行动按钮 */}
          <div
            className="mt-9 flex flex-wrap items-center gap-3 animate-fade-up"
            style={{ animationDelay: '0.45s' }}
          >
            <Link
              to="/articles"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-sun-gradient text-ink-900 font-medium shadow-glow hover:shadow-soft transition-all hover:-translate-y-0.5"
            >
              开始阅读
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-cream-50 text-ink-800 font-medium border border-ink-900/8 hover:border-orange-400/60 hover:text-orange-600 transition-all"
            >
              认识檬橙
            </Link>
          </div>

          {/* 统计数据条 */}
          <div
            className="mt-12 grid grid-cols-3 gap-6 max-w-md animate-fade-up"
            style={{ animationDelay: '0.6s' }}
          >
            <Stat n="06" label="篇精选文章" />
            <Stat n="04" label="主题分类" />
            <Stat n="2026" label="重新出发" />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 统计数字小组件
 * 展示一个数字和对应的说明文字
 */
function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl text-ink-900 font-semibold tracking-tight">
        {n}
      </div>
      <div className="text-xs text-ink-600 mt-1">{label}</div>
    </div>
  );
}
