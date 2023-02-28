import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                // main: resolve(__dirname, 'index.html'),
                main: resolve(__dirname, 'index.html'),
               ' question-page': resolve(__dirname, './src/templates/question-page.html'),
            },
        },
    },
});
