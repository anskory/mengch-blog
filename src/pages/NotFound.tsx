/**
 * 404 页面组件
 * 功能：当用户访问不存在的路由时展示的错误提示页面
 * 特性：提供返回首页的快捷入口，采用幽默友好的提示文案
 */
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

/**
 * 404 页面组件
 * @returns 返回 404 错误页面的完整 JSX 结构
 */
export default function NotFound() {
  return (
    <div className="container max-w-2xl pt-32 pb-20 text-center">
      {/* 大号 404 数字（中间的"0"用橙色高亮） */}
      <div className="font-display text-[140px] md:text-[180px] leading-none text-ink-900 font-semibold tracking-tighter">
        4<span className="text-orange-500">0</span>4
      </div>
      {/* 错误提示标题 */}
      <h1 className="mt-4 font-display text-2xl text-ink-900 font-semibold">
        这页橘子不见了
      </h1>
      {/* 错误提示描述 */}
      <p className="mt-3 text-ink-600">
        你想找的页面可能已经搬家，或者从未存在过。
      </p>
      {/* 返回首页按钮 */}
      <Link
        to="/"
        className="mt-7 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-ink-900 text-cream-50 text-sm font-medium hover:bg-orange-600 transition-colors"
      >
        <ArrowLeft size={14} /> 回到首页
      </Link>
    </div>
  );
}
