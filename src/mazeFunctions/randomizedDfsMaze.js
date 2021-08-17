import anime from 'animejs/lib/anime.es'

export function randomizeDepthFirstSearch(grid, setGrid) {
  var visited = []
  var newGrid = [...grid]
  var queue = [newGrid[1][2]]
  var order = []

  for (var i = 0; i < newGrid.length; i++) {
    var visit = []
    for (var j = 0; j < newGrid[0].length; j++) {
      visit.push(false)
    }
    visited.push(visit)
  }

  for (var i = 0; i < grid[0].length; i++) {
    newGrid[0][i].isWall = true
    order.push(newGrid[0][i])
  }
  for (var i = 1; i < grid.length; i++) {
    newGrid[i][grid[0].length - 1].isWall = true
    order.push(newGrid[i][grid[0].length - 1])
  }
  for (var i = grid[0].length - 1; i >= 0; i--) {
    newGrid[grid.length - 1][i].isWall = true
    order.push(newGrid[grid.length - 1][i])
  }
  for (var i = grid.length - 1; i >= 0; i--) {
    newGrid[i][0].isWall = true
    order.push(newGrid[i][0])
  }
  while (queue.length > 0) {
    if (queue.length >= 4) {
      var randIndex = Math.floor(Math.random() * 4)
      var node = queue[randIndex]
      queue.splice(randIndex, 1)
    } else {
      var randIndex = Math.floor(Math.random() * queue.length)
      var node = queue[randIndex]
      queue.splice(randIndex, 1)
    }
    if (!visited[node.row][node.col] && checkAdjacent(node, newGrid) && checkDiagonal(node, newGrid)) {
      order.push(node)
      newGrid[node.row][node.col].isWall = true
      visited[node.row][node.col] = true
      var neighbours = thisGetNeighbours(node, newGrid)
      for (var i = 0; i < neighbours.length; i++) {
        queue.unshift(neighbours[i])
      }
    }
  }
  return order
}

export function animateDfsMaze(order, grid, setGrid) {
  var i = 0
  for (; i < order.length; i++) {
    change(order[i], i, grid)
  }
  setTimeout(() => setGrid(grid), i * 15)
  return
}

function change(node, time, grid) {
  setTimeout(() => {
    anime({
      targets: document.getElementById("node".concat(node.row * grid[0].length + node.col)),
      background: '#000000'
    })
  }, 15 * time)
}

function thisGetNeighbours(curNode, grid) {
  var neighbour = []
  if (curNode.row > 0) {
    var node = grid[curNode.row - 1][curNode.col]
    neighbour.push(node)
  }
  if (curNode.col < grid[0].length - 1) {
    var node = grid[curNode.row][curNode.col + 1]
    neighbour.push(node)
  }
  if (curNode.row < grid.length - 1) {
    var node = grid[curNode.row + 1][curNode.col]
    neighbour.push(node)
  }
  if (curNode.col > 0) {
    var node = grid[curNode.row][curNode.col - 1]
    neighbour.push(node)
  }
  return neighbour
}

function checkAdjacent(node, grid) {
  var neighbours = thisGetNeighbours(node, grid)
  var count = 0
  for (var i = 0; i < neighbours.length; i++) {
    if (neighbours[i].isWall) {
      count++
    }
    if (count >= 2) {
      return false
    }
  }
  return true
}

function checkDiagonal(node, grid) {
  if (node.row > 0 && node.col > 0) {
    if (grid[node.row - 1][node.col - 1].isWall && !grid[node.row - 1][node.col].isWall && !grid[node.row][node.col - 1].isWall) {
      return false
    }
  }
  if (node.row > 0 && node.col < grid[0].length - 1) {
    if (grid[node.row - 1][node.col + 1].isWall && !grid[node.row - 1][node.col].isWall && !grid[node.row][node.col + 1].isWall) {
      return false
    }
  }
  if (node.row < grid.length - 1 && node.col > 0) {
    if (grid[node.row + 1][node.col - 1].isWall && !grid[node.row + 1][node.col].isWall && !grid[node.row][node.col - 1].isWall) {
      return false
    }
  }
  if (node.row < grid.length - 1 && node.col < grid[0].length - 1) {
    if (grid[node.row + 1][node.col + 1].isWall && !grid[node.row + 1][node.col].isWall && !grid[node.row][node.col + 1].isWall) {
      return false
    }
  }
  return true
}


