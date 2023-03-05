import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),

                'sign-up': resolve(__dirname, './library/templates/sign-up.html'),
                'sign-in': resolve(__dirname, './library/templates/sign-in.html'),
            },
        },
    },
});
