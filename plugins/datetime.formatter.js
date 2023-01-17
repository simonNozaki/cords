const moment = require('moment-timezone')

const toDatetimeString = (date) => {
  return moment().tz(date.toString(), 'asia/tokyo').format()
}

export default ({ app }, inject) => {
  inject('toDatetimeString', toDatetimeString)
}
