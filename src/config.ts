import { DeepRequired } from 'ts-essentials';

export type FrameworkNextUserOptions = {
  type: 'next';
  params?: { [key: string]: unknown };
};

export type FrameworkOptions = FrameworkNextUserOptions | { type: 'none' };
export type TwemojiUserOptions = {
  baseUrl?: string;
  size?: '72x72' | 'svg';
};

export type UserOptions = {
  exclude?: Array<string>;
  className?: string;
  framework?: FrameworkOptions;
  twemoji?: TwemojiUserOptions;
};

export type Options = DeepRequired<UserOptions>;
export type TwemojiOptions = DeepRequired<TwemojiUserOptions>;
export type FrameworkNextOptions = DeepRequired<FrameworkNextUserOptions>;

const defaultFrameworkNextOptions: DeepRequired<FrameworkNextUserOptions> = {
  type: 'next',
  params: {
    w: 64,
    q: 30
  }
};

const defaultTwemojiOptions: DeepRequired<TwemojiUserOptions> = {
  baseUrl: 'https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets',
  size: '72x72'
};

const defaultOptions: Options = {
  exclude: [],
  className: 'emoji',
  framework: { type: 'none' },
  twemoji: defaultTwemojiOptions
};

function resolveFrameworkOptions(userOptions: FrameworkOptions): DeepRequired<FrameworkOptions> {
  switch (userOptions.type) {
    case 'next':
      return {
        ...defaultFrameworkNextOptions,
        params: {
          ...defaultFrameworkNextOptions.params,
          ...userOptions.params
        }
      };
    case 'none':
      return {
        type: 'none'
      };
    default:
      throw new Error('Unknown framework');
  }
}

export function resolveOptions(userOptions: UserOptions | void): Options {
  return userOptions
    ? {
        exclude: userOptions.exclude ?? defaultOptions.exclude,
        className: userOptions.className ?? defaultOptions.className,
        framework: userOptions.framework
          ? resolveFrameworkOptions(userOptions.framework)
          : defaultOptions.framework,
        twemoji: {
          ...defaultOptions.twemoji,
          ...userOptions.twemoji
        }
      }
    : defaultOptions;
}
