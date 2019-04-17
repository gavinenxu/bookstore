export function formatMoney(amount) {
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }
  if (amount % 100 === 0) options.minimumFractionDigits = 0
  const formatter = new Intl.NumberFormat('en-US', options)
  return formatter.format(amount)
}

export function filterHtmlTag(str) {
  if (typeof str === 'string') {
    const regex = /<[^>]+>/gi
    return str.replace(regex, '')
  }
  return null
}

export function rmSpecialChar(str) {
  if (typeof str === 'string') {
    const regex = /&\w+;/gi
    return str.replace(regex, '')
  }
  return null
}

export function parseQueryString(qs) {
  const query = {}
  const pairs = (qs[0] === '?' ? qs.substr(1) : qs).split('&')
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=')
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '')
  }
  return query
}

export function formatImageUrl(url) {
  const regex = /http/
  if (regex.test(url)) return url
  return `http://${url}`
}
