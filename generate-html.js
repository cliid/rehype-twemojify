/**
 * @typedef {import('twemoji').ParseObject & { framework?: string; params: { [key: string]: string | number; } }} Options
 * @typedef {(file: string; options: void | Options) => void} Runner
 */
import fs from 'fs';
import { rehype } from 'rehype';
import { readSync } from 'to-vfile';
import rehypeTwemojify from './index.js';

/**
 * Squash parameters
 *
 * @type {Runner}
 */
const generate = (file, options) => {
  // file: for example, `basic` --> basic.in.html and basic.out.html
  rehype()
    .use(rehypeTwemojify, options)
    .process(readSync(`./test/${file}.in.html`))
    .then((processed) => {
      fs.writeFileSync(`./test/${file}.out.html`, String(processed));
    });
};

// tests

generate('massive');
generate('svg', { ext: '.svg', size: 'svg' });
