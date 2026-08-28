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
        primary: {
          DEFAULT: '#38210F',
          light: '#4A2E17',
        },
        gold: {
          DEFAULT: '#D99A20',
          light: '#F4C542',
        },
        cream: {
          DEFAULT: '#FFF8E7',
        },
        green: {
          DEFAULT: '#4F7D3A',
        },
        teal: {
          DEFAULT: '#00695C',
        },
      },
      fontFamily: {
        fraunces: ['Fraunces', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
