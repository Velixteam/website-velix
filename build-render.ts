/**
 * Velix Static Renderer
 * Run with: npx tsx build-render.ts
 * 
 * 1. Starts Velix server
 * 2. Fetches all page routes as HTML
 * 3. Saves them to out/ directory
 * 4. Copies public assets
 * 5. Exits
 */

import { createServer } from '@teamvelix/velix/server';
import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const OUT_DIR = path.join(projectRoot, 'out');
const PUBLIC_DIR = path.join(projectRoot, 'public');
const ROUTES = ['/', '/docs', '/compare'];

function cleanDir(dir: string) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true });
  fs.mkdirSync(dir, { recursive: true });
}

function copyDir(src: string, dest: string) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(srcPath, destPath);
    else fs.copyFileSync(srcPath, destPath);
  }
}

async function main() {
  console.log('⚡ Velix Static Build');
  console.log('─'.repeat(40));

  // 1. Clean output
  cleanDir(OUT_DIR);
  console.log('✔ Cleaned output directory');

  // 2. Start Velix server directly (no CLI layer)
  console.log('ℹ Starting Velix server...');
  const { server, config } = await createServer({ projectRoot, mode: 'development' }) as any;

  const port = config?.server?.port || 3000;
  const host = config?.server?.host || 'localhost';
  const baseUrl = `http://${host}:${port}`;

  // Give server a moment to fully initialize
  await new Promise(r => setTimeout(r, 1000));
  console.log(`✔ Server ready at ${baseUrl}`);

  // 3. Fetch and save all routes
  for (const route of ROUTES) {
    try {
      const res = await fetch(`${baseUrl}${route}`);
      const html = await res.text();

      const outPath = route === '/'
        ? path.join(OUT_DIR, 'index.html')
        : path.join(OUT_DIR, route.slice(1), 'index.html');

      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, html);
      console.log(`✔ Pre-rendered: ${route} → ${path.relative(projectRoot, outPath)}`);
    } catch (err: any) {
      console.error(`✖ Failed to render ${route}: ${err.message}`);
    }
  }

  // 4. Copy public assets
  copyDir(PUBLIC_DIR, OUT_DIR);
  console.log('✔ Static assets copied');

  // 5. Summary
  console.log('─'.repeat(40));
  console.log(`✔ Static build complete → out/`);

  // 6. Shutdown
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(0), 1000);
}

main().catch(err => {
  console.error('✖ Build failed:', err.message);
  process.exit(1);
});
