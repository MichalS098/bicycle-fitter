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
        'prose-invert-lighter': '#F8F8F8',
        'prose-invert-lightest': '#FFFFFF',
      },
      fontFamily: {
        'sans': ['Lato', 'sans-serif'],
      },
      typography: (theme) => ({
        'white': {
          css: {
            color: theme('colors.prose-invert-lightest'),
            '.prose .lead': {
              color: theme('colors.prose-invert-lighter'),
            },
            a: {
              color: theme('colors.prose-invert-lightest'),
              '&:hover': {
                color: theme('colors.prose-invert-lighter'),
              },
            },            
            'h1': {
              color: theme('colors.prose-invert-lightest'),
            },
            'h2': {
              color: theme('colors.prose-invert-lightest'),
            },
            'h3': {
              color: theme('colors.prose-invert-lightest'),
            },
            'h4': {
              color: theme('colors.prose-invert-lighter'),
            },
            'h5': {
              color: theme('colors.prose-invert-lighter'),
            },
            'h6': {
              color: theme('colors.prose-invert-lighter'),
            },
            'strong': {
              color: theme('colors.prose-invert-lightest'),
            },
            'code': {
              color: theme('colors.prose-invert-lighter'),
            },
            'blockquote': {
              color: theme('colors.prose-invert-lighter'),
            },
            'ul': {
              li: {
                color: theme('colors.prose-invert-lighter'),
              },
            },
            'ol': {
              li: {
                color: theme('colors.prose-invert-lighter'),
              },
            },
            'pre': {
              color: theme('colors.prose-invert-lighter'),
            },
            'table': {
              color: theme('colors.prose-invert-lighter'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
}

