// const input = $0.textContent.trim()
const input = `/->-\\        
|   |  /----\\
| /-+--+-\\  |
| | |  | v  |
\\-+-/  \\-+--/
  \\------/`

const directions = ['>', 'v', '<', '^']

const carts = []

function extractCarts (carts, y) {
  return (char, x) => {
    if (directions.includes(char)) {
      carts.push([char, x, y, 0])
      return char === '>' || char === '<' ? '-' : '|'
    } else {
      return char
    }
  }
}

const map = input.split('\n').map((line, y) => line.split('').map(extractCarts(carts, y)))

function turn (dir, right) {
  return directions[(directions.length + directions.indexOf(dir) + (right ? 1 : -1)) % directions.length]
}

function processIntersection (cart) {
  switch (cart[3] % 3) {
    case 0: cart[0] = turn(cart[0], false); break
    case 2: cart[0] = turn(cart[0], true); break
    case 1: /* goes straight */ break
  }
  cart[3]++
}

function firstCollision (map, carts) {
  carts = carts.slice()

  while (true) {
    carts.sort(([xa, ya], [xb, yb]) => ya - yb || xa - xb)
    for (let cart of carts) {
      switch (cart[0]) {
        case '>': cart[1]++ ; break
        case '<': cart[1]-- ; break
        case '^': cart[2]-- ; break
        case 'v': cart[2]++ ; break
      }

      debugger
      switch (map[cart[2]][cart[1]]) {
        case '+': processIntersection(cart); break
        case '/': cart[0] = turn(cart[0], cart[0] === '^'); break
        case '\\': cart[0] = turn(cart[0], cart[0] === '>'); break
        case '>':
        case '<':
        case '^':
        case 'v': return [x, y]
      }
    }
  }
}

console.log('star 1:', firstCollision(map, carts))
