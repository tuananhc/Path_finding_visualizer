import anime from 'animejs/lib/anime.es'

export function getNeighbours(curNode, grid) {
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

export function animateSearch(node, time, grid, isBlackWhite, speed) {
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

export function animatePath(node, time, grid, speed) {
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
  }, speed * time)
}