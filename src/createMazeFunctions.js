import { getNeighbours } from "./pathFindingFunctions";

export function randomizeDepthFirstSearch(grid, startingNode, setGrid) {
  var visited = []
  var queue = [startingNode]
  var order = []
  var newGrid = [...grid]
  for (var i = 0; i < grid.length; i++) {
		var visit = []
		for (var j = 0; j < width; j++) {
			visit.push(false)
		}
		visited.push(visit)
	}
  while (queue.length > 0) {
    var node = queue[0]
    queue.splice(0, 1)
    var neighbours = getNeighbours(node)
    newGrid[node.row][node.col].isWall = true
    for (var i = 0; i < neighbours.length; i++) {
      var neighbour = neighbours[i]
      if (!visited[neighbour]) {
        queue.push(neighbour)
        visited[neighbour.row][neighbour.col] = true
        order.push(neighbour)
      }
    }
  }
  setGrid(newGrid)
  return order
}