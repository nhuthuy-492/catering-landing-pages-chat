const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\LENOVO\\.gemini\\antigravity-ide\\scratch\\spit-roast-landing-pages\\spit-roast-catering-waverley\\spit-roast-catering-waverley.html', 'utf8');

console.log('File size:', content.length, 'bytes');

// Search for the FAQ list items
const regex = /<span class="sc-eqUAAy cqCbBg">([\s\S]*?)<\/span>/gi;
let match;
let i = 1;
while ((match = regex.exec(content)) !== null) {
  console.log(`FAQ Title ${i++}:`, match[1].trim());
}

// Search for the accordion description paragraphs
const descRegex = /<p class="rteBlock" no_space_b="true" no_space_e="true">([\s\S]*?)<\/p>/gi;
let descMatch;
let j = 1;
while ((descMatch = descRegex.exec(content)) !== null) {
  console.log(`FAQ Answer ${j++}:`, descMatch[1].trim().substring(0, 150) + '...');
}
