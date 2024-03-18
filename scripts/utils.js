async function fetchContent(url, cb) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const content = await response.text();
    cb(content);
  } catch (error) {
    console.log(error);
    cb();
  }
}

function isZhChar(char) {
  if (!char) {
    return false;
  }
  let code = char.charCodeAt(0);
  return code >= 19968 && code <= 40869;
}

function findStringIndex(str, fn) {
  for (let i = 0; i < str.length; i++) {
    if (fn(str[i], i)) {
      return i;
    }
  }
  return -1;
}

function handleDictChangeTone(dict) {
  for (let word in dict) {
    const pinyin = dict[word].split(' ');
    // 一变调
    if (word.includes('一')) {
      if (!word.includes('一一')) {
        for(let i = 0; i < word.length - 1; i++) {
          if (word[i] === '一') {
            if (getNumOfTone(pinyin[i + 1]) === 4) {
              pinyin[i] = 'yí'
            } else if ([1,2,3].includes(getNumOfTone(pinyin[i + 1]))) {
              pinyin[i] = 'yì'
            }
          } else if (word[i] === '不') {
            if (getNumOfTone(pinyin[i + 1]) === 4) {
              pinyin[i] = 'bú'
            }
          }
        }
      }
    }
    if (word.includes('不')) {
      for(let i = 0; i < word.length - 1; i++) {
        if (word[i] === '不') {
          if (getNumOfTone(pinyin[i + 1]) === 4) {
            pinyin[i] = 'bú'
          }
        }
      }
    }
    dict[word] = pinyin.join(' ');
  }
  
}


function getNumOfTone(pinyin) {
  const reg_tone1 = /(ā|ō|ē|ī|ū|ǖ)/;
  const reg_tone2 = /(á|ó|é|í|ú|ǘ|ń|ḿ)/;
  const reg_tone3 = /(ǎ|ǒ|ě|ǐ|ǔ|ǚ|ň)/;
  const reg_tone4 = /(à|ò|è|ì|ù|ǜ|ǹ|m̀)/;
  const reg_tone0 = /(a|o|e|i|u|ü|n)/;
  let tone_num_arr = 0;
  const pinyin_arr = pinyin.split(' ');
  pinyin_arr.forEach((_pinyin) => {
    if (reg_tone1.test(_pinyin)) {
      tone_num_arr = 1;
    } else if (reg_tone2.test(_pinyin)) {
      tone_num_arr = 2;
    } else if (reg_tone3.test(_pinyin)) {
      tone_num_arr = 3;
    } else if (reg_tone4.test(_pinyin)) {
      tone_num_arr = 4;
    } else if (reg_tone0.test(_pinyin)) {
      tone_num_arr = 5;
    }
  });
  return tone_num_arr;
};

module.exports = {
  fetchContent,
  isZhChar,
  findStringIndex,
  getNumOfTone,
  handleDictChangeTone
}