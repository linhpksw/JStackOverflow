import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                'home-page': resolve(__dirname, './src/templates/home-page.html'),
                'profile-page': resolve(__dirname, './src/templates/profile-page.html'),

                'sign-up': resolve(__dirname, './library/templates/sign-up.html'),
                'sign-in': resolve(__dirname, './library/templates/sign-in.html'),
            },
        },
    },
});
