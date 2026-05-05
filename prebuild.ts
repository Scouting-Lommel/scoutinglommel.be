console.log('> prebuilding...');
const path = require('node:path');
const fs = require('fs');
const baseDir = process.cwd();

const patchNextRequireHook = async () => {
  const file = path.join(baseDir, 'node_modules', 'next', 'dist', 'server', 'require-hook.js');

  const content = await fs.promises.readFile(file, 'utf-8');
  await fs.promises.writeFile(
    file,
    content.replace('if (process.env.__NEXT_PRIVATE_PREBUNDLED_REACT) {', 'if (true) {'),
  );
};

const invalidateNextCache = () => {
  try {
    const dir = path.join(baseDir, '.next');
    fs.rmSync(dir, { recursive: true, force: true });
  } catch {}
};

patchNextRequireHook();
invalidateNextCache();
