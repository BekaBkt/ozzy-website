import { createCanvas, loadImage } from 'canvas';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.resolve(__dirname, '../public/favicon.png');
const dst = path.resolve(__dirname, '../public/favicon.png');

const SIZE = 512;
const RADIUS = SIZE * 0.22; // ~22% corner radius — matches iOS app icon style

const img = await loadImage(src);
const canvas = createCanvas(SIZE, SIZE);
const ctx = canvas.getContext('2d');

// Clip to rounded rect
ctx.beginPath();
ctx.moveTo(RADIUS, 0);
ctx.lineTo(SIZE - RADIUS, 0);
ctx.quadraticCurveTo(SIZE, 0, SIZE, RADIUS);
ctx.lineTo(SIZE, SIZE - RADIUS);
ctx.quadraticCurveTo(SIZE, SIZE, SIZE - RADIUS, SIZE);
ctx.lineTo(RADIUS, SIZE);
ctx.quadraticCurveTo(0, SIZE, 0, SIZE - RADIUS);
ctx.lineTo(0, RADIUS);
ctx.quadraticCurveTo(0, 0, RADIUS, 0);
ctx.closePath();
ctx.clip();

// Draw image scaled to fill
ctx.drawImage(img, 0, 0, SIZE, SIZE);

const buf = canvas.toBuffer('image/png');
writeFileSync(dst, buf);
console.log('✅ Rounded favicon saved to public/favicon.png');
