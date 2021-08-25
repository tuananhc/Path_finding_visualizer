import anime from 'animejs/lib/anime.es'
import * as utils from './utils'

export function aStarSearch(startingNode, endingNode, grid, isBlackWhite, speed) {
  var queue = [startingNode]
  var visited = []
  var prev = []
  var result = [startingNode]
  var found = false
  var newGrid = [...grid]
  for (var i = 0; i < grid.length; i++) {
    var visit = []
    var pre = []
    for (var j = 0; j < grid[0].length; j++) {
      visit.push(false)
      pre.push(-1)
    }
    visited.push(visit)
    prev.push(pre)
  }
  var time = 0
  while (queue.length > 0 && !found) {
    var min = Number.MAX_SAFE_INTEGER
    var index
    for (i = 0; i < queue.length; i++) {
      if (queue[i].value < min) {
        min = queue[i].value
        index = i
      }
    }
    var node = queue[index]
    queue.splice(index, 1)
    result.push(node)
    utils.animateSearch(node, time, grid, isBlackWhite, speed)
    var neighbours = utils.getNeighbours(node, grid)
    for (var i = 0; i < neighbours.length; i++) {
      var neighbour = neighbours[i]
      if (neighbour.row === endingNode[0] && neighbour.col === endingNode[1]) {
        result.push(neighbour)
        found = true
        prev[neighbour.row][neighbour.col] = node
        break
      }
      if (!visited[neighbour.row][neighbour.col] && !queue.includes(neighbour)) {
        prev[neighbour.row][neighbour.col] = node
        neighbour.distance = node.distance + 1
        neighbour.value = neighbour.distance + heuristic(neighbour, endingNode)
        queue.push(neighbour)
      }
    }
    visited[node.row][node.col] = true
    time++
  }
  setTimeout(() => {
    if (found) {
      var cur = result[result.length - 1]
      utils.animatePath(cur, time, grid)
      while (cur != startingNode) {
        cur = prev[cur.row][cur.col]
        utils.animatePath(cur, time, grid)
      }
    }
  }, time * speed)
  return result
}

function heuristic(start, end) {
  return (Math.abs(start.row - end[0]) + Math.abs(start.col - end[1]))
}
