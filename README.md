# rehype-twemojify

a basic rehype plugin that converts your text emojis into twemojis. fully customizable and ensures your emojis show up exactly as you want across all platforms. plus, it offers first-class typescript support.

## why rehype-twemojify?

ever added emojis to your code only to have them disappear on someone else’s screen? frustrating, right? that’s where twemojis come in—consistent, open-source emojis that work everywhere. i wanted to integrate that smoothness into rehype, and after some trial and error, **rehype-twemojify** was born. it's a straightforward rehype plugin with first-class twemoji support.

## install

using yarn:
```bash
yarn add --dev rehype-twemojify
```

using npm:
```bash
npm i --save-dev rehype-twemojify
```

## usage

rehype-twemojify is easy to set up and works seamlessly with typescript:

```ts
import rehype from 'rehype';
import rehypeTwemojify from 'rehype-twemojify';

rehype().use(rehypeTwemojify);
```

## customization

you can tweak things like emoji size or exclude specific characters. here's an example of how i set it up for next.js:

```ts
import rehypeTwemojify from 'rehype-twemojify';

const contentlayerConfig = makeSource({
  mdx: {
    rehypePlugins: [
      [
        rehypeTwemojify,
        {
          params: { w: 32, q: 100 },
          twemoji: { size: 'svg', baseUrl: '/static/images/twemoji' },
          exclude: ['©', '®', '™', '℗', '↩'],
          framework: 'next',
        }
      ]
    ]
  }
});

export default contentlayerConfig;
```

with this setup, you can adjust parameters to get everything just right, down to the smallest detail. whether it's the size of the emoji or specific exclusions, rehype-twemojify has you covered.

## why twemojis?

because they’re reliable, cross-platform, and make your content more expressive. and with first-class typescript support, you can be sure everything runs smoothly.

## contributing

found a bug or have ideas for improvements? feel free to open an issue or send a pull request.

## license

[MIT](LICENSE)

---

sometimes, it’s the little details that make everything click.
