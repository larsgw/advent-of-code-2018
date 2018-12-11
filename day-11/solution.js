const serial = 8199
const gridSize = 300

function getPowerLevel (x, y, serial) {
  return (Math.floor(
    ((x + 11) * (y + 1) + serial) * (x + 11) / 100
  ) % 10) - 5
}

let grid = Array(gridSize).fill().map((_, x) => Array(gridSize).fill().map((_, y) => getPowerLevel(x, y, serial)))

function maxFixedSquare (grid, gridSize, size) {
  let max = [-Infinity]
  for (let x = 0; x <= gridSize - size; x++) {
    for (let y = 0; y <= gridSize - size; y++) {
      let power = 0
      for (let dx = 0; dx < size; dx++) {
        for (let dy = 0; dy < size; dy++) {
          power += grid[x + dx][y + dy]
        }
      }

      if (power > max[0]) {
        max = [power, [x + 1, y + 1]]
      }
    }
  }
  return max
}

console.log('star 1:', maxFixedSquare(grid, gridSize, 3)[1].join(','))

function maxSquare (grid, gridSize) {
  let max = [-Infinity]
  for (let size = 1; size <= gridSize; size++) {
    let power = maxFixedSquare(grid, gridSize, size)
    if (power[0] > max[0]) {
      power[1].push(size)
      max = power
    }
  }
  return max
}

console.log('star 1:', maxSquare(grid, gridSize)[1].join(','))
