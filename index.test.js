/**
 * @typedef {import('twemoji').ParseObject & { framework?: string; params: { [key: string]: string | number; } }} Options
 * @typedef {(file: string; options: void | Options) => void} Runner
 */
import { jest } from '@jest/globals';
import rehypeParse from 'rehype-parse';
import rehypePresetMinify from 'rehype-preset-minify';
import { readSync } from 'to-vfile';
import { unified } from 'unified';
import { removePosition } from 'unist-util-remove-position';
import rehypeTwemojify from './index.js';

const basic = unified().use(rehypeParse).use(rehypePresetMinify);

/**
 * Squash parameters
 *
 * @type {Runner}
 */
const run = (file, options) => {
  // file: for example, `basic` --> basic.in.html and basic.out.html
  const processor = unified()
    .use(rehypeParse)
    .use(rehypeTwemojify, options)
    .use(rehypePresetMinify);

  const input = processor.runSync(basic.parse(readSync(`./test/${file}.in.html`)));
  removePosition(input, true);
  const output = basic.runSync(basic.parse(readSync(`./test/${file}.out.html`)));
  removePosition(output, true);
  jest.useFakeTimers();
  test(file, () => {
    expect(input).toEqual(output);
  });
};

// tests

run('basic');
run('massive');
run('svg', { ext: '.svg', size: 'svg' });
run('next', { framework: 'next' });
run('next-custom', { framework: 'next', params: { w: 3840, q: 100 } });
