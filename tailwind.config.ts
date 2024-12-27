import { Truculenta } from "next/font/google";
import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx", "node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
  "node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1px',
        sm: '1px',
      }
    },
    variants: {
      extend: {
        display: ["group-hover"]
      }
    }
  },
  plugins: [],
} satisfies Config;
