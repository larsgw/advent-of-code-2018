function parseLog (log) {
  let [date, msg] = log.match(/\[(.*?)\] (.*)/).slice(1)
  return [new Date(date), msg]
}

function groupByShift (grouped, element, i) {
  if (element[1].match(/Guard #(\d+) begins shift/)) {
    grouped.push([element])
  } else {
    grouped[grouped.length - 1].push(element)
  }
  return grouped
}

function combineLogs (logs) {
  const [[shift, guard], sleep, wake, ...extra] = logs
  const [id] = guard.match(/Guard #(\d+) begins shift/).slice(1)
  if (sleep) {
    const [totalSleep, totalWake] = extra.reduce(([sleep, wake], [time], i) => {
      return i % 2 === 0
        ? [sleep + time, wake]
        : [sleep, wake + time]
    }, [sleep, wake])
    return {id, shift, sleep: (totalWake - totalSleep) / 60000}
  } else {
    return {id, shift, sleep: 0}
  }
}

function totalSleep (guards, guard) {
  if (!guards[guard.id]) {
    guards[guard.id] = 0
  }

  guards[guard.id] += guard.sleep

  return guards
}

const log = $0
  .textContent
  .split('\n')
  .slice(0, -1)
  .map(parseLog)
  .sort(([a], [b]) => a - b)
  .reduce(groupByShift, [])
  .map(combineLogs)

const sleepiest = Object
  .entries(log.reduce(totalSleep, {}))
  .reduce(([maxSleep, sleepiest], [guard, sleep]) => {
    return sleep > maxSleep
      ? [sleep, guard]
      : [maxSleep, sleepiest]
  }, [-Infinity])
