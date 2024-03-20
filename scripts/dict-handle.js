const fs = require('fs');
const path= require('path');

const dictPath = path.resolve(__dirname, './dict.txt');
const dict = fs.readFileSync(dictPath, 'utf-8');
const pinyin = dict.split('\n').map(item => item.split(' ')[0]).join('\n');

fs.writeFileSync(path.resolve(__dirname, './dict-word.txt'), pinyin);

console.log('dict-word.txt 生成成功');