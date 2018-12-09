const all = new Set()
const notFirst = new Set()

const [rules, reverseRules] = $0.textContent
  .trim()
  .split('\n')
  .reduce(([rules, reverseRules], rule) => {
    let [a, b] = rule
      .match(/Step (.) must be finished before step (.) can begin\./)
      .slice(1)
    
    if (!rules[a]) { rules[a] = [] }
    rules[a].push(b)
    
    if (!reverseRules[b]) { reverseRules[b] = [] }
    reverseRules[b].push(a)
    
    notFirst.add(b)
    all.add(a)
    all.add(b)
    
    return [rules, reverseRules]
  }, [{}, {}])

const firstSteps = Array.from(difference(all, notFirst))

function difference (a, b) {
  let difference = new Set(a)
  for (let item of b) {
    difference.delete(item)
  }
  return difference
}

function completeStep (step, following, next, done, reqs) {
  done.push(step)

  following = following
    .filter(step => !done.includes(step) && !next.includes(step))
    .filter(step => reqs[step].every(step => done.includes(step)))
  if (following.length) {
    next.push(...following)
    next.sort()
  }
}

let order = (function () {
  let done = []
  let next = firstSteps.slice()

  while (next.length) {
    let step = next.shift()
    completeStep(step, rules[step] || [], next, done, reverseRules)
  }

  return done.join('')
})()

console.log('star 1:', order)

let time = (function () {
  let time = -1
  let tasks = []
  let next = firstSteps.slice()
  let done = []

  while (done.length !== all.size) {
    time++

    // complete tasks
    while (tasks.length && tasks[0].time <= time) {
      let {step} = tasks.shift()
      completeStep(step, rules[step] || [], next, done, reverseRules)
    }

    // add tasks
    while (tasks.length < 5 && next.length) {
      let step = next.shift()
      tasks.push({step, time: time + 61 + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(step)})
    }

    tasks.sort(({time: a}, {time: b}) => a - b)
  }

  return time
})()

console.log('star 2:', time)
