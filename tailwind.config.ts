import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        papyrus: {
          50: "#FAF6F0",
          100: "#F5E6D3",
          200: "#E8D7C3",
          300: "#D4C4A8",
          400: "#BBA88A",
          500: "#8B7355",
          600: "#6B5D4F",
          700: "#4A3F35",
          800: "#3A3226",
          900: "#2A231A",
        },
        navy: {
          50: "#E8EAF0",
          100: "#C5CAD6",
          200: "#9BA3B8",
          300: "#717C9A",
          400: "#4A5F7F",
          500: "#2A3550",
          600: "#252A3A",
          700: "#1F2333",
          800: "#1A1F2E",
          900: "#141824",
        },
      },
      fontFamily: {
        heading: ["Cinzel", "serif"],
        body: ["Cardo", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
