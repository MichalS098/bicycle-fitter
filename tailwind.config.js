/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.vue',    
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'var(--ion-color-primary)',
        'secondary': 'var(--ion-color-secondary)',
        'tertiary': 'var(--ion-color-tertiary)',
      },
      fontFamily: {
        'sans': ['Lato', 'sans-serif'],
      },      
    },
  },
  plugins: [
    require('@tailwindcss/forms'),        
  ],
}

