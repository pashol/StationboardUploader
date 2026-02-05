import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // SBB Brand Colors (10% distribution - primary actions)
        sbb: {
          red: "#EB0000",
          red125: "#C60018",
          red150: "#A20013",
        },
        // SBB Accent Colors (5% distribution)
        accent: {
          blue: "#2D327D",
        },
        // SBB Neutral Scale (25% distribution)
        neutral: {
          white: "#FFFFFF",
          milk: "#F6F6F6",
          cloud: "#E5E5E5",
          silver: "#DCDCDC",
          aluminum: "#D2D2D2",
          platinum: "#CDCDCD",
          cement: "#BDBDBD",
          graphite: "#B7B7B7",
          storm: "#A8A8A8",
          smoke: "#8D8D8D",
          metal: "#767676",
          granite: "#686868",
          anthracite: "#5A5A5A",
          iron: "#444444",
          charcoal: "#212121",
          midnight: "#151515",
          black: "#000000",
        },
        // Semantic aliases
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
