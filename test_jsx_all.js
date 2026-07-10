const fs = require('fs');
const content = fs.readFileSync('src/app/auth/member/member-client.tsx', 'utf8');
let divCount = 0;
let lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  let opens = (line.match(/<div(\s|>)/g) || []).length;
  let closes = (line.match(/<\/div>/g) || []).length;
  divCount += opens - closes;
  if (divCount < 0) {
    console.log(`Unbalanced at line ${i+1}: ${line.trim()}`);
    break;
  }
}
console.log('Final balance:', divCount);
