import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container max-w-2xl pt-32 pb-20 text-center">
      <div className="font-display text-[140px] md:text-[180px] leading-none text-ink-900 font-semibold tracking-tighter">
        4<span className="text-orange-500">0</span>4
      </div>
      <h1 className="mt-4 font-display text-2xl text-ink-900 font-semibold">
        这页橘子不见了
      </h1>
      <p className="mt-3 text-ink-600">
        你想找的页面可能已经搬家，或者从未存在过。
      </p>
      <Link
        to="/"
        className="mt-7 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-ink-900 text-cream-50 text-sm font-medium hover:bg-orange-600 transition-colors"
      >
        <ArrowLeft size={14} /> 回到首页
      </Link>
    </div>
  );
}
