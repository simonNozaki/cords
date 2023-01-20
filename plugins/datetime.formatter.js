const moment = require('moment-timezone')

const toDatetimeString = (date) => {
  return moment.tz(date, 'Asia/Tokyo').format()
}

export default ({ app }, inject) => {
  inject('toDatetimeString', toDatetimeString)
}
