/* npm */
import HmacSHA1 from 'crypto-js/hmac-sha1';
import Base64 from 'crypto-js/enc-base64';

/**
 * random strings (initial length -> 32) 
 */
export const randomStrings = (n = 32) => {
  const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  return Array.apply(null, Array(n)).map(() => str.charAt(Math.floor(Math.random() * str.length))).join('');
};

/**
 * create header.Authorization string
 */
export const createHeaderString = (_params) => {
  return 'OAuth ' + Object.keys(_params).sort()
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(_params[key])}`)
    .join(', ');
};

/**
 * create string object.join(&)
 */
export const encodeParamsToString = (_params) => {
  return Object.keys(_params).sort()
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(_params[key])}`)
    .join('&');
};

/**
 * if content-type === text/html, parse response.text()
 */
export const parseFormEncoding = (_formEncoded) => {
  return _formEncoded.split('&').reduce((obj, form) => {
    const [key, value] = form.split('=');
    return Object.assign(obj, { [key]: value });
  }, {});
};

/**
 * create params
 */
export const createTokenRequestHeaderParams = (_consumerKey = '', { callback = '', token = '', params = {} }) => {
  return Object.assign(
    {},
    callback ? { oauth_callback: callback } : {},
    {
      oauth_consumer_key: _consumerKey,
      oauth_nonce: randomStrings(),
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: new Date().getTime() / 1000
    },
    token ? { oauth_token: token } : {},
    { oauth_version: '1.0' },
    params
  );
};

/**
 * create OAuth1.0 signature from params
 */
export const createSignature = (_params, _method, _url, _consumerSecret, _tokenSecret = null) => {
  const encodedParameters = encodeParamsToString(_params).replace(/\!/g, '%21').replace(/\'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A');
  const encodedRequestURL = encodeURIComponent(_url);

  const signature = Base64.stringify(HmacSHA1(
    _method + '&' + encodedRequestURL + '&' + encodeURIComponent(encodedParameters),
    _tokenSecret ? encodeURIComponent(_consumerSecret) + '&' + encodeURIComponent(_tokenSecret) : encodeURIComponent(_consumerSecret) + '&'
  ));

  _params.oauth_signature = signature;

  return _params;
};