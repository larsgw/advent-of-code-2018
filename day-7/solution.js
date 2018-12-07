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

function difference (a, b) {
  let difference = new Set(a)
  for (let item of b) {
    difference.delete(item)
  }
  return difference
}

let order = []
let next = Array.from(difference(all, notFirst))

while (next.length) {
  let rule
  while (!rule) {
    rule = next.shift()
    if (reverseRules[rule] &&  !reverseRules[rule].every(step => order.includes(step))) {
      next.push(rule)
      rule = null
    }
  }

  if (order.includes(rule)) {
    continue
  }

  order.push(rule)
  next.push(...(rules[rule] || []))
  next.sort()
}

console.log('star 1:', order.join(''))


