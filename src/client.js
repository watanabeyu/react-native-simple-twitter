/* lib */
import Request from './request';
import * as Util from './util';

/* const */
const baseURL = 'https://api.twitter.com';
const apiURL = 'https://api.twitter.com/1.1';
const requestTokenURL = '/oauth/request_token';
const authorizationURL = '/oauth/authorize';
const accessTokenURL = '/oauth/access_token';

class Client {
  ConsumerKey = null
  ConsumerSecret = null
  Token = null
  TokenSecret = null
  TokenRequestHeaderParams = {}

  constructor() { }

  /**
   * set consumer
   */
  setConsumerKey = (_consumerKey = null, _consumerSecret = null) => {
    this.ConsumerKey = _consumerKey
    this.ConsumerSecret = _consumerSecret
  }

  /**
   * set access token
   */
  setAccessToken = (_token, _tokenSecret) => {
    this.Token = _token
    this.TokenSecret = _tokenSecret
  }

  /**
   * get login redirect url
   */
  getLoginUrl = async (_callback = "") => {
    this.TokenRequestHeaderParams = Util.createTokenRequestHeaderParams(this.ConsumerKey, { callback: _callback })
    this.TokenRequestHeaderParams = Util.createSignature(this.TokenRequestHeaderParams, 'POST', baseURL + requestTokenURL, this.ConsumerSecret)

    const { oauth_token, oauth_token_secret } = await Request("POST", baseURL + requestTokenURL, this.TokenRequestHeaderParams)
    this.setAccessToken(oauth_token, oauth_token_secret)

    return baseURL + authorizationURL + '?oauth_token=' + this.Token
  }

  /**
   * get access token
   */
  getAccessToken = async (_verifier = "") => {
    this.TokenRequestHeaderParams = Util.createTokenRequestHeaderParams(this.ConsumerKey, { token: this.Token })
    this.TokenRequestHeaderParams = Util.createSignature(this.TokenRequestHeaderParams, 'POST', baseURL + accessTokenURL, this.ConsumerSecret, this.TokenSecret)
    this.TokenRequestHeaderParams.oauth_verifier = _verifier

    const { oauth_token, oauth_token_secret } = await Request("POST", baseURL + accessTokenURL, this.TokenRequestHeaderParams)
    this.setAccessToken(oauth_token, oauth_token_secret)

    return { oauth_token, oauth_token_secret }
  }

  /**
   * call Twitter Api
   */
  api = async (_method = "GET", _endpoint, _params = {}) => {
    const method = _method.toUpperCase()
    let endpoint = _endpoint.slice(0, 1) !== "/" ? `/${_endpoint}` : _endpoint

    this.TokenRequestHeaderParams = Util.createTokenRequestHeaderParams(this.ConsumerKey, { token: this.Token, params: _params })
    this.TokenRequestHeaderParams = Util.createSignature(this.TokenRequestHeaderParams, method, apiURL + endpoint, this.ConsumerSecret, this.TokenSecret)

    return await Request(
      method,
      apiURL + (_params ? endpoint + "?" + Util.encodeParamsToString(_params) : endpoint),
      this.TokenRequestHeaderParams
    )
  }

  /**
   * api("POST",_endpoint,_params) alias
   */
  post = async (_endpoint, _params = {}) => await this.api('POST', _endpoint, _params)

  /**
   * api("GET",_endpoint,_params) alias
   */
  get = async (_endpoint, _params = {}) => await this.api('GET', _endpoint, _params)
}

export default new Client()