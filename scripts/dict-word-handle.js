const fs = require('fs');
const path= require('path');
const crypto = require('crypto');
const https = require('https');
const querystring = require('querystring');

const dictPath = path.resolve(__dirname, './dict-word.txt');
const dict = fs.readFileSync(dictPath, 'utf-8');
const words = dict.split('\n');


const ID = '';
const KEY = '';

(async function () {
  for (let i = 0; i < words.length; i += 300) {
    const textList = words.slice(i, i + 300);
    const text = textList.join('\n')
    const data = {
        id: ID,
        query: text,
        o: 0,
        k: 1,
        s: 1,
        f: 1
    }
    data['sign'] = crypto.createHash('md5').update(ID + crypto.createHash('md5').update(KEY).digest('hex') + text).digest('hex');
    const postData = querystring.stringify(data);
  
    const options = {
      hostname: 'api.zrqr.net',
      port: 443,
      path: '/pinyin/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };
  
    function fetchData() {
      return new Promise(resolve => {
        const req = https.request(options, (res) => {
          let responseData = '';
          res.on('data', (chunk) => {
            responseData += chunk;
          });
          res.on('end', () => {
            resolve(JSON.parse(responseData));
          });
        });
        
        req.on('error', (error) => {
          console.error(error);
        });
        
        req.write(postData);
        req.end();
      })
    }
    const result = await fetchData();
    const pinyinData = result.pinyin.split('\\n').map((item, j) => `${textList[j]}:${item}`).join('\n') + '\n';
    fs.appendFileSync(path.resolve(__dirname, './dict-pinyin.txt'), pinyinData);
  }  
})();
