const input = $0.textContent.replace(/\n$/, '')
/*const input = `/->-\\        
|   |  /----\\
| /-+--+-\\  |
| | |  | v  |
\\-+-/  \\-+--/
  \\------/`*/
/*const input = `/>-<\\  
|   |  
| /<+-\\
| | | v
\\>+</ |
  |   ^
  \\<->/`*/
const element = $0

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

function serializeMap (map, carts) {
  map = map.map(row => row.slice())

  carts.forEach(([cart, x, y]) => map[y][x] = '<span style="color:white;background:black">' + cart + '</span>')

  return map.map(row => row.join('')).join('\n')
}

function firstCollision (map, carts) {
  while (true) {
    carts.sort(([xa, ya], [xb, yb]) => ya - yb || xa - xb)
    for (let cart of carts) {
      switch (cart[0]) {
        case '>': cart[1]++ ; break
        case '<': cart[1]-- ; break
        case '^': cart[2]-- ; break
        case 'v': cart[2]++ ; break
      }

      switch (map[cart[2]][cart[1]]) {
        case '+': processIntersection(cart); break
        case '/': cart[0] = turn(cart[0], cart[0] === '^' || cart[0] === 'v'); break
        case '\\': cart[0] = turn(cart[0], cart[0] === '>' || cart[0] === '<'); break
      }

      if (carts.filter(([_, x, y]) => cart[1] === x && cart[2] === y).length > 1) {
        return cart.slice(1, 3)
      }
    }
  }
}

console.log('star 1:', firstCollision(map, carts.map(cart => cart.slice())).join())

function lastCart (map, carts) {
  while (carts.length > 1) {
    carts.sort(([xa, ya], [xb, yb]) => ya - yb || xa - xb)
    for (let cart of carts) {
      switch (cart[0]) {
        case '>': cart[1]++ ; break
        case '<': cart[1]-- ; break
        case '^': cart[2]-- ; break
        case 'v': cart[2]++ ; break
      }

      switch (map[cart[2]][cart[1]]) {
        case '+': processIntersection(cart); break
        case '/': cart[0] = turn(cart[0], cart[0] === '^' || cart[0] === 'v'); break
        case '\\': cart[0] = turn(cart[0], cart[0] === '>' || cart[0] === '<'); break
      }
    }

    carts = carts.filter(a => carts.every(b => a === b || a[1] !== b[1] || a[2] !== b[2]))
  }

  return carts[0].slice(1, 3)
}

console.log('star 2:', lastCart(map, carts.map(cart => cart.slice())).join())
