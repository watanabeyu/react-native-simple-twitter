import * as util from '../src/util';
import * as lib from '../src/lib';

describe('util test', () => {
  it('util.randomStrings()', () => {
    const result = util.randomStrings();

    expect(result).toMatch(/^[a-zA-Z0-9]+$/);
  });

  it('util.createHeaderString()', () => {
    const result = util.createHeaderString({
      a: 'a', b: 'hoge', 0: '2', aa: 111,
    });

    expect(result).toBe('OAuth 0=2, a=a, aa=111, b=hoge');
  });

  it('util.encodeParamsToString()', () => {
    const result = util.encodeParamsToString({
      a: 'a', b: 'hoge', 0: '2', aa: 111,
    });

    expect(result).toBe('0=2&a=a&aa=111&b=hoge');
  });

  it('util.parseFormEncoding()', () => {
    const result = util.parseFormEncoding('0=2&a=a&aa=111&b=hoge');

    expect(result).toHaveProperty('0', '2');
    expect(result).toHaveProperty('a', 'a');
    expect(result).toHaveProperty('aa', '111');
    expect(result).toHaveProperty('b', 'hoge');
  });

  it('util.createTokenRequestHeaderParams()', () => {
    const result = util.createTokenRequestHeaderParams('consumerKey', { callback: 'https://github.com', token: 'token', params: { a: 1 } });

    expect(result).toHaveProperty('oauth_callback', 'https://github.com');
    expect(result).toHaveProperty('oauth_consumer_key', 'consumerKey');
    expect(result).toHaveProperty('oauth_nonce');
    expect(result).toHaveProperty('oauth_signature_method', 'HMAC-SHA1');
    expect(result).toHaveProperty('oauth_timestamp');
    expect(result).toHaveProperty('oauth_version', '1.0');
    expect(result).toHaveProperty('oauth_token', 'token');
    expect(result).toHaveProperty('a', 1);
  });

  it('util.createSignature()', () => {
    const result = util.createSignature({ a: 'b' }, 'POST', 'https://github.com', 'consumerSecret', 'tokenSecret');

    expect(result).toHaveProperty('oauth_signature', 'chnF4YlwsX2XpMpZGJKgtsXdAkc=');
    expect(result).toHaveProperty('a', 'b');
  });
});

describe('lib test', () => {
  it('lib.decodeHTMLEntities()', () => {
    const result = lib.decodeHTMLEntities('&amp; &apos; &#x27; &#x2F; &#39; &#47; &lt; &gt; &nbsp; &quot;');

    expect(result).toBe('& \' \' / \' / < >   "');
  });

  it('lib.getRelativeTime()', () => {
    const result1 = lib.getRelativeTime(new Date(new Date().getTime() - 32390));
    const result2 = lib.getRelativeTime('Thu Apr 06 15:28:43 +0000 2017');

    expect(result1).toBe('32s');
    expect(result2).toBe('2017/04/07');
  });
});
