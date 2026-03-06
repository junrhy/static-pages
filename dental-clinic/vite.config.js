import { defineConfig, loadEnv } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig(({ mode }) => {
    // Load env file based on `mode` in the current working directory.
    // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
    const env = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [
            createHtmlPlugin({
                inject: {
                    data: {
                        VITE_THEME: process.env.VITE_THEME || env.VITE_THEME || 'gold'
                    }
                }
            })
        ]
    };
});