export function createPath(grid, setGrid) {
  var visited = []
  var newGrid = [...grid]
  var queue = [newGrid[1][1]]
  var order = []

  for (var i = 0; i < newGrid.length; i++) {
    var visit = []
    for (var j = 0; j < newGrid[0].length; j++) {
      visit.push(false)
      newGrid[i][j].isWall = true;
    }
    visited.push(visit)
  }
  while (queue.length > 0) {
    if (queue.length >= 4) {
      var randIndex = Math.floor(Math.random() * 4)
      var node = queue[randIndex]
      queue.splice(randIndex, 1)
    } else {
      var randIndex = Math.floor(Math.random() * queue.length)
      var node = queue[randIndex]
      queue.splice(randIndex, 1)
    }
    if (!visited[node.row][node.col] && checkEmptyAdjacent(node, newGrid) && checkEmptyDiagonal(node, newGrid)) {
      order.push(node)
      newGrid[node.row][node.col].isWall = false
      visited[node.row][node.col] = true
      var neighbours = anotherGetNeighbour(node, newGrid)
      for (var i = 0; i < neighbours.length; i++) {
        queue.unshift(neighbours[i])
      }
    }
  }
  return order
}

function checkEmptyAdjacent(node, grid) {
  var neighbours = thisGetNeighbours(node, grid)
  var count = 0
  for (var i = 0; i < neighbours.length; i++) {
    if (!neighbours[i].isWall) {
      count++
    }
    if (count >= 2) {
      return false
    }
  }
  return true
}

function checkEmptyDiagonal(node, grid) {
  if (node.row > 0 && node.col > 0) {
    if (!grid[node.row - 1][node.col - 1].isWall && grid[node.row - 1][node.col].isWall && grid[node.row][node.col - 1].isWall) {
      return false
    }
  }
  if (node.row > 0 && node.col < grid[0].length - 1) {
    if (!grid[node.row - 1][node.col + 1].isWall && grid[node.row - 1][node.col].isWall && grid[node.row][node.col + 1].isWall) {
      return false
    }
  }
  if (node.row < grid.length - 1 && node.col > 0) {
    if (!grid[node.row + 1][node.col - 1].isWall && grid[node.row + 1][node.col].isWall && grid[node.row][node.col - 1].isWall) {
      return false
    }
  }
  if (node.row < grid.length - 1 && node.col < grid[0].length - 1) {
    if (!grid[node.row + 1][node.col + 1].isWall && grid[node.row + 1][node.col].isWall && grid[node.row][node.col + 1].isWall) {
      return false
    }
  }
  return true
}

function anotherGetNeighbour(node, grid) {
  var neighbour = []
  if (node.row > 1) {
    neighbour.push(grid[node.row - 1][node.col])
  }
  if (node.col < grid[0].length - 2) {
    neighbour.push(grid[node.row][node.col + 1])
  }
  if (node.row < grid.length - 2) {
    neighbour.push(grid[node.row + 1][node.col])
  }
  if (node.col > 1) {
    neighbour.push(grid[node.row][node.col - 1])
  }
  return neighbour
}

function changeWhite(node, time, grid) {
  setTimeout(() => {
    anime({
      targets: document.getElementById("node".concat(node.row * grid[0].length + node.col)),
      background: '#FFFFFF'
    })
  }, 15 * time)
}

export function anotherAnimateDfs(order, grid, setGrid) {
  anime({
    targets: '.node',
    background: '#000000',
    duration: 750,
    easing: 'linear'
  })
  setTimeout(() => {
    var i = 0
    for (; i < order.length; i++) {
      changeWhite(order[i], i, grid)
    }
  }, 1000)

  return
}