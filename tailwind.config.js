module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx,html,css}'],
  theme: {
    extend: {
      colors: {
        'defaultBg': '#FFFFFF',
        'footerBg':  '#2D2D2D',
        
        'dafaultText': 	'#000000',
        'primaryFont': 	'#2D2D2D',
        'secundaryFont':'#8F8F8F',
        'darkGray':		'#6B6B6B',
        
        'grayPattern': 		'#F2F2F2',
        'neutralMain-500':	'#1C8C64'
        },
      boxShadow: {
        'pattern': '0px 4px 6px 0px #0000000F',
        },
      keyframes: {
        openEffect: {
          '0%': { opacity: 0 },
          '25%': { opacity: 0.25 },
          '50%': { opacity: 0.5 },
          '75%': { opacity: 0.75 },
          '100%': { opacity: 1 },
        },
        movePhotoUp: {
          '0%': {opacity : 0 },
          '25%': { opacity: 0.25 },
          '50%': { opacity: 0.5 },
          '75%': { opacity: 0.75 },
          '100%': { opacity: 1 },
        },
        closeEffect: {
          '0%': { opacity: 1 },
          '25%': { opacity: 0.75 },
          '50%': { opacity: 0.5 },
          '75%': { opacity: 0.25 },
          '100%': { opacity: 0 },
        },        
        openCartEffect: {
          '0%': { transform: 'translateX(400px)' },
          '100%': { transform: 'translateX(0)' },
        },
        closeCartEffect: {
          '0%': { transform: 'translateX(0px)' },
          '100%': { transform: 'translateX(600px)' },
        }
      },
      animation: {
        'openMenu': 'openEffect .5s linear',
        'closeErroAuth': 'closeEffect 2s linear',
        'openCart': 'openCartEffect 0.2s linear',
        'closeCart': 'closeCartEffect 0.2s linear',
      }, 
    },
    fontFamily: {
      'permanentMarker': ['Permanent Marker', 'cursive'],
      'code': ['M PLUS Code Latin', "'sans-serif'"],
      'cormorant': ['Cormorant', "'sans-serif'"],
      'caudex': ['Caudex', "'sans-serif'"],
    },
  },
  plugins: [],
};