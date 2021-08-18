import anime from 'animejs/lib/anime.es'



export function createDfsMaze(grid, setGrid) {
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
  newGrid[1][1].distance = 0

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
      newGrid[node.row][node.col].isWall = false
      visited[node.row][node.col] = true

      var neighbours = thisGetNeighbour(node, newGrid)
      for (var i = 0; i < neighbours.length; i++) {
        queue.unshift(neighbours[i])
        newGrid[neighbours[i].row][neighbours[i].col].distance = newGrid[node.row][node.col].distance + 1
      }
    }
  }
  setTimeout(() => {
    setGrid(newGrid)
  }, order.length * 10 + 1500)
  console.log(order)
  return order
}

export function animateDfsMaze(order, grid, setGrid) {
  var Rainbow = require('rainbowvis.js');
  var myRainbow = new Rainbow();
  var max = 0
  for (var i = 0; i < order.length; i++) {
    if (order[i].distance > max) {
      max = order[i].distance
    }
  }
  anime({
    targets: '.node',
    background: '#000000',
    duration: 500,
    easing: 'linear',
  })
  setTimeout(() => {
    var i = 0
    for (; i < order.length; i++) {
      animateNode(order[i], i, grid, '#'.concat(myRainbow.colourAt(Math.floor(order[i].distance / max * 100))))
    }
  }, 1000)

  return
}

function checkAdjacent(node, grid) {
  var neighbours = thisGetNeighbour(node, grid)
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

function checkDiagonal(node, grid) {
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

function thisGetNeighbour(node, grid) {
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

function animateNode(node, time, grid, color) {

  setTimeout(() => {
    anime({
      targets: document.getElementById("node".concat(node.row * grid[0].length + node.col)),
      background: color,

    })
  }, 10 * time)
}