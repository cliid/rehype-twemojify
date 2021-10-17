/* eslint-disable no-param-reassign */
/**
 * @typedef {import('hast').Root} Root
 * @typedef {import('twemoji').ParseObject & { params: { [key: string]: any; isNext: boolean } }} Options
 */
import emojiRegex from 'emoji-regex';
import GraphemeSplitter from 'grapheme-splitter';
import twemoji from 'twemoji';
import { visit } from 'unist-util-visit';

const regex = emojiRegex();
const splitter = new GraphemeSplitter();

/**
 * Plugin to twemoji-fy ordinary emojis in HTML.
 *
 * @type {import('unified').Plugin<[Options?]|void[], Root>}
 */
export default function rehypeTwemojify(options = {}) {
  return (tree) => {
    visit(tree, 'text', (node) => {
      if (node.value.match(regex)) {
        let c = [],
          s = '';
        for (const ch of splitter.splitGraphemes(node.value)) {
          if (ch.match(regex)) {
            c.push({
              type: 'text',
              value: s
            });
            s = '';
            if (!options.isNext) {
              let params = '';
              if (options.params) params += '?';
              for (const key in options.params) {
                params += `${key}=${options.params[key]}&`;
              }
              params = params.substr(0, params.length - 1);
              c.push({
                type: 'element',
                tagName: 'img',
                properties: {
                  className: [options.className ?? 'emoji'],
                  draggable: false,
                  alt: ch,
                  decoding: 'async',
                  src: `${options.base ?? 'https://twemoji.maxcdn.com/v/latest'}/${
                    options.folder ?? options.size ?? '72x72'
                  }/${twemoji.convert.toCodePoint(ch)}${options.ext ?? '.png'}${params}`
                },
                children: []
              });
            } else {
              let params = '';
              for (const key in options.params) {
                params += `&${key}=${options.params[key]}`;
              }
              c.push({
                type: 'element',
                tagName: 'img',
                properties: {
                  className: [options.className ?? 'emoji'],
                  draggable: false,
                  alt: ch,
                  src: `/_next/image?url=${`${
                    options.base ?? 'https://twemoji.maxcdn.com/v/latest'
                  }/${options.folder ?? options.size ?? '72x72'}/${twemoji.convert.toCodePoint(
                    ch
                  )}${options.ext ?? '.png'}`}${params}`
                },
                children: []
              });
            }
          } else {
            s += ch;
          }
        }
        if (s !== '') {
          c.push({
            type: 'text',
            value: s
          });
          s = '';
        }
        node.value = undefined;
        node.type = 'element';
        node.tagName = 'span';
        node.properties = {};
        node.children = c;
      }
    });
  };
}
