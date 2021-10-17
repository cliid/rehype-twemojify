/**
 * @typedef {import('hast').Root} Root
 * @typedef {import('twemoji').ParseObject & { params: { [key: string]: any } }} Options
 */

import emojiRegex from 'emoji-regex';
import runes from 'runes2';
import twemoji from 'twemoji';

const options = {
  params: {
    w: 3840,
    q: 10
  }
};

const regex = emojiRegex();

console.log(!!'🇩🇪'.match(regex));
console.log(twemoji.convert.toCodePoint('🇩🇪'));

for (let c of runes('🇩🇪')) {
  console.log(c);
}
