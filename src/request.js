/* lib */
import * as Util from './util';

export default Request = async (_method = "GET", _url = "", _params = {}) => {
  const options = {
    method: _method,
    headers: {
      Authorization: Util.createHeaderString(_params)
    }
  }

  return await fetch(_url, options)
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