/**
 * decode html entity
 */
export const decodeHTMLEntities = (_text) => {
  const entities = {
    'amp': '&',
    'apos': '\'',
    '#x27': '\'',
    '#x2F': '/',
    '#39': '\'',
    '#47': '/',
    'lt': '<',
    'gt': '>',
    'nbsp': ' ',
    'quot': '"'
  }

  return _text.replace(/&([^;]+);/gm, (match, entity) => entities[entity] || match)
};