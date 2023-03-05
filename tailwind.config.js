const path = require('path');

module.exports = {
    content: [
        './src/templates/*.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './*.html',
        './node_modules/flowbite/**/*.js',

        './library/templates/*.html',
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
    ],
    build: {
        rollupOptions: {
            input: {
                index: path.resolve(__dirname, 'src', 'index.html'),

                'sign-up': path.resolve(__dirname, 'library', 'templates', 'sign-up.html'),
                'sign-in': path.resolve(__dirname, 'library', 'templates', 'sign-in.html'),

                // Add as many HTML files as you need
            },
        },
    },
};
