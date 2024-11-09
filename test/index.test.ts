import rehypeParse from 'rehype-parse';
import rehypePresetMinify from 'rehype-preset-minify';
import { readSync } from 'to-vfile';
import { unified } from 'unified';
import { removePosition } from 'unist-util-remove-position';
import { expect, test } from 'vitest';
import { UserOptions } from '../src/config';
import rehypeTwemojify from '../src/index';

const basic = unified().use(rehypeParse).use(rehypePresetMinify);

function run(file: string, options?: UserOptions): void {
  // file: for example, `basic` --> basic.in.html and basic.out.html
  const processor = unified()
    .use(rehypeParse)
    .use(rehypeTwemojify, options)
    .use(rehypePresetMinify);

  const input = processor.runSync(basic.parse(readSync(`./test/assets/${file}.in.html`)));
  removePosition(input, {force: true});
  const output = basic.runSync(basic.parse(readSync(`./test/assets/${file}.out.html`)));
  removePosition(output, {force: true});
  test(file, () => {
    expect(input).toEqual(output);
  });
}

// tests

run('basic');
run('massive');
run('svg', { twemoji: { size: 'svg' } });
run('next', { framework: { type: 'next' } });
run('next-custom', { framework: { type: 'next', params: { w: 3840, q: 100 } } });
