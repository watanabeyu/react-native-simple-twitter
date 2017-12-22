/* lib */
import * as Util from './util';

export default Request = async (_method = "GET", _url = "", _params = {}) => {
  url = _url.replace(/\!/g, "%21").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A");

  const options = {
    method: _method,
    headers: {
      Authorization: Util.createHeaderString(_params)
    }
  }

  return await fetch(url, options)
    .then(response => {
      const contentType = response.headers.get("content-type")

      if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json()
      }
      else {
        return response.text().then(r => Util.parseFormEncoding(r))
      }
    })
}