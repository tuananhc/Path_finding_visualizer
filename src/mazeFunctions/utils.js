import anime from 'animejs/lib/anime.es'

export function checkAdjacent(node, grid) {
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

export function checkDiagonal(node, grid) {
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

export function thisGetNeighbour(node, grid) {
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

export function animateNode(node, time, grid, color, speed) {
  setTimeout(() => {
    anime({
      targets: document.getElementById("node".concat(node.row * grid[0].length + node.col)),
      background: color,
    })
  }, speed * time)
}