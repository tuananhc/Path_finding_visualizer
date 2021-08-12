import './App.css';
import anime from 'animejs/lib/anime.es.js';
import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core'
import { render } from '@testing-library/react';

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  const updateMousePosition = ev => {
    setMousePosition({ x: ev.clientX, y: ev.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);

    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return mousePosition;
};

function App() {

  const [grid, setGrid] = useState(createGrid())
  const [startingNode, setStartingNode] = useState()
  const [endingNode, setEndingNode] = useState()
  const { x, y } = useMousePosition()
  const blankGrid = createGrid()

  function createGrid() {
    var grids = []
    for (var i = 0; i < Math.floor((window.innerHeight - 200) / 20); i++) {
      var row = []
      for (var j = 0; j < Math.floor(window.innerWidth / 20); j++) {
        row.push({
          row: i,
          col: j,
          isWall: false,
          isStart: false,
          isEnd: false
        })
      }
      grids.push(row)
    }
    return grids
  }

  function renderGrid(grid) {
    return (
      <div>
        {grid.map((row) => {
          return (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              {row.map(node => {
                if (node.isWall) {
                  return createWall(node.col, node.row)
                } else {
                  return createNode(node.col, node.row)
                }
              })}
            </div>
          )
        })}
      </div>
    )
  }

  function createWall(col, row) {
    return (
      <div
        id={"node".concat(col * row + col)}
        style={{ width: 20, height: 20, backgroundColor: 'black' }}
        onMouseDown={() => {
          var newGrid = [...grid]
          var node = newGrid[row][col]
          node.isWall = !node.isWall
          newGrid[row][col] = node
          setGrid(newGrid)
          setIsMousePressed(true)
        }}
        onMouseEnter={() => {
          if (isMousePressed) {
            var newGrid = [...grid]
            var node = newGrid[row][col]
            node.isWall = !node.isWall
            newGrid[row][col] = node
            setGrid(newGrid)
          }
        }}
        onMouseUp={() => setIsMousePressed(false)}
      />
    )
  }

  const [isMousePressed, setIsMousePressed] = useState(false)

  function createNode(col, row) {
    return (
      <div
        className='node'
        id={"node".concat(col * row + col)}
        style={{ width: 18, height: 18, border: '1px solid #7DEDFF' }}
        onMouseDown={() => {
          var newGrid = [...grid]
          var node = newGrid[row][col]
          node.isWall = !node.isWall
          newGrid[row][col] = node
          setGrid(newGrid)
          setIsMousePressed(true)
        }}
        onMouseEnter={() => {
          if (isMousePressed) {
            var newGrid = [...grid]
            var node = newGrid[row][col]
            node.isWall = !node.isWall
            newGrid[row][col] = node
            setGrid(newGrid)
          }
        }}
        onMouseUp={() => setIsMousePressed(false)}
      />
    )
  }

  function start() {
    anime({
      targets: '.node',
      scale: [
        { value: 1.1, easing: 'easeOutSine', duration: 500 },
        { value: 1, easing: 'easeInOutQuad', duration: 1200 }
      ],
      background: [
        { value: '#0CECDD', easing: 'linear', duration: 500 },
        { value: '#88FFF7', easing: 'linear', duration: 500 },
      ],
      borderRadius: [
        { value: '20%', easing: 'linear', duration: 1000 },
        { value: '0%', easing: 'linear', duration: 500 },
      ],
      delay: anime.stagger(200, { grid: [Math.floor(window.innerWidth / 20), Math.floor((window.innerHeight - 200) / 20)] }),
    });
  }

  return (
    <div style={{ height: window.innerHeight, overflow: 'hidden' }}>
      <div style={{ height: 200, width: '100%', backgroundColor: 'teal' }}>
        <Button
          variant="contained"
          color="primary"
          style={{ width: 100 }}
          onClick={() => {
            start()
          }}
        >
          Start
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ width: 100 }}
          onClick={() => {
            setGrid(blankGrid)
          }}
        >
          Reset
        </Button>
        {x} : {y}
      </div>
      <div>
        {renderGrid(grid)}
      </div>
    </div>
  );
}

export default App;
