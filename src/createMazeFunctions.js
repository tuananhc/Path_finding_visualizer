import { getNeighbours } from "./pathFindingFunctions";
import anime from 'animejs/lib/anime.es'

export function randomizeDepthFirstSearch(grid, setGrid) {
  var visited = []
  var queue = [grid[0][0]]
  var order = []
  var newGrid = [...grid]
  for (var i = 0; i < grid.length; i++) {
    var visit = []
    for (var j = 0; j < grid[0].length; j++) {
      visit.push(false)
    }
    visited.push(visit)
  }
  while (queue.length > 0) {
    var node = queue[0]
    queue.splice(0, 1)
    var neighbours = getNeighbours(node)
    var randIndex = Math.floor(Math.random() * 4)
    newGrid[node.row][node.col].isWall = true
    for (var i = 0; i < neighbours.length; i++) {
      var neighbour = neighbours[i]
      if (!visited[neighbour]) {
        queue.push(neighbour)
        visited[neighbour.row][neighbour.col] = true
        order.push(neighbour)
        newGrid[neighbour.row][neighbour.col].isWall = true
      }
    }
  }
  setGrid(newGrid)
  return order
}

export function simpleRandomizeDepthFirstSearch(grid, setGrid) {
  var newGrid = [...grid]
  var time = 0
  for (var i = 0; i < grid[0].length; i++) {
    change(0, i, time, newGrid)
    newGrid[0][i].isWall = true
    time++
  }
  for (var i = 1; i < grid.length; i++) {
    change(i, grid[0].length - 1, time, newGrid)
    newGrid[i][grid[0].length - 1].isWall = true
    time++
  }
  for (var i = grid[0].length - 1; i >= 0; i--) {
    change(grid.length - 1, i, time, newGrid)
    newGrid[grid.length - 1][i].isWall = true
    time++
  }
  for (var i = grid.length - 1; i >= 0; i--) {
    newGrid[i][0].isWall = true
    change(i, 0, time, newGrid)
    time++
  }
  setTimeout(() => {
    setGrid(newGrid)
  }, 5 * time + 20)
  return
}

function change(row, col, time, grid) {
  setTimeout(() => {
    anime({
      targets: document.getElementById("node".concat(row * grid[0].length + col)),
      background: '#000000'
    })
  }, 5 * time)
}
