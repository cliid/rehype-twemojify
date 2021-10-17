/**
 * @typedef {import('hast').Root} Root
 * @typedef {import('twemoji').ParseObject & { params: { [key: string]: any } }} Options
 */

import emojiRegex from 'emoji-regex';
import GraphemeSplitter from 'grapheme-splitter';
import twemoji from 'twemoji';

const options = {
  params: {
    w: 3840,
    q: 10
  }
};

const regex = emojiRegex();
const splitter = new GraphemeSplitter();

console.log(!!'🏴󠁧󠁢󠁷󠁬󠁳󠁿'.match(regex));
console.log(twemoji.convert.toCodePoint('🏴󠁧󠁢󠁷󠁬󠁳󠁿'));

for (let c of splitter.splitGraphemes('🏴󠁧󠁢󠁷󠁬󠁳󠁿')) {
  console.log(c);
}
