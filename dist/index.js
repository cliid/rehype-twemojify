import $g8a0D$twemojiapi from "@twemoji/api";
import $g8a0D$emojiregex from "emoji-regex";
import $g8a0D$stringreplacetoarray from "string-replace-to-array";
import {map as $g8a0D$map} from "unist-util-map";





const $92ac010852f044e6$var$defaultFrameworkNextOptions = {
    type: "next",
    params: {
        w: 64,
        q: 30
    }
};
const $92ac010852f044e6$var$defaultTwemojiOptions = {
    baseUrl: "https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets",
    size: "72x72"
};
const $92ac010852f044e6$var$defaultOptions = {
    exclude: [],
    className: "emoji",
    framework: {
        type: "none"
    },
    twemoji: $92ac010852f044e6$var$defaultTwemojiOptions
};
function $92ac010852f044e6$var$resolveFrameworkOptions(userOptions) {
    switch(userOptions.type){
        case "next":
            return {
                ...$92ac010852f044e6$var$defaultFrameworkNextOptions,
                params: {
                    ...$92ac010852f044e6$var$defaultFrameworkNextOptions.params,
                    ...userOptions.params
                }
            };
        case "none":
            return {
                type: "none"
            };
        default:
            throw new Error("Unknown framework");
    }
}
function $92ac010852f044e6$export$eeec7bfd69b39c(userOptions) {
    return userOptions ? {
        exclude: userOptions.exclude ?? $92ac010852f044e6$var$defaultOptions.exclude,
        className: userOptions.className ?? $92ac010852f044e6$var$defaultOptions.className,
        framework: userOptions.framework ? $92ac010852f044e6$var$resolveFrameworkOptions(userOptions.framework) : $92ac010852f044e6$var$defaultOptions.framework,
        twemoji: {
            ...$92ac010852f044e6$var$defaultOptions.twemoji,
            ...userOptions.twemoji
        }
    } : $92ac010852f044e6$var$defaultOptions;
}


const $c0b60add41284d2e$var$regex = (0, $g8a0D$emojiregex)();
function $c0b60add41284d2e$var$sizeToExtension(size) {
    switch(size){
        case "72x72":
            return ".png";
        case "svg":
            return ".svg";
        default:
            throw new Error("Unknown size");
    }
}
/**
 * @summary Turn parameters object in a URL search params string.
 */ function $c0b60add41284d2e$var$formatParams(params) {
    const urlParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value])=>urlParams.append(key, value.toString()));
    return urlParams.toString();
}
const $c0b60add41284d2e$var$UFE0Fg = /\uFE0F/g;
const $c0b60add41284d2e$var$U200D = String.fromCharCode(0x200d);
/**
 * Convert a raw emoji into the relevant Twemoji code point.
 * @param emoji A string containing a single emoji.
 * @returns The code point at which the corresponding emoji can be found in Twemoji.
 * @example The input `'👨‍🌾'` would be converted to `'1f468-200d-1f33e'`
 */ function $c0b60add41284d2e$var$toCodePoint(emoji) {
    return (0, $g8a0D$twemojiapi).convert.toCodePoint(emoji.indexOf($c0b60add41284d2e$var$U200D) < 0 ? emoji.replace($c0b60add41284d2e$var$UFE0Fg, "") : emoji);
}
function $c0b60add41284d2e$var$toBaseUrl(codePoint, options) {
    return `${options.baseUrl}/${options.size}/${codePoint}${$c0b60add41284d2e$var$sizeToExtension(options.size)}`;
}
function $c0b60add41284d2e$var$toNextUrl(emoji, nextOptions, options) {
    const codePoint = $c0b60add41284d2e$var$toCodePoint(emoji);
    return `/_next/image?url=${$c0b60add41284d2e$var$toBaseUrl(codePoint, options)}&${$c0b60add41284d2e$var$formatParams(nextOptions.params)}`;
}
/**
 * Convert options to `src` url.
 */ function $c0b60add41284d2e$var$toUrl(emoji, options) {
    switch(options.framework.type){
        case "next":
            return $c0b60add41284d2e$var$toNextUrl(emoji, options.framework, options.twemoji);
        default:
            // your framework isn't supported yet...
            return $c0b60add41284d2e$var$toBaseUrl($c0b60add41284d2e$var$toCodePoint(emoji), options.twemoji);
    }
}
function $c0b60add41284d2e$var$makeTransformer(options) {
    return (tree)=>{
        const mappedChildren = tree.children.map((child)=>(0, $g8a0D$map)(child, (node)=>{
                if (node.type !== "text" || !$c0b60add41284d2e$var$regex.test(node.value)) return node;
                const children = (0, $g8a0D$stringreplacetoarray)(node.value, $c0b60add41284d2e$var$regex, (text)=>({
                        emoji: text
                    })).map((segment)=>{
                    if (typeof segment === "string") return {
                        type: "text",
                        value: segment
                    };
                    if (options.exclude.includes(segment.emoji)) return {
                        type: "text",
                        value: segment.emoji
                    };
                    return {
                        type: "element",
                        tagName: "img",
                        properties: {
                            className: [
                                options.className
                            ],
                            draggable: "false",
                            alt: segment.emoji,
                            decoding: "async",
                            src: $c0b60add41284d2e$var$toUrl(segment.emoji, options)
                        },
                        children: []
                    };
                });
                const result = {
                    type: "element",
                    tagName: "span",
                    properties: {},
                    children: children
                };
                return result;
            }));
        return {
            ...tree,
            children: mappedChildren
        };
    };
}
/**
 * Plugin to twemoji-fy ordinary emojis in HTML.
 */ const $c0b60add41284d2e$var$rehypeTwemojify = (userOptions)=>{
    const options = (0, $92ac010852f044e6$export$eeec7bfd69b39c)(userOptions);
    return $c0b60add41284d2e$var$makeTransformer(options);
};
var $c0b60add41284d2e$export$2e2bcd8739ae039 = $c0b60add41284d2e$var$rehypeTwemojify;


export {$c0b60add41284d2e$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=index.js.map
