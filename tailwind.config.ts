import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#1E40AF",
          light: "#60A5FA",
          dark: "#1E3A8A",
        },
        secondary: {
          DEFAULT: "#64748B",
          light: "#94A3B8",
          dark: "#475569",
        },
        success: {
          DEFAULT: "#22C55E",
          light: "#86EFAC",
          dark: "#16A34A",
        },
        warning: {
          DEFAULT: "#F59E0B",
          light: "#FCD34D",
          dark: "#D97706",
        },
        error: {
          DEFAULT: "#EF4444",
          light: "#FCA5A5",
          dark: "#DC2626",
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