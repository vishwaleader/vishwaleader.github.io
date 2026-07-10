const fs = require('fs');
const content = fs.readFileSync('src/app/auth/member/member-client.tsx', 'utf8');
let divCount = 0;
let lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  let opens = (line.match(/<div(\s|>)/g) || []).length;
  let closes = (line.match(/<\/div>/g) || []).length;
  divCount += opens - closes;
  if (i > 1250 && i < 1320) {
    console.log(`Line ${i+1}: opens ${opens}, closes ${closes}, balance ${divCount} - ${line.trim()}`);
  }
}
console.log('Final balance:', divCount);
