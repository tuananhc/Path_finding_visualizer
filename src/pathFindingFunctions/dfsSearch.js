import anime from 'animejs/lib/anime.es'

function getNeighbours(curNode, grid) {
  var neighbour = []

  if (curNode.row > 0) {
    var node = grid[curNode.row - 1][curNode.col]
    if (!node.isWall) {
      neighbour.push(node)
    }
  }
  if (curNode.col < grid[0].length - 1) {
    var node = grid[curNode.row][curNode.col + 1]
    if (!node.isWall) {
      neighbour.push(node)
    }
  }
  if (curNode.row < grid.length - 1) {
    var node = grid[curNode.row + 1][curNode.col]
    if (!node.isWall) {
      neighbour.push(node)
    }
  }
  if (curNode.col > 0) {
    var node = grid[curNode.row][curNode.col - 1]
    if (!node.isWall) {
      neighbour.push(node)
    }
  }
  return neighbour
}

export function dfsSearch(startingNode, endingNode, grid, isBlackWhite, speed) {
  var width = grid[0].length
  var queue = [startingNode]
  var visited = []
  var prev = []
  var result = [startingNode]
  var found = false
  for (var i = 0; i < grid.length; i++) {
    var visit = []
    var pre = []
    for (var j = 0; j < width; j++) {
      visit.push(false)
      pre.push(-1)
    }
    visited.push(visit)
    prev.push(pre)
  }
  var time = 0
  while (queue.length > 0 && !found) {
    var node = queue[0]
    queue.splice(0, 1)
    visited[node.row][node.col] = true
    result.push(node)
    animateSearch(node, time, grid, isBlackWhite, speed)
    var neighbours = getNeighbours(node, grid)
    for (var i = 0; i < neighbours.length; i++) {
      var neighbour = neighbours[i]
      if (neighbour.row === endingNode[0] && neighbour.col === endingNode[1]) {
        result.push(neighbour)
        found = true
        prev[neighbour.row][neighbour.col] = node
        break
      }
      if (!visited[neighbour.row][neighbour.col]) {
        queue.unshift(neighbour)
        prev[neighbour.row][neighbour.col] = node
      }
    }
  }
  setTimeout(() => {
    if (found) {
      var cur = result[result.length - 1]
      animatePath(cur, time, grid)
      while (cur != startingNode) {
        cur = prev[cur.row][cur.col]
        animatePath(cur, time, grid)
      }
    }
  }, 100)
  return result
}

function animateSearch(node, time, grid, isBlackWhite, speed) {
  setTimeout(() => {
    anime({
      targets: document.getElementById("node".concat(node.row * grid[0].length + node.col)),
      scale: [
        { value: 1.1, easing: 'easeOutSine', duration: 500 },
        { value: 1, easing: 'easeInOutQuad', duration: 1200 }
      ],
      background: [
        { value: (isBlackWhite) ? '#7DEDFF' : '#FFFFFF', easing: 'linear', duration: 500 },
        { value: (isBlackWhite) ? '#0CECDD' : '#FFFFFF', easing: 'linear', duration: 500 },
      ],
      borderRadius: [
        { value: '20%', easing: 'linear', duration: 1000 },
        { value: '0%', easing: 'linear', duration: 500 },
      ],
    })
  }, speed * time)
}

function animatePath(node, time, grid) {
  setTimeout(() => {
    anime({
      targets: document.getElementById("node".concat(node.row * grid[0].length + node.col)),
      scale: [
        { value: 1.1, easing: 'easeOutSine', duration: 500 },
        { value: 1, easing: 'easeInOutQuad', duration: 1200 }
      ],
      background: [
        { value: '#FF7600', easing: 'linear', duration: 500 },
        { value: '#DF2E2E', easing: 'linear', duration: 500 },
      ],
      borderRadius: [
        { value: '20%', easing: 'linear', duration: 1000 },
        { value: '0%', easing: 'linear', duration: 500 },
      ],
    })
  }, 10 * time)
}
