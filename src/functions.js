import React from 'react'

function getNeighbour(curNode, grid) {
    var neighbour = []
    if (curNode.row > 0) {
        neighbour.push(grid[curNode.row - 1][curNode.col])
    }
    if (curNode.row < grid.length - 1) {
        neighbour.push(grid[curNode.row + 1][curNode.col])
    }
    if (curNode.col > 0) {
        neighbour.push(grid[curNode.row][curNode.col - 1])
    }
    if (curNode.row < grid[0].length - 1) {
        neighbour.push(grid[curNode.row][curNode.col + 1])
    }
    return neighbour
}

export function dijkstra(startingNode, endingNode, grid) {
    var width = grid[0].length
    var queue = [startingNode]
    var visited = []
    var distance = []
    var prev = []
    while (queue.length > 0) {
        var node = queue[0]
        visited[node.row * width + node.col] = true
        var neighbours = getNeighbour(node, grid)
        neighbours.map((neighbour) => {
            if (!visited[neighbour.row * width + neighbour.col]) {
                queue.push(neighbours)
            }
        })
    }
}