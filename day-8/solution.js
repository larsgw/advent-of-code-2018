const numbers = $0.textContent.split(' ').map(num => parseInt(num))

function parseTree (numbers) {
  let stack = numbers.slice()

  function consumeChild () {
    let [children, metadata] = stack.splice(0, 2)
    return [
      consumeChildren(children),
      stack.splice(0, metadata)
    ]
  }

  function consumeChildren (num) {
    let children = []
    while (num--) {
      children.push(consumeChild())
    }
    return children
  }
  return consumeChild()
}

const licenseTree = parseTree(numbers)

const sum = (sum, num) => sum + num

function sumMetadata ([children, metadata]) {
  let childSum = children.map(sumMetadata).reduce(sum, 0)
  let ownSum = metadata.reduce(sum, 0)

  return childSum + ownSum
}

console.log('star 1:', sumMetadata(licenseTree))

function valueNode ([children, metadata]) {
  if (!children.length) {
    return metadata.reduce(sum)
  }

  return metadata
    .map(index => children[index - 1]
      ? valueNode(children[index - 1])
      : 0
    )
    .reduce(sum)
}

console.log('star 2:', valueNode(licenseTree))
