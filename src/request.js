/* lib */
import * as Util from './util';

export default async (method = 'GET', url = '', params = {}) => {
  const uri = url
    .replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A');

  const options = {
    method,
    headers: {
      Authorization: Util.createHeaderString(params),
    },
  };

  const result = await fetch(uri, options)
    .then((response) => {
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.indexOf('application/json') !== -1) {
        return response.json();
      }
      return response.text().then(r => Util.parseFormEncoding(r));
    });

  return result;
};
