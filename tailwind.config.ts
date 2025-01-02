import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1280px",
    },
    fontFamily: {
      primary: "var(--font-jetbrains-mono)",
    },
    extend: {
      colors: {
        light: {
          primary: "#FAF3EB",
          secodary: "#FFD4A9",
          accent: "#FFC5C5",
          text: "#2B3440",
        },
        dark: {
          primary: "#1a2534",
          secondary: "#3a4d5e",
          accent: "#738894",
          text: "#b8c4d0",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
