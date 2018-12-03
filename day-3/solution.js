function parseClaim (claim) {
  return claim.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/).slice(1, 6).map(num => parseInt(num))
}

const claims = $0.textContent.split('\n').slice(0, -1).map(parseClaim)

let fabric = Array(1000).fill().map(() => [])
claims.forEach(([id, x, y, w, h]) => {
  for (let i = x + 1; i <= x + w; i++) {
    for (let j = y + 1; j <= y + h; j++) {
      if (fabric[i][j] === 'X') {
      } else if (fabric[i][j]) {
        fabric[i][j] = 'X'
      } else {
        fabric[i][j] = id
      }
    }
  }
})

let overlapCount = fabric.reduce((count, row) => count + row.filter(cell => cell === 'X').length, 0)
console.log('star 1:', overlapCount)

let cleanCount = claims.find(([id, x, y, w, h]) => {
  for (let i = x + 1; i <= x + w; i++) {
    for (let j = y + 1; j <= y + h; j++) {
      if (fabric[i][j] === 'X') {
        return false
      }
    }
  }

  return true
})
console.log('star 2:', cleanCount[0])

// ===============
// First iteration
// ===============
let overlapping = claims.reduce((count, [id, x, y, w, h]) => {
  let i = x
  for (let _ of Array(w)) {
    i++
    let j = y
    for (let _ of Array(h)) {
      j++
      let x = i, y = j
      if (grid[x][j] === 'X') {
      } else if (grid[x][j]) {
        count++
        grid[x][j] = 'X'
      } else {
        grid[x][j] = id
      }
    }
  }

  return count
}, 0)
console.log('star 1:', overlapping)

let [nonOverlapping] = claims.find(([id, x, y, w, h]) => {
  for (let _ of Array(w)) {
    x++
    let j = y
    for (let _ of Array(h)) {
      j++
      if (grid[x][j] !== id) {
        return false
      }
    }
  }

  return true
})
console.log('star 2:', nonOverlapping)
