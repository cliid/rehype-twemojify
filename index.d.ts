/**
 * Plugin to twemoji-fy HTML.
 *
 * @type {import('unified').Plugin<[Options?]|void[], Root>}
 */
export default function rehypeTwemojify(
  options?: void | Options | undefined
): void | import('unified').Transformer<import('hast').Root, import('hast').Root>;
export type Root = import('hast').Root;
export type Options = import('twemoji').ParseObject;
