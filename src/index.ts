import twemoji from '@twemoji/api';
import emojiRegex from 'emoji-regex';
import type { ElementContent, Root, RootContent } from 'hast';
import replaceToArray from 'string-replace-to-array';
import type { Plugin, Transformer } from 'unified';
import { map } from 'unist-util-map';
import {
  FrameworkNextOptions,
  Options,
  resolveOptions,
  TwemojiOptions,
  UserOptions
} from './config';

const regex = emojiRegex();

function sizeToExtension(size: TwemojiOptions['size']): string {
  switch (size) {
    case '72x72':
      return '.png';
    case 'svg':
      return '.svg';
    default:
      throw new Error('Unknown size');
  }
}

/**
 * @summary Turn parameters object in a URL search params string.
 */
function formatParams(params: FrameworkNextOptions['params']): string {
  const urlParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => urlParams.append(key, value.toString()));
  return urlParams.toString();
}

const UFE0Fg = /\uFE0F/g;
const U200D = String.fromCharCode(0x200d);

/**
 * Convert a raw emoji into the relevant Twemoji code point.
 * @param emoji A string containing a single emoji.
 * @returns The code point at which the corresponding emoji can be found in Twemoji.
 * @example The input `'👨‍🌾'` would be converted to `'1f468-200d-1f33e'`
 */
function toCodePoint(emoji: string): string {
  return twemoji.convert.toCodePoint(emoji.indexOf(U200D) < 0 ? emoji.replace(UFE0Fg, '') : emoji);
}

function toBaseUrl(codePoint: string, options: TwemojiOptions): string {
  return `${options.baseUrl}/${options.size}/${codePoint}${sizeToExtension(options.size)}`;
}

function toNextUrl(
  emoji: string,
  nextOptions: FrameworkNextOptions,
  options: TwemojiOptions
): string {
  const codePoint = toCodePoint(emoji);
  return `/_next/image?url=${toBaseUrl(codePoint, options)}&${formatParams(nextOptions.params)}`;
}

/**
 * Convert options to `src` url.
 */
function toUrl(emoji: string, options: Options) {
  switch (options.framework.type) {
    case 'next':
      return toNextUrl(emoji, options.framework, options.twemoji);

    default:
      // your framework isn't supported yet...
      return toBaseUrl(toCodePoint(emoji), options.twemoji);
  }
}

function makeTransformer(options: Options): Transformer<Root, Root> {
  return (tree: Root) => {
    const mappedChildren = tree.children.map(
      (child) =>
        map(child, (node: RootContent) => {
          if (node.type !== 'text' || !regex.test(node.value)) {
            return node;
          }

          const children = replaceToArray(node.value, regex, (text) => ({
            emoji: text
          })).map<ElementContent>((segment) => {
            if (typeof segment === 'string') {
              return {
                type: 'text',
                value: segment
              };
            }
            if (options.exclude.includes(segment.emoji)) {
              return {
                type: 'text',
                value: segment.emoji
              };
            }
            return {
              type: 'element',
              tagName: 'img',
              properties: {
                className: [options.className],
                draggable: 'false',
                alt: segment.emoji,
                decoding: 'async',
                src: toUrl(segment.emoji, options)
              },
              children: []
            };
          });

          const result: RootContent = {
            type: 'element',
            tagName: 'span',
            properties: {},
            children
          };

          return result;
        }) as RootContent
    );

    return {
      ...tree,
      children: mappedChildren
    };
  };
}

/**
 * Plugin to twemoji-fy ordinary emojis in HTML.
 */
const rehypeTwemojify: Plugin<[UserOptions?], Root, Root> = (userOptions) => {
  const options = resolveOptions(userOptions);
  return makeTransformer(options);
};

export default rehypeTwemojify;
