import { Shield } from 'lucide-react';

/**
 * 工信部备案号徽章
 * 根据中国大陆网站备案展示规范：
 * - 显示在所有页面底部居中位置
 * - 带盾牌图标以示权威
 * - 链接至 https://beian.miit.gov.cn
 */
export default function BeianBadge() {
  return (
    <a
      href="https://beian.miit.gov.cn"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center justify-center gap-1.5 text-xs text-ink-600 hover:text-ink-800 transition-colors"
      aria-label="工信部备案信息"
    >
      <Shield
        size={12}
        className="text-ink-500 group-hover:text-orange-500 transition-colors"
      />
      <span>桂ICP备2021007060号</span>
    </a>
  );
}
