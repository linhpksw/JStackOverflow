const path = require('path');

module.exports = {
  content: [
    './src/templates/*.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './*.html',
    './node_modules/flowbite/**/*.js',
    './node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {},
    },
    require('daisyui'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/container-queries'),
    require('flowbite/plugin'),
    require('preline/plugin'),
  ],
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'src', 'index.html'),
        'home-page': path.resolve(__dirname, 'src', 'templates', 'home-page.html'),
        'profile-page': path.resolve(__dirname, 'src', 'templates', 'profile-page.html'),

        // Add as many HTML files as you need
      },
    },
  },
};
