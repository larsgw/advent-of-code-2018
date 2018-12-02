// Read contents from DevTools
const ids = $0.textContent.split('\n').slice(0, -1)

// Star 1
let {two, three} = ids.reduce((accumulator, id) => {
  const counts = Object.values(id.split('').reduce((accumulator, char) => {
    if (!accumulator[char]) {
      accumulator[char] = 0
    }
    accumulator[char] += 1
    return accumulator
  }, {}))

  if (counts.find((char) => char === 2)) {
    accumulator.two += 1
  }
  if (counts.find((char) => char === 3)) {
    accumulator.three += 1
  }

  return accumulator
}, {two: 0, three: 0})
console.log('star 1:', two * three)

// Star 2
function getDistance (a, b) {
  if (a.length !== b.length) {
    return Infinity
  }

  return a.length - a.split('').reduce((count, _, i) => a[i] === b[i] ? ++count : count, 0)
}

function getCommon (a, b) {
  return a.split('').filter((p, i) => a[i] === b[i]).join('')
}

let smallest = [Infinity]
ids.forEach((a, i) => ids.forEach((b, j) => {
  const distance = getDistance(a, b)
  if (i !== j && distance < smallest[0]) {
    smallest = [distance, [i, j]]
  }
}))
console.log('star 2:', getCommon(ids[smallest[1][0]], ids[smallest[1][1]]))
