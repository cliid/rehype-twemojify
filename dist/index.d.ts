import { Root } from "hast";
import { Plugin } from "unified";
type FrameworkNextUserOptions = {
    type: 'next';
    params?: {
        [key: string]: unknown;
    };
};
type FrameworkOptions = FrameworkNextUserOptions | {
    type: 'none';
};
type TwemojiUserOptions = {
    baseUrl?: string;
    size?: '72x72' | 'svg';
};
type UserOptions = {
    exclude?: Array<string>;
    className?: string;
    framework?: FrameworkOptions;
    twemoji?: TwemojiUserOptions;
};
/**
 * Plugin to twemoji-fy ordinary emojis in HTML.
 */
declare const rehypeTwemojify: Plugin<[UserOptions?], Root, Root>;
export default rehypeTwemojify;

//# sourceMappingURL=index.d.ts.map
