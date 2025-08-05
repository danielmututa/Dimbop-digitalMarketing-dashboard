/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      
      colors: {
        navbar: '#6600EE',
        body: '#3700B3',
        buttons:'#BB86FC'
      },
      fontFamily: {
        montserrat: ["Montserrat-Regular", "sans-serif"],
        montserratBold: ["Montserrat-Bold", "sans-serif"],
      },
    },
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all JavaScript, JSX, TypeScript, and TSX files in the src directory
    "./public/index.html", // Include your HTML files if necessary
  ],
 
  plugins: [],
}

