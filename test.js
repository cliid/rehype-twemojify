/**
 * @typedef {import('hast').Root} Root
 * @typedef {import('twemoji').ParseObject & { params: { [key: string]: any } }} Options
 */
/**
 * @type {Options} options
 */
const options = {
  params: {
    w: 3840,
    q: 10
  }
};

let params = '';
if (options.params) params += '?';
for (const key in options.params) {
  params += `${key}=${options.params[key]}&`;
}
params = params.substr(0, params.length - 1);
console.log(params);
