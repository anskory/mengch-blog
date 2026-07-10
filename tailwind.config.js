/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
    },
    extend: {
      colors: {
        cream: {
          50: "#FDFBF6",
          100: "#FBF8F3",
          200: "#F4ECDF",
          300: "#E8DCC4",
        },
        ink: {
          900: "#1F1B16",
          800: "#2E2820",
          700: "#3D362C",
          600: "#6B6660",
          500: "#8A857E",
          400: "#B5B0A8",
        },
        lemon: {
          300: "#FCE38A",
          400: "#F7C04A",
          500: "#EFA42B",
        },
        orange: {
          400: "#F4A36C",
          500: "#F08A4B",
          600: "#D66B2C",
        },
        mint: {
          300: "#C9DCC9",
          400: "#A8C8B5",
          500: "#7AAE96",
        },
        blush: {
          300: "#F8D1D1",
          400: "#F4B6B6",
        },
      },
      fontFamily: {
        display: ['"Fraunces"', '"Noto Serif SC"', "ui-serif", "Georgia", "serif"],
        sans: ['"Inter"', '"Noto Sans SC"', "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ['"Noto Serif SC"', "ui-serif", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(31, 27, 22, 0.12)",
        glow: "0 0 0 1px rgba(247, 192, 74, 0.3), 0 12px 36px -12px rgba(240, 138, 75, 0.35)",
        ring: "inset 0 0 0 1px rgba(31, 27, 22, 0.08)",
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.12  0 0 0 0 0.1  0 0 0 0 0.08  0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        "sun-gradient": "linear-gradient(135deg, #F7C04A 0%, #F4A36C 50%, #F08A4B 100%)",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(2deg)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "cursor-blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        "fade-up": "fade-up 0.7s ease-out both",
        cursor: "cursor-blink 1s steps(1) infinite",
        "spin-slow": "spin-slow 20s linear infinite",
      },
    },
  },
  plugins: [],
};
