const fs = require('fs');

let imports = '';
let arrayElements = [];

for (let i = 0; i <= 74; i++) {
  const num = i.toString().padStart(2, '0');
  imports += `import frame${num} from '@/components/photos/content/ezgif-split/frame_${num}_delay-0.04s.png';\n`;
  arrayElements.push(`frame${num}.src`);
}

const content = `
${imports}
const framesSrc = [
  ${arrayElements.join(', ')}
];
`;

fs.writeFileSync('generated_imports.txt', content);
console.log('Done!');
