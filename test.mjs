import fs from 'fs';
const text = fs.readFileSync('app/page.tsx', 'utf8');
if (text.includes('Html')) console.log('Contains Html');
if (text.includes('next/document')) console.log('Contains next/document');
