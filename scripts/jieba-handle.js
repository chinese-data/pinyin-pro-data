const fs = require('fs');
const path= require('path');

const dictPath = path.resolve(__dirname, './dict.txt');
const dict = fs.readFileSync(dictPath, 'utf-8');
const dictData = dict.split('\n').map(item => item.split(' ')).slice(72);

const dictPinyinPath = path.resolve(__dirname, './dict-pinyin.txt');
const pinyin = fs.readFileSync(dictPinyinPath, 'utf-8');
const dictPinyinData = pinyin.split('\n').map(item => item.split(':'));

const map = {};
dictPinyinData.forEach((item, index) => {
  const [word, pinyin] = item
  const target = dictData[index];
  if (target) {
  map[word] = [pinyin, Number(target[1]), target[2]]

  }
})

fs.writeFileSync(path.resolve(__dirname, '../data/jieba.json'), JSON.stringify(map));

console.log('jieba.json 生成成功');