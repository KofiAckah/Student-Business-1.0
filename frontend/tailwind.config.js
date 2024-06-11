/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#2F6690",
          200: "#3A7CA5",
          300: "#B8B8B8",
          400: "#16425B",
          500: "#81C3D7",
        },
        secondary: {
          100: "#B49F81",
          200: "#f0e68c", // Change later
        },
      },
    },
  },
  plugins: [],
};
