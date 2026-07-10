/**
 * 极简 Markdown 渲染器
 *
 * 功能说明：
 * 一个轻量级的 Markdown 到 HTML 的转换器，支持博客文章常用的 Markdown 语法。
 * 采用逐行解析的方式，将 Markdown 文本转换为对应的 HTML 标签。
 *
 * 支持的语法：
 * - 标题：h1 / h2 / h3（# / ## / ###）
 * - 段落：普通文本自动包裹为 <p> 标签
 * - 列表：无序列表（- / *）和有序列表（1. 2. 3.）
 * - 引用：块级引用（> 开头）
 * - 代码块：围栏代码块（```）
 * - 行内格式：行内代码、粗体、斜体、链接
 * - 分隔线：水平线（---）
 */

/**
 * HTML 转义函数
 * 将特殊字符转换为 HTML 实体，防止 XSS 攻击和解析错误
 *
 * @param s - 需要转义的原始字符串
 * @returns 转义后的安全字符串
 */
function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')   // & 符号
    .replace(/</g, '&lt;')    // 小于号
    .replace(/>/g, '&gt;')    // 大于号
    .replace(/"/g, '&quot;')  // 双引号
    .replace(/'/g, '&#39;');  // 单引号
}

/**
 * 应用行内 Markdown 格式
 * 处理行内的代码、粗体、斜体、链接等格式
 *
 * @param text - 需要处理的纯文本行
 * @returns 应用了行内格式的 HTML 字符串
 */
function applyInline(text: string): string {
  let out = escapeHtml(text);

  // 行内代码：`code` → <code>code</code>
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');

  // 粗体：**text** → <strong>text</strong>
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  // 斜体：*text* → <em>text</em>（注意避免与粗体冲突）
  out = out.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, '$1<em>$2</em>');

  // 链接：[text](url) → <a> 标签，外部链接在新窗口打开
  out = out.replace(
    /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  return out;
}

/**
 * Markdown 渲染主函数
 * 将完整的 Markdown 文本逐行解析并转换为 HTML 字符串
 *
 * 解析流程：
 * 1. 统一换行符格式（\r\n → \n）
 * 2. 按行遍历，依次匹配代码块、标题、分隔线、引用、列表、段落
 * 3. 对每个匹配的块级元素应用行内格式处理
 * 4. 拼接所有 HTML 片段并返回
 *
 * @param md - 原始 Markdown 文本
 * @returns 渲染后的 HTML 字符串
 */
export function renderMarkdown(md: string): string {
  // 统一换行符并按行分割
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  // 存储生成的 HTML 片段
  const html: string[] = [];
  // 当前行索引
  let i = 0;

  // 逐行解析 Markdown
  while (i < lines.length) {
    const line = lines[i];

    // ========== 代码块 ==========
    // 匹配 ``` 开头的围栏代码块，支持指定语言
    if (line.startsWith('```')) {
      // 提取代码语言（```后面的文字）
      const lang = line.slice(3).trim();
      const buf: string[] = [];
      i++;
      // 收集代码块内容，直到遇到结束的 ```
      while (i < lines.length && !lines[i].startsWith('```')) {
        buf.push(lines[i]);
        i++;
      }
      i++; // 跳过结尾的 ```
      html.push(
        `<pre data-lang="${escapeHtml(lang)}"><code>${escapeHtml(buf.join('\n'))}</code></pre>`
      );
      continue;
    }

    // ========== 标题 ==========
    // 三级标题：### text
    if (line.startsWith('### ')) {
      html.push(`<h3>${applyInline(line.slice(4))}</h3>`);
      i++;
      continue;
    }
    // 二级标题：## text
    if (line.startsWith('## ')) {
      html.push(`<h2>${applyInline(line.slice(3))}</h2>`);
      i++;
      continue;
    }
    // 一级标题：# text
    if (line.startsWith('# ')) {
      html.push(`<h1>${applyInline(line.slice(2))}</h1>`);
      i++;
      continue;
    }

    // ========== 分隔线 ==========
    // 匹配 --- 或更多短横线组成的水平线
    if (/^---+\s*$/.test(line)) {
      html.push('<hr/>');
      i++;
      continue;
    }

    // ========== 引用 ==========
    // 匹配 > 开头的引用块，连续多行引用会被合并
    if (line.startsWith('> ')) {
      const buf: string[] = [];
      // 收集连续的引用行
      while (i < lines.length && lines[i].startsWith('> ')) {
        buf.push(lines[i].slice(2)); // 去掉 "> " 前缀
        i++;
      }
      html.push(`<blockquote>${applyInline(buf.join(' '))}</blockquote>`);
      continue;
    }

    // ========== 无序列表 ==========
    // 匹配 - 或 * 开头的列表项，连续多行列表会被合并为一个 <ul>
    if (/^[-*]\s+/.test(line)) {
      const buf: string[] = [];
      // 收集连续的列表项
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        buf.push(lines[i].replace(/^[-*]\s+/, '')); // 去掉列表标记
        i++;
      }
      html.push(
        `<ul>${buf.map((it) => `<li>${applyInline(it)}</li>`).join('')}</ul>`
      );
      continue;
    }

    // ========== 有序列表 ==========
    // 匹配数字+点+空格开头的列表项，连续多行合并为一个 <ol>
    if (/^\d+\.\s+/.test(line)) {
      const buf: string[] = [];
      // 收集连续的有序列表项
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        buf.push(lines[i].replace(/^\d+\.\s+/, '')); // 去掉序号前缀
        i++;
      }
      html.push(
        `<ol>${buf.map((it) => `<li>${applyInline(it)}</li>`).join('')}</ol>`
      );
      continue;
    }

    // ========== 空行 ==========
    // 空行直接跳过，不生成任何 HTML
    if (line.trim() === '') {
      i++;
      continue;
    }

    // ========== 段落 ==========
    // 默认情况：将连续的非空、非特殊格式的行合并为一个段落
    const buf: string[] = [line];
    i++;
    // 收集连续的普通文本行，直到遇到空行或特殊格式
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].startsWith('#') &&
      !lines[i].startsWith('```') &&
      !lines[i].startsWith('> ') &&
      !/^[-*]\s+/.test(lines[i]) &&
      !/^\d+\.\s+/.test(lines[i]) &&
      !/^---+\s*$/.test(lines[i])
    ) {
      buf.push(lines[i]);
      i++;
    }
    html.push(`<p>${applyInline(buf.join(' '))}</p>`);
  }

  // 将所有 HTML 片段用换行符连接后返回
  return html.join('\n');
}
