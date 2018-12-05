function removePairs (polymer) {
  for (let i = 0; i < polymer.length - 1; i++) {
    let isSameLetter = polymer[i].toLowerCase() === polymer[i + 1].toLowerCase()
    let isSameCase = polymer[i] === polymer[i + 1]
    if (isSameLetter && !isSameCase) {
      polymer.splice(i, 2)
      i--
    }
  }
  return polymer
}

function reactPolymer (polymer) {
  let processed = polymer.slice()
  let prevLength
  do {
    prevLength = processed.length
    removePairs(processed)
  } while (processed.length !== prevLength)
  return processed
}

const polymer = $0.textContent.trim()

let processed = reactPolymer(polymer.split(''))
console.log('star 1:', processed.length)

function min (value) {
  let cache = new Map()
  function value_ (item) {
    if (!cache.has(item)) {
      cache.set(item, value(item))
    }

    return cache.get(item)
  }

  return function (min, item) {
    return value_(item) < value_(min)
      ? item
      : max
  }
}

let blockingMonomer = 'abcdefghijklmnopqrstuvwxyz'
  .split('')
  .map(letter => reactPolymer(polymer.replace(new RegExp(letter, 'gi'), '').split('')))
  .reduce(min(polymer => polymer.length))
console.log('star 2:', blockingMonomer)
