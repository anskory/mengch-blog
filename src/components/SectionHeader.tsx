/**
 * 区块标题组件
 * 用于页面各区块的标题展示，支持眉题、主标题、描述文本的组合
 * 可选择左对齐或居中对齐两种布局方式
 */

/** 区块标题组件的属性接口 */
interface SectionHeaderProps {
  /** 眉题文字，显示在主标题上方，小号大写样式 */
  eyebrow?: string;
  /** 主标题文字 */
  title: string;
  /** 描述文字，显示在标题下方 */
  description?: string;
  /** 对齐方式，可选值：'left'（左对齐，默认）、'center'（居中对齐） */
  align?: 'left' | 'center';
}

/**
 * 区块标题组件
 * @param eyebrow - 眉题文字（可选）
 * @param title - 主标题文字（必填）
 * @param description - 描述文字（可选）
 * @param align - 对齐方式，默认为左对齐
 */
export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeaderProps) {
  return (
    <header
      // 根据对齐方式动态设置样式：居中对齐时内容居中并限制最大宽度
      className={`mb-10 ${
        align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl'
      }`}
    >
      {/* 眉题：可选显示，小号大写字母，橙色强调色 */}
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.2em] text-orange-500 font-medium">
          {eyebrow}
        </p>
      )}
      {/* 主标题：使用展示字体，响应式字号 */}
      <h2 className="mt-2 font-display text-3xl md:text-4xl text-ink-900 font-semibold tracking-tight text-balance">
        {title}
      </h2>
      {/* 描述文本：可选显示，灰色次级文字 */}
      {description && (
        <p className="mt-3 text-ink-600 leading-relaxed text-pretty">
          {description}
        </p>
      )}
    </header>
  );
}
