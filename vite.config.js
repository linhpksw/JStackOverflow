import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                // main: resolve(__dirname, 'index.html'),
                main: resolve(__dirname, 'index.html'),
                home: resolve(__dirname, './src/templates/home-page.html'),
            },
        },
    },
});

// Hello 
