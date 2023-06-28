export function timeParse(time) {
  const date_now = new Date(Date.now())
  const date = new Date(time)
  const interval = new Date(date_now - date)
  const day = Math.round(interval / 1000 / 60 / 60 / 24)
  const hour = Math.round((interval / 1000 / 60 / 60) % 24)
  const minute = Math.round((interval / 1000 / 60) % 60)

  function ending(diff) {
    if (diff.length === 2 && +diff.slice(-2, 1) === 1) {
      return ''
    }
    if (+diff.slice(-1) === 1) {
      return 'у'
    }
    if (+diff.slice(-1) >= 2 && +diff.slice(-1) <= 4) {
      return 'ы'
    } else {
      return ''
    }
  }
  function endingD(diff) {
    if (diff.length === 2 && +diff.slice(-2, 1) === 1) {
      return 'день'
    }
    if (+diff.slice(-1) === 1) {
      return 'день'
    }
    if (+diff.slice(-1) >= 2 && +diff.slice(-1) <= 4) {
      return 'дня'
    } else {
      return 'дней'
    }
  }
  function endingH(diff) {
    if (+diff.slice(-1) === 1) {
      return ''
    }
    if (+diff.slice(-1) >= 2 && +diff.slice(-1) <= 4) {
      return 'а'
    } else {
      return 'ов'
    }
  }
  if (day) {
    return day + ` ${endingD(day.toString())} назад`
  } else if (hour) {
    return hour + ` час${endingH(hour.toString())} назад`
  } else if (minute) {
    return minute + ` минут${ending(minute.toString())} назад`
  } else {
    return ' недавно'
  }
}
export function timeSimple(time) {
  const newValue = time.split('-')
  return `${newValue[2].slice(0, 2)}.${newValue[1]}.${newValue[0]}`
}
