let minX = Infinity
let maxX = -Infinity
let minY = Infinity
let maxY = -Infinity

const coords = $0.textContent.trim().split('\n').map(coord => {
  let [x, y] = coord.split(', ').map(num => parseInt(num))
  minX = Math.min(minX, x)
  maxX = Math.max(maxX, x)
  minY = Math.min(minY, y)
  maxY = Math.max(maxY, y)
  return [x, y]
})

let gridWidth = maxX - minX
let gridHeight = maxY - minY
let grid = Array(maxX - minX + 1).fill().map(() => Array(maxY - minY + 1).fill())
let count = Array(coords.length).fill(0)
let infinite = new Set()

coords.forEach(([x, y], i) => { grid[x - minX][y - minY] = i })

grid.forEach((row, x) => {
  row.forEach((cell, y) => {
    let coord = findNearest(x, y)
    if (x === 0 || y === 0 || x === gridWidth || y === gridHeight) {
      infinite.add(coord)
    }
    count[coord]++
  })
})

function findNearest (x, y) {
  if (grid[x][y] !== undefined) {
    return grid[x][y]
  }

  let r = 0
  let found = []

  while (!found.length) {
    r++
    for (let dx = -r; dx <= r; dx++) {
      let dy = r - Math.abs(dx)

      if (!grid[x + dx]) {
        continue
      }

      found.push(grid[x + dx][y + dy]) 
      if (dy !== 0) {
        found.push(grid[x + dx][y - dy])
      }
    }

    found = found.filter(cell => cell !== undefined)
  }
  
  return found.length > 1 ? -1 : found[0]
}

let largestArea = Math.max(...count.filter((_, coord) => !infinite.has(coord)))
console.log('star 1:', largestArea)

function manhattanDistance (a, b) {
  return Math.abs(b[0] - a[0]) + Math.abs(b[1] - a[1])
}

function findTotalDistance (x, y) {
  return coords.reduce((count, coord) => count + manhattanDistance([x, y], coord), 0)
}

let area = 0
let r = 0
let found = true
let midX = Math.floor(gridWidth / 2)
let midY = Math.floor(gridHeight / 2)
while (found) {
  let oldArea = area
  for (let dx = -r; dx <= r; dx++) {
    let dy = r - Math.abs(dx)
    if (findTotalDistance(midX + dx, midY + dy) < 10000) {
      area++
    }
    if (dy !=== 0 && findTotalDistance(midX + dx, midY - dy) < 10000) {
      area++
    }
  }
  r++
  found = oldArea !== area
}
console.log('star 2:', area)
