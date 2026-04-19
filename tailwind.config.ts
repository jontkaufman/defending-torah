import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#1a1f2e",
          soft: "#2d3448",
          light: "#4a5060",
        },
        parchment: {
          DEFAULT: "#f4ecdc",
          deep: "#ebdfc5",
          shadow: "#d9c9a4",
        },
        ochre: {
          DEFAULT: "#b8732a",
          deep: "#8a5420",
          faint: "rgba(184, 115, 42, 0.07)",
        },
        crimson: {
          DEFAULT: "#7a2e24",
          faint: "rgba(122, 46, 36, 0.06)",
        },
        olive: "#5c6b3f",
        muted: "#574e40",
      },
      fontFamily: {
        heading: ["'Frank Ruhl Libre'", "serif"],
        body: ["'Cormorant Garamond'", "'EB Garamond'", "Georgia", "serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
