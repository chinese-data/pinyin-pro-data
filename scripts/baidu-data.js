const { 
  fetchContent, 
  isZhChar, 
  findStringIndex,
  getNumOfTone,
  handleDictChangeTone,
} = require('./utils');
const fs = require('fs');
const cur = require('./cur');

const result = {};

fetchContent(
  'https://raw.githubusercontent.com/SivanLaai/BaiduPinyinCrawler/main/data/single_character_info.txt',
  (data) => {
    if (!data) {
      return;
    }
    const raws = data.split('\n');
    raws.forEach(raw => {
      const [pinyin, word] = raw.split('\t').map(item => item.trim());
      if (isZhChar(word?.[0]) && word.length === pinyin.split(' ').length) {
        if (pinyin.endsWith('r') && !['é', 'ě', 'e'].includes(pinyin[pinyin.length - 2])) {
          //
        } else {
          result[word] = pinyin;
        }
      }
    })
    handleDictChangeTone(result);
    for (let word in cur) {
      if (result[word] && result[word] !== cur[word]) {
        delete result[word];
      }
    }

    fs.writeFileSync('../data/baidu-data.json', JSON.stringify(result), 'utf-8');

    const dict = {
      2: {},
      3: {},
      4: {},
    }
    for (let word in result) {
      dict[word.length][word] = result[word]
    }
    for (let key in dict) {
      fs.writeFileSync(`../data/baidu-data-${key}.json`, JSON.stringify(dict[key]), 'utf-8');
    }
  }
);
