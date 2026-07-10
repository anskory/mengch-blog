/**
 * Tailwind CSS 配置文件
 *
 * 配置说明：
 * 定义了檬橙博客的设计系统，包括自定义色彩、字体、阴影、动画等。
 * 整体风格：清新柠橙风格，温暖明亮的配色方案。
 *
 * @type {import('tailwindcss').Config}
 */

export default {
  // 暗色模式：使用 class 策略，通过在 html 标签上添加 dark 类切换
  darkMode: "class",

  // 内容扫描路径：Tailwind 会扫描这些文件中的类名并生成对应 CSS
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    // 容器默认配置：居中显示 + 水平内边距
    container: {
      center: true,
      padding: "1.5rem",
    },

    extend: {
      // ========== 自定义颜色系统 ==========
      // 以柠橙为主题的温暖配色方案
      colors: {
        // 奶油色系：背景色和基础色，温暖柔和
        cream: {
          50: "#FDFBF6",   // 最浅，用于卡片悬浮态
          100: "#FBF8F3",  // 主背景色
          200: "#F4ECDF",  // 次级背景，分隔区域
          300: "#E8DCC4",  // 边框和分隔线
        },
        // 墨色系：文字颜色，深棕黑色调
        ink: {
          900: "#1F1B16",  // 标题和主要文字
          800: "#2E2820",  // 次级文字
          700: "#3D362C",  // 正文文字
          600: "#6B6660",  // 辅助说明文字
          500: "#8A857E",  // 占位符和禁用文字
          400: "#B5B0A8",  // 边框颜色
        },
        // 柠檬黄：亮色强调
        lemon: {
          300: "#FCE38A",  // 浅柠檬，用于标签背景
          400: "#F7C04A",  // 主柠檬色，渐变起始
          500: "#EFA42B",  // 深柠檬，hover 状态
        },
        // 橙色调：主品牌色
        orange: {
          400: "#F4A36C",  // 浅橙，渐变中间
          500: "#F08A4B",  // 主橙色，品牌主色
          600: "#D66B2C",  // 深橙，hover 和强调
        },
        // 薄荷绿：清新辅助色
        mint: {
          300: "#C9DCC9",  // 浅薄荷，标签背景
          400: "#A8C8B5",  // 主薄荷色
          500: "#7AAE96",  // 深薄荷，图标和文字
        },
        // 柔粉色：温柔辅助色
        blush: {
          300: "#F8D1D1",  // 浅粉，标签背景
          400: "#F4B6B6",  // 主粉色
        },
      },

      // ========== 字体配置 ==========
      fontFamily: {
        // 展示字体：用于大标题，带有衬线的优雅感
        display: ['"Fraunces"', '"Noto Serif SC"', "ui-serif", "Georgia", "serif"],
        // 无衬线字体：正文和界面文字
        sans: ['"Inter"', '"Noto Sans SC"', "ui-sans-serif", "system-ui", "sans-serif"],
        // 中文衬线字体：用于强调性中文文字
        serif: ['"Noto Serif SC"', "ui-serif", "Georgia", "serif"],
      },

      // ========== 自定义阴影 ==========
      boxShadow: {
        // 柔和阴影：卡片和弹窗的常规阴影
        soft: "0 10px 40px -12px rgba(31, 27, 22, 0.12)",
        // 发光阴影：主按钮和强调元素的光晕效果
        glow: "0 0 0 1px rgba(247, 192, 74, 0.3), 0 12px 36px -12px rgba(240, 138, 75, 0.35)",
        // 内描边阴影：细微的边框效果
        ring: "inset 0 0 0 1px rgba(31, 27, 22, 0.08)",
      },

      // ========== 背景图片 ==========
      backgroundImage: {
        // 颗粒纹理：用于增加质感的细微噪点
        "grain": "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.12  0 0 0 0 0.1  0 0 0 0 0.08  0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        // 太阳光渐变：柠檬黄到橙的渐变，品牌主视觉
        "sun-gradient": "linear-gradient(135deg, #F7C04A 0%, #F4A36C 50%, #F08A4B 100%)",
      },

      // ========== 关键帧动画 ==========
      keyframes: {
        // 漂浮动画：上下浮动 + 轻微旋转，用于装饰元素
        floaty: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(2deg)" },
        },
        // 渐入上移动画：元素入场动画
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // 光标闪烁动画：打字机效果的光标
        "cursor-blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        // 慢速旋转：用于装饰性元素的缓慢旋转
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
      },

      // ========== 动画预设 ==========
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        "fade-up": "fade-up 0.7s ease-out both",
        cursor: "cursor-blink 1s steps(1) infinite",
        "spin-slow": "spin-slow 20s linear infinite",
      },
    },
  },

  // 插件列表：当前使用 Tailwind 核心功能，未安装额外插件
  plugins: [],
};
