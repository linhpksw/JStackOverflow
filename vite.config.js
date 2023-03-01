import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                'home-page': resolve(
                    __dirname,
                    './src/templates/home-page.html'
                ),
                'profile-page': resolve(
                    __dirname,
                    './src/templates/profile-page.html'
                ),
            },
        },
    },
});
