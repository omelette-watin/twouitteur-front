module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("tailwind-scrollbar-hide"), require("tailwind-scrollbar")],
}
