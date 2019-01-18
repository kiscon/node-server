const moment = require('moment')

export const date = (date, fmt = 'YYYY-MM-DD') => {
  let str = ''
  if (date) {
    str = moment(date).format(fmt)
  }
  return str
}

export const time = (d, fmt = 'YYYY-MM-DD HH:mm:ss') => {
  return date(d, fmt)
}

export const minute = (d, fmt = 'YYYY-MM-DD HH:mm') => {
  return date(d, fmt)
}

export const second = (d, fmt = 'HH:mm:ss') => {
  return date(d, fmt)
}

export const month = (d, fmt = 'YYYY-MM') => {
  return date(d, fmt)
}

export const money = (num) => {
  if (typeof num !== 'number' && !num) {
    return ''
  }
  if (typeof num === 'string' && num.indexOf('**') > -1) {
    return num
  }
  return `￥${(+num).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
}

export const decimal = (num, precision = 2) => {
  if (typeof num !== 'number' && !num) {
    return ''
  }
  if (typeof num === 'string' && num.indexOf('**') > -1) {
    return num
  }
  return `${(+num).toFixed(precision).replace(/(\d)(?=(\d{3})+\.)/g, '$&,')}`
}

export const thousands = (num) => {
  if (typeof num !== 'number' && !num) {
    return ''
  }
  if (typeof num === 'string' && num.indexOf('**') > -1) {
    return num
  }
  return (+num).toLocaleString()
}
