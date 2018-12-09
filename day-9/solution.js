const [players, lastMarble] = $0.textContent.match(/\d+/g).map(num => parseInt(num))

function maxScore (players, lastMarble) {
  let turn = 0
  let marble = 0
  let current = 0
  let scores = Array(players).fill(0)
  let circle = [0]

  while (++marble <= lastMarble) {
    turn = (turn + 1) % players

    if (marble % 23 === 0) {
      scores[turn] += marble
      current = (current - 7) % circle.length
      scores[turn] += circle.splice(current, 1)[0]
    } else {
      current = (current + 2) % circle.length
      circle.splice(current, 0, marble)
    }
  }

  return Math.max(...scores)
}

console.log('star 1:', maxScore(players, lastMarble))
