import fs from 'node:fs';
import path from 'node:path';
import archiver from 'archiver';

const root = process.cwd();
const dist = path.join(root, 'dist');

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

// Copy essentials
for (const f of ['manifest.json']) {
  fs.copyFileSync(path.join(root, f), path.join(dist, f));
}
for (const d of ['src', 'icons']) {
  fs.cpSync(path.join(root, d), path.join(dist, d), { recursive: true });
}

// Create ZIP
const zipPath = path.join(dist, 'extension.zip');
const output = fs.createWriteStream(zipPath);
const archive = archiver('zip', { zlib: { level: 9 } });

archive.pipe(output);
archive.directory(dist, false);
await archive.finalize();

console.log('[build] dist/ e dist/extension.zip gerados.');
