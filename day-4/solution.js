function parseLog (log) {
  let [date, msg] = log.match(/\[(.*?)\] (.*)/).slice(1)
  return [new Date(date), msg]
}

const log = $0
  .textContent
  .split('\n')
  .slice(0, -1)
  .map(parseLog)
  .sort(([a], [b]) => a - b)

function groupByShift (grouped, element, i) {
  if (element[1].match(/Guard #(\d+) begins shift/)) {
    grouped.push([element])
  } else {
    grouped[grouped.length - 1].push(element)
  }
  return grouped
}

function combineShift ([[shift, guard], ...sleeps]) {
  const [id] = guard.match(/Guard #(\d+) begins shift/).slice(1)
  const toggles = sleeps.map(([time]) => time.getMinutes())

  return [id, toggles]
}

function groupSleepByGuard (guards, [id, toggles]) {
  if (!guards[id]) {
    guards[id] = Array(60).fill(0)
  }

  let awake = true
  for (let min = 0; min < 60; min++) {
    if (min === toggles[0]) {
      awake = !awake
      toggles.shift()
    }
    if (!awake) {
      guards[id][min]++
    }
  }
  
  return guards
}

let sleep = log
  .reduce(groupByShift, [])
  .map(combineShift)
  .reduce(groupSleepByGuard, {})

let sleepiestGuard = Object.entries(sleep).reduce(([maxSleep, sleepiest], [guard, sleep]) => {
  let totalSleep = sleep.reduce((total, min) => total + min)
  return totalSleep > maxSleep
    ? [totalSleep, guard]
    : [maxSleep, sleepiest]
}, [-Infinity])[1]

let sleepiestMinute = Object.entries(sleep[sleepiestGuard]).reduce(([maxSleep, sleepiest], [minute, sleep]) => {
  return sleep > maxSleep
    ? [sleep, minute]
    : [maxSleep, sleepiest]
}, [-Infinity])[1]

console.log('star 1:', sleepiestGuard * sleepiestMinute)

let [regularSleeper, regularMinute] = Object.entries(sleep).reduce(([maxFreq, ...rest], [guard, sleep]) => {
  let freq = Math.max(...sleep)
  return freq > maxFreq
    ? [freq, guard, sleep.indexOf(freq)]
    : [maxFreq,  ...rest]
}, [-Infinity]).slice(1)

console.log('star 2:', regularSleeper * regularMinute)
