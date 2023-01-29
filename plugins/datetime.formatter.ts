// const moment = require('moment-timezone')
import moment from 'moment-timezone'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      toDatetimeString(date: Date): string {
        return moment.tz(date, 'Asia/Tokyo').format('yyyy-MM-DD HH:mm:ss')
      }
    }
  }
})
