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
