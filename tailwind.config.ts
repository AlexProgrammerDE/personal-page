import {fontFamily} from "tailwindcss/defaultTheme";
import typography from "@tailwindcss/typography";
import {type Config} from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
      colors: {
        background: "#222433",
        brighter: "#1d1e2c",
        section: "#c74d5f",
        sectionDark: "#963747",
        sectionDarkest: "#85333f",
        content: "#2EB086",
        text: "#EEE6CE"
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              marginBottom: "0.5rem",
            },
            h2: {
              marginTop: "1rem",
              marginBottom: "0.5rem",
            },
            h3: {
              marginTop: "1rem",
              marginBottom: "0.5rem",
            },
            p: {
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
            },
            img: {
              marginTop: "0.75em",
              marginBottom: "0.75em",
            }
          },
        },
      },
    },
  },
  plugins: [typography],
} satisfies Config
