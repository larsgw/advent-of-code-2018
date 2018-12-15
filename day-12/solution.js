let input = $0.textContent

/*let input = `initial state: #..#.#..##......###...###

...## => #
..#.. => #
.#... => #
.#.#. => #
.#.## => #
.##.. => #
.#### => #
#.#.# => #
#.### => #
##.#. => #
##.## => #
###.. => #
###.# => #
####. => #
`*/

/*let input = `initial state: #.##

.##.. => #
.#.## => #
..#.# => #
...## => #
..##. => #
.##.# => #
##.#. => #
..### => #
####. => #
###.. => #
`*/

const [initialState, rules] = input.match(/initial state: (.+)\s+((.+\n)+)/).slice(1)

let ruleSearch = rules.trim().split('\n').reduce((ruleSearch, rule) => {
  const [state, out] = rule.match(/[.#]+/g)
  if (out === '#') {
    let cursor = ruleSearch
    for (let statePart of state) {
      if (typeof cursor[statePart] !== 'object') cursor[statePart] = {}
      cursor = cursor[statePart]
    }
  }
  return ruleSearch
}, {})

function generation (state, centerIndex, rules, affix) {
  state.unshift(...affix)
  state.push(...affix)
  const oldState = state.slice()
  centerIndex -= affix.length

  for (let cursor = 2; cursor < oldState.length - 2; cursor++) {
    let [a, b, c, d, e] = oldState.slice(cursor - 2, cursor + 3)
    let live = ruleSearch[a] &&
      ruleSearch[a][b] &&
      ruleSearch[a][b][c] &&
      ruleSearch[a][b][c][d] &&
      ruleSearch[a][b][c][d][e]
    if (live) {
      state[cursor] = '#'
    } else {
      state[cursor] = '.'
    }
  }

  while (state[0] === '.') {
    centerIndex++
    state.shift()
  }
  while (state[state.length - 1] === '.') {
    state.pop()
  }

  return centerIndex
}

function simulate (initialState, rules, generations) {
  const affix = Array(4).fill('.')
  let state = initialState.split('')
  let centerIndex = 0

  for (let gen = 0; gen < generations; gen++) {
    centerIndex = generation(state, centerIndex, rules, affix)
  }

  return state.reduce((sum, value, index) => {
    return value === '#' ? sum + index + centerIndex : sum
  }, 0)
}

console.time('star 1')
console.log('star 1:', simulate(initialState, ruleSearch, 20))
console.timeEnd('star 1')

function cachedSimulate (initialState, rules, generations) {
  const affix = Array(4).fill('.')
  const cache = {}
  let state = initialState.split('')
  let centerIndex = 0

  for (let gen = 0; gen < generations; gen++) {
    centerIndex = generation(state, centerIndex, rules, affix)

    let cacheKey = state.join('')
    if (cacheKey in cache) {
      const [cachedGen, cachedCenter] = cache[cacheKey]
      const gensLeft = generations - gen - 1
      const cycle = gen - cachedGen
      const cycleOffset = gensLeft % cycle
      const cyclesLeft = Math.floor(gensLeft / cycle)

      const [key, [lastGen, lastCenter]] = Object.entries(cache).find(([key, [gen]]) => gen === cachedGen + cycleOffset)
      const centerChange = centerIndex - cachedCenter
      const centerOffset = lastCenter - cachedCenter

      state = key.split('')
      centerIndex += centerChange * cyclesLeft + centerOffset
      break
    } else {
      cache[cacheKey] = [gen, centerIndex]
    }
  }

  return state.reduce((sum, value, index) => {
    return value === '#' ? sum + index + centerIndex : sum
  }, 0)
}

console.time('star 2')
console.log('star 2:', cachedSimulate(initialState, ruleSearch, 50e9))
console.timeEnd('star 2')
