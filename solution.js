const notFirst = new Set()
const all = new Set()

const rules = $0.textContent
  .trim()
  .split('\n')
  .reduce((rules, rule) => {
    let [a, b] = rule
      .match(//)
      .slice(-1)
    if (!rules[a]) {
      rules[a] = []
    }
    rules[a].push(b)
    notFirst.add(b)
    all.add(a)
    all.add(b)
    return rules
  }, {})

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
  let rule = next.sort().shift()
  order.push(rule)
  next.push(...rules[rule])
}

console.log('star 1:', order.join(''))
