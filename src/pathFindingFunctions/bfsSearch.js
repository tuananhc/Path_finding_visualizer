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

export function bfsSearch(startingNode, endingNode, grid) {
	var width = grid[0].length
	var queue = [startingNode]
	var visited = []
	var prev = []
	var result = [startingNode]
	var found = false
	var path = []
	var dist = []
	for (var i = 0; i < grid.length; i++) {
		var visit = []
		var pre = []
		var dis = []
		for (var j = 0; j < width; j++) {
			visit.push(false)
			pre.push(-1)
			dis.push(-1)
		}
		visited.push(visit)
		prev.push(pre)
		dist.push(dis)
	}
	while (queue.length > 0 && !found) {
		var node = queue[0]
		queue.splice(0, 1)
		visited[node.row][node.col] = true
		var neighbours = getNeighbours(node, grid)
		for (var i = 0; i < neighbours.length; i++) {
			var neighbour = neighbours[i]
			if (neighbour.row === endingNode[0] && neighbour.col === endingNode[1]) {
				result.push(neighbour)
				found = true
				prev[neighbour.row][neighbour.col] = node
				dist[neighbour.row][neighbour.col] = dist[node.row][node.col] + 1
				break
			}
			if (!visited[neighbour.row][neighbour.col]) {
				queue.push(neighbour)
				visited[neighbour.row][neighbour.col] = true
				prev[neighbour.row][neighbour.col] = node
				dist[neighbour.row][neighbour.col] = dist[node.row][node.col] + 1
				result.push(neighbour)
			}
		}
	}
	if (found) {
		var cur = result[result.length - 1]
		path.push(cur)
		while (cur != startingNode) {
			path.push(cur)
			cur = prev[cur.row][cur.col]
		}
		path.push(startingNode)
	}
	return [result, path]
}

export function animateBfsSearch([visitOrder, path]) {
	for (var i = 0; i <= visitOrder.length; i++) {
		if (i === visitOrder.length) {
			setTimeout(() => {
				for (var j = 0; j < path.length; j++) {
					animatePath(path[j], j)
				}
			}, 10 * i + 100)
			return
		}
		var node = visitOrder[i]
		animateSearch(node, i)
	}
}

function animateSearch(node, time) {
	setTimeout(() => {
		anime({
			targets: document.getElementById("node".concat(node.row * Math.floor(window.innerWidth / 15) + node.col)),
			scale: [
				{ value: 1.1, easing: 'easeOutSine', duration: 500 },
				{ value: 1, easing: 'easeInOutQuad', duration: 1200 }
			],
			background: [
				{ value: '#0CECDD', easing: 'linear', duration: 500 },
				{ value: '#7DEDFF', easing: 'linear', duration: 500 },
			],
			borderRadius: [
				{ value: '20%', easing: 'linear', duration: 1000 },
				{ value: '0%', easing: 'linear', duration: 500 },
			],
		})
	}, 10 * time)
}

function animatePath(node, time) {
	setTimeout(() => {
		anime({
			targets: document.getElementById("node".concat(node.row * Math.floor(window.innerWidth / 15) + node.col)),
			scale: [
				{ value: 1.1, easing: 'easeOutSine', duration: 500 },
				{ value: 1, easing: 'easeInOutQuad', duration: 1200 }
			],
			background: [
				{ value: '#DF2E2E', easing: 'linear', duration: 500 },
				{ value: '#FF7600', easing: 'linear', duration: 500 },
			],
			borderRadius: [
				{ value: '20%', easing: 'linear', duration: 1000 },
				{ value: '0%', easing: 'linear', duration: 500 },
			],
		})
	}, 15 * time)
}
