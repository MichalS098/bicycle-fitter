/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.vue',    
  ],
  theme: {
    extend: {
      screens: {        
        'xxs': '375px',        
        'xs': '390px',
      },
      colors: {
        'primary': 'var(--ion-color-primary)',
        'primary-shade': 'var(--ion-color-primary-shade)',
        'primary-tint': 'var(--ion-color-primary-tint)',
        'secondary': 'var(--ion-color-secondary)',
        'secondary-shade': 'var(--ion-color-secondary-shade)',
        'secondary-tint': 'var(--ion-color-secondary-tint)',
        'tertiary': 'var(--ion-color-tertiary)',
        'tertiary-shade': 'var(--ion-color-tertiary-shade)',
        'tertiary-tint': 'var(--ion-color-tertiary-tint)',
        'sand-desert': 'var(--ion-color-sand-desert)',
        'sand-desert-shade': 'var(--ion-color-sand-desert-shade)',
        'sand-desert-tint': 'var(--ion-color-sand-desert-tint)',
        'dark-gray': '#8A8A8A',
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

