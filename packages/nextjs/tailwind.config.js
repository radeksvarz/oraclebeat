/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-content": "var(--color-primary-content)",
        secondary: "var(--color-secondary)",
        "secondary-content": "var(--color-secondary-content)",
        accent: "var(--color-accent)",
        neutral: "var(--color-neutral)",
        "base-100": "var(--color-base-100)",
        info: "var(--color-info)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
      },
    },
  },
  plugins: [],
}; 