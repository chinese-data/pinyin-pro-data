# pinyin-pro-data

## 📖 介绍

[pinyin-pro] 的官方扩充字典包。目前包含的包如下：

- [@pinyin-pro/data/modern.json](https://github.com/chinese-data/pinyin-pro-data/blob/main/packages/pinyin-pro-data/modern.json): 《现代汉语词典(第 7 版)》词语拼音合集(gzip 压缩后大概 0.6 MB)
- [@pinyin-pro/data/complete.json](https://github.com/chinese-data/pinyin-pro-data/blob/main/packages/pinyin-pro-data/complete.json): jieba 中文分词库词语拼音合集(gzip 压缩后大概 3.99 MB)
- [@pinyin-pro/data/chars.json](https://github.com/chinese-data/pinyin-pro-data/blob/main/packages/pinyin-pro-data/chars.json): 部分补充生僻字字典(gzip 压缩后大概 0.1KB)

## 🔨 安装

选择合适的包管理器

```shell
npm install @pinyin-pro/data
yarn add @pinyin-pro/data
pnpm add @pinyin-pro/data
```

## 💡 使用示例

使用扩展字典：

```js
import CharsDict from '@pinyin-pro/data/chars.json';
import { addDict } from 'pinyin-pro';

addDict(CharsDict);
```

使用完备字典:

```js
import { addDict } from 'pinyin-pro';
import CompleteDict from '@pinyin-pro/data/complete.json';
addDict(CompleteDict);
```

使用现代汉语词典:

```js
import { addDict } from 'pinyin-pro';
import ModernDict from '@pinyin-pro/data/modern.json';
addDict(ModernDict);
```
