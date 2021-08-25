import anime from 'animejs/lib/anime.es'

export function createDfsMaze(startingNode, grid, setGrid, isBlackWhite, speed) {
  var visited = []
  var newGrid = [...grid]
  var queue = [newGrid[startingNode.row][startingNode.col]]
  var order = []
  // var Rainbow = require('rainbowvis.js');
  // var rainbow = new Rainbow();
  // rainbow.setSpectrum(
  //   "#ff0000",
  //   "#ff4d00",
  //   "#ff9900",
  //   "#ffe500",
  //   "#ccff00",
  //   "#80ff00",
  //   "#33ff00",
  //   "#00e619",
  //   "#009966",
  //   "#004db3",
  //   "#0000ff",
  //   "#004db3",
  //   "#009966",
  //   "#00e619",
  //   "#33ff00",
  //   "#80ff00",
  //   "#ccff00",
  //   "#ffe500",
  //   "#ff9900",
  //   "#ff4d00",
  // )
  // rainbow.setNumberRange(0, 200)

  anime({
    targets: '.node',
    background: '#000000',
    duration: 1000,
    easing: 'linear',
  })

  for (var i = 0; i < newGrid.length; i++) {
    var visit = []
    for (var j = 0; j < newGrid[0].length; j++) {
      visit.push(false)
      newGrid[i][j].isWall = true;
    }
    visited.push(visit)
  }
  newGrid[startingNode.row][startingNode.col].distance = 0

  // setTimeout(() => {
  var time = 0
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
      // if (isBlackWhite) {
      //   // animateNode(node, time, newGrid, '#FFFFFF', speed)
      // } else {
      //   animateNode(node, time, newGrid, '#'.concat(rainbow.colourAt(node.distance % 200)), speed)
      // }
      time++
      var neighbours = thisGetNeighbour(node, newGrid)
      for (var i = 0; i < neighbours.length; i++) {
        queue.unshift(neighbours[i])
        newGrid[neighbours[i].row][neighbours[i].col].distance = newGrid[node.row][node.col].distance + 1
      }
    }
  }
  // }, 1000)

  setTimeout(() => {
    setGrid(newGrid)
  }, order.length * 10 + 1500)

  return order
}

export function animateDfsMaze(order, grid, isBlackWhite, speed) {
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
    if (isBlackWhite) {
      for (; i < order.length; i++) {
        animateNode(order[i], i, grid, '#FFFFFF', speed)
      }
    } else {
      for (; i < order.length; i++) {
        animateNode(order[i], i, grid, '#'.concat(myRainbow.colourAt(Math.floor(order[i].distance / max * 100))), speed)
      }
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

function animateNode(node, time, grid, color, speed) {
  setTimeout(() => {
    anime({
      targets: document.getElementById("node".concat(node.row * grid[0].length + node.col)),
      background: color,
    })
  }, speed * time)
}