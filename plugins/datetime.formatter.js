const moment = require('moment-timezone')

const toDatetimeString = (date) => {
  return moment.tz(date, 'Asia/Tokyo').format('yyyy-MM-DD HH:mm:ss')
}

export default ({ app }, inject) => {
  inject('toDatetimeString', toDatetimeString)
}
