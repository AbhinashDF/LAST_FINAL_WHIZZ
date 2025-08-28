import fs from 'fs';
import path from 'path';

console.log('=== Build Debug Information ===');

// Check if dist/public exists
const distPublicPath = path.join(process.cwd(), 'dist', 'public');
console.log('dist/public exists:', fs.existsSync(distPublicPath));

if (fs.existsSync(distPublicPath)) {
  console.log('Files in dist/public:');
  const files = fs.readdirSync(distPublicPath, { recursive: true });
  files.forEach(file => {
    console.log(`  - ${file}`);
  });
}

// Check if index.html exists
const indexPath = path.join(distPublicPath, 'index.html');
console.log('index.html exists:', fs.existsSync(indexPath));

if (fs.existsSync(indexPath)) {
  const content = fs.readFileSync(indexPath, 'utf8');
  console.log('index.html content preview:');
  console.log(content.substring(0, 200) + '...');
}

// Check package.json
const packagePath = path.join(process.cwd(), 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
console.log('Package name:', packageJson.name);
console.log('Build script:', packageJson.scripts.build);

console.log('=== End Debug Information ===');
