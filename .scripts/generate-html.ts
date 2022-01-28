import fs from 'fs';
import { rehype } from 'rehype';
import { readSync } from 'to-vfile';
import { UserOptions } from '../src/config.js';
import rehypeTwemojify from '../src/index.js';

function generate(file: string, options?: UserOptions) {
  // file: for example, `basic` --> basic.in.html and basic.out.html
  rehype()
    .use(rehypeTwemojify, options)
    .process(readSync(`./test/assets/${file}.in.html`))
    .then((processed) => {
      fs.writeFileSync(`./test/assets/${file}.out.html`, String(processed));
    });
}

generate('basic');
generate('massive');
generate('exclude', { exclude: ['©', '®', '™', '℗'] });
generate('svg', { twemoji: { size: 'svg' } });
generate('next', { framework: { type: 'next' } });
generate('next-custom', { framework: { type: 'next', params: { w: 3840, q: 100 } } });
