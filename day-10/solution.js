const origPoints = $0.textContent.trim().split('\n').map(point => point.match(/-?\d+/g).map(num => parseInt(num)))

function updatePoints (points) {
  let x = [Infinity, -Infinity]
  let y = [Infinity, -Infinity]

  points.forEach(point => {
    point[0] += point[2]
    point[1] += point[3]
    x[0] = Math.min(x[0], point[0])
    x[1] = Math.max(x[1], point[0])
    y[0] = Math.min(y[0], point[1])
    y[1] = Math.max(y[1], point[1])
  })
  
  return [x, y]
}

let points = origPoints.map(point => point.slice())
let time = 0

let x
let y
do {
  [x, y] = updatePoints(points)
  time++
} while ((x[1] - x[0]) > 100)

let viewPort = [x[0], y[0], x[1] - x[0], y[1] -  y[0]]
let view = Array(viewPort[3]).fill().map(() => Array(viewPort[2]).fill('.'))

let viewElement = document.createElement('pre')
document.body.prepend(viewElement)
setInterval(() => {
  view.forEach(line => line.fill('.'))
  updatePoints(points)
  points.forEach(([x, y]) => {
    view[y - viewPort[1]][x - viewPort[0]] = '#'
  })
  viewElement.textContent = view.map(line => line.join('')).join('\n')
  time++
}, 1000)

console.log('star 1:', 'NEEDS MANUAL REVIEW')
console.log('star 2:', 'NEEDS MANUAL REVIEW')
