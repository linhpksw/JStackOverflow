const path = require('path');

module.exports = {
    content: ['./src/templates/*.html', './src/static/js/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [
        {
            tailwindcss: {},
            autoprefixer: {},
        },
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/container-queries'),
    ],
    build: {
        rollupOptions: {
            input: {
                index: path.resolve(__dirname, 'src', 'index.html'),
                'home-page': path.resolve(
                    __dirname,
                    'src',
                    'templates',
                    'home-page.html'
                ),

                // Add as many HTML files as you need
            },
        },
    },
};
