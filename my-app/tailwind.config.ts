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
        snow: "#FFFBFE",
        burgundy: "#941C2F",
        citrine: "#EAD637",
        richBlack: "#03191E",
        iceBlue: "#8EF9F3",
      },
    },
  },
  plugins: [],
};
export default config;
