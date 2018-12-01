// Executed in Chrome DevTools while selecting the <pre> element with frequencies
let frequencies = $0.textContent

let star1 = frequencies
  .split('\n')
  .slice(0,-1)               // last element is empty line
  .map(n => parseInt(n))     // https://stackoverflow.com/q/262427
  .reduce((f,n) => f + n, 0)

let star2
let seen = {}
let i = 0
let frequency = 0
while (true) {
  frequency += frequencies[i++]

  // wrap frequencies
  if (i >= frequencies.length) {
    i = 0
  }

  if (seen[frequency]) {
    star2 = frequency
    break
  } else {
    seen[frequency] = true
  }
}
