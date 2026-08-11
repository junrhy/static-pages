const fs = require('fs');
const path = require('path');
require('dotenv').config();

const THEME = process.env.VITE_THEME || 'gold';
console.log(`[Pre-build] Setting theme to: ${THEME}`);

const htmlPath = path.join(__dirname, 'dist', 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Replace the placeholder or the previous theme with the correct theme
if (html.includes('<%- VITE_THEME %>')) {
    html = html.replace('<%- VITE_THEME %>', THEME);
} else {
    // Fallback if it was already replaced or is hardcoded in some way
    html = html.replace(/data-theme="[^"]*"/, `data-theme="${THEME}"`);
}

fs.writeFileSync(htmlPath, html);
console.log('[Pre-build] index.html updated successfully.');
