module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  // important: '#root',

  options: {
    important: true,
  },

  theme: {
    extend: {
      fontFamily: {
        Roboto: ['Roboto', 'sans-serif'],
        VT323: ['VT323', 'monospace'],
        Fira: ['Fira Code', 'monospace'],
        Quantico: ['Quantico', 'sans-serif'],
        Inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        fakeBorderTable: '0 0 0 1px #000',
      },
      colors: {
        purple: '#4A49CB',
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *')
      addVariant('child-hover', '& > *:hover')
    },
  ],
}
