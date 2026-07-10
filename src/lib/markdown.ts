/**
 * 极简 Markdown 渲染器
 * 支持：标题（h2/h3）、段落、列表、引用、代码块、行内代码、链接、粗体、斜体、分隔线
 */
function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function applyInline(text: string): string {
  let out = escapeHtml(text);
  // 行内代码
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
  // 粗体
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // 斜体
  out = out.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, '$1<em>$2</em>');
  // 链接
  out = out.replace(
    /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );
  return out;
}

export function renderMarkdown(md: string): string {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const html: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // 代码块
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim();
      const buf: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        buf.push(lines[i]);
        i++;
      }
      i++; // 跳过结尾 ```
      html.push(
        `<pre data-lang="${escapeHtml(lang)}"><code>${escapeHtml(buf.join('\n'))}</code></pre>`
      );
      continue;
    }

    // 标题
    if (line.startsWith('### ')) {
      html.push(`<h3>${applyInline(line.slice(4))}</h3>`);
      i++;
      continue;
    }
    if (line.startsWith('## ')) {
      html.push(`<h2>${applyInline(line.slice(3))}</h2>`);
      i++;
      continue;
    }
    if (line.startsWith('# ')) {
      html.push(`<h1>${applyInline(line.slice(2))}</h1>`);
      i++;
      continue;
    }

    // 分隔线
    if (/^---+\s*$/.test(line)) {
      html.push('<hr/>');
      i++;
      continue;
    }

    // 引用（连续多行合并）
    if (line.startsWith('> ')) {
      const buf: string[] = [];
      while (i < lines.length && lines[i].startsWith('> ')) {
        buf.push(lines[i].slice(2));
        i++;
      }
      html.push(`<blockquote>${applyInline(buf.join(' '))}</blockquote>`);
      continue;
    }

    // 无序列表
    if (/^[-*]\s+/.test(line)) {
      const buf: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        buf.push(lines[i].replace(/^[-*]\s+/, ''));
        i++;
      }
      html.push(
        `<ul>${buf.map((it) => `<li>${applyInline(it)}</li>`).join('')}</ul>`
      );
      continue;
    }

    // 有序列表
    if (/^\d+\.\s+/.test(line)) {
      const buf: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        buf.push(lines[i].replace(/^\d+\.\s+/, ''));
        i++;
      }
      html.push(
        `<ol>${buf.map((it) => `<li>${applyInline(it)}</li>`).join('')}</ol>`
      );
      continue;
    }

    // 空行
    if (line.trim() === '') {
      i++;
      continue;
    }

    // 段落（合并连续非空行）
    const buf: string[] = [line];
    i++;
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

  return html.join('\n');
}
