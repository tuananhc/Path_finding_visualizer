import './App.css';
import anime from 'animejs/lib/anime.es.js';
import React, { useState, useEffect } from 'react';
import { Button, Select, MenuItem } from '@material-ui/core';
import { bfsSearch, animateBfsSearch } from './pathFindingFunctions/bfsSearch';
import { createDfsMaze, animateDfsMaze } from './mazeFunctions/randomizedDfsMaze'
import xmark from './assets/close.png'
import arrow from './assets/right-arrow.png'

function App() {

  const [isMousePressed, setIsMousePressed] = useState(false)
  const [isMovingStart, setIsMovingStart] = useState(false)
  const [isMovingEnd, setIsMovingEnd] = useState(false)
  const [mazeSize, setMazeSize] = useState('medium')
  const [mode, setMode] = useState('automatic')
  const [nodeSize, setNodeSize] = useState(20)
  const [startingNode, setStartingNode] = useState([Math.floor((window.innerHeight - 200) / nodeSize / 2), Math.floor(window.innerWidth / nodeSize / 4)])
  const [endingNode, setEndingNode] = useState([Math.floor((window.innerHeight - 200) / nodeSize / 2), Math.floor(window.innerWidth * 3 / nodeSize / 4)])
  const blankGrid = createGrid()
  const [grid, setGrid] = useState(createGrid())
  const [isGrid, setIsGrid] = useState(true)
  const [isBlackWhite, setIsBlackWhite] = useState(false)

  const styles = {
    node: {
      width: (isGrid) ? nodeSize - 1 : nodeSize,
      height: (isGrid) ? nodeSize - 1 : nodeSize,
      border: (isGrid) ? '1px solid #7DEDFF' : '',
    },
    wall: {
      width: (isGrid) ? nodeSize - 1 : nodeSize,
      height: (isGrid) ? nodeSize - 1 : nodeSize,
      border: (isGrid) ? '1px solid #7DEDFF' : '',
      backgroundColor: 'black'
    }
  }

  useEffect(() => {
    if (mazeSize === 'very small') {
      setNodeSize(25)
    } else if (mazeSize === 'small') {
      setNodeSize(20)
    } else if (mazeSize === 'medium') {
      setNodeSize(15)
    } else if (mazeSize === 'big') {
      setNodeSize(10)
    } else if (mazeSize === 'very big') {
      setNodeSize(5)
    }
  }, [mazeSize])

  useEffect(() => {
    setStartingNode([Math.floor((window.innerHeight - 200) / nodeSize / 2), Math.floor(window.innerWidth / nodeSize / 4)])
    setEndingNode([Math.floor((window.innerHeight - 200) / nodeSize / 2), Math.floor(window.innerWidth * 3 / nodeSize / 4)])
  }, [nodeSize])

  function createGrid() {
    var grids = []
    for (var i = 0; i < Math.floor((window.innerHeight - 200) / nodeSize); i++) {
      var row = []
      for (var j = 0; j < Math.floor(window.innerWidth / nodeSize); j++) {
        row.push({
          row: i,
          col: j,
          isWall: false,
          isStart: false,
          isEnd: false,
          distance: -1,
        })
      }
      grids.push(row)
    }
    return grids
  }

  function renderGrid(grid) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {grid.map((row) => {
          return (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              {row.map(node => {
                return createNode(node)
              })}
            </div>
          )
        })}
      </div>
    )
  }

  function createNode(node) {
    return (
      <div
        style={{ width: nodeSize, height: nodeSize }}
        onMouseDown={() => {
          if ((node.row === startingNode[0] && node.col === startingNode[1])) {
            setIsMovingStart(true)
            return
          }
          if ((node.row === endingNode[0] && node.col === endingNode[1])) {
            setIsMovingEnd(true)
            return
          }
          var newGrid = [...grid]
          var curNode = newGrid[node.row][node.col]
          curNode.isWall = !node.isWall
          newGrid[node.row][node.col] = curNode
          setGrid(newGrid)
          setIsMousePressed(true)
        }}
        onMouseEnter={() => {
          if (isMovingStart) {
            if ((node.row === endingNode[0] && node.col === endingNode[1])) { return }
            if (node.isWall) {
              var newGrid = [...grid]
              var curNode = newGrid[node.row][node.col]
              curNode.isWall = !node.isWall
              newGrid[node.row][node.col] = curNode
              setGrid(newGrid)
            }
            setStartingNode([node.row, node.col])

          }
          if (isMovingEnd) {
            if ((node.row === startingNode[0] && node.col === startingNode[1])) { return }
            if (node.isWall) {
              var newGrid = [...grid]
              var curNode = newGrid[node.row][node.col]
              curNode.isWall = !node.isWall
              newGrid[node.row][node.col] = curNode
              setGrid(newGrid)
            }
            setEndingNode([node.row, node.col])

          }
          if (isMousePressed) {
            var newGrid = [...grid]
            var curNode = newGrid[node.row][node.col]
            curNode.isWall = !node.isWall
            newGrid[node.row][node.col] = curNode
            setGrid(newGrid)
          }
        }}
        onMouseUp={() => {
          if (isMovingStart) {
            setIsMovingStart(false)
          }
          if (isMovingEnd) {
            setIsMovingEnd(false)
          }
          if (isMousePressed) {
            setIsMousePressed(false)
          }

        }}
      >
        {(node.row === startingNode[0] && node.col === startingNode[1]) ? (
          <div id={"node".concat(Math.floor(window.innerWidth / nodeSize) * node.row + node.col)} style={styles.node}>
            <img src={arrow} style={{ width: nodeSize - 1, heigth: nodeSize - 1 }} draggable={false} />
          </div>
        ) : (
          <>
            {(node.row === endingNode[0] && node.col === endingNode[1]) ? (
              <div id={"node".concat(Math.floor(window.innerWidth / nodeSize) * node.row + node.col)} style={styles.node}>
                <img src={xmark} style={{ width: nodeSize - 1, heigth: nodeSize - 1 }} draggable={false} />
              </div>
            ) : (
              <>
                {(node.isWall) ? (
                  <div
                    className='node'
                    id={"node".concat(Math.floor(window.innerWidth / nodeSize) * node.row + node.col)}
                    style={styles.wall} />
                ) : (
                  <div
                    className='node'
                    id={"node".concat(Math.floor(window.innerWidth / nodeSize) * node.row + node.col)}
                    style={styles.node}
                  />
                )}
              </>
            )}
          </>
        )}

      </div>
    )
  }

  return (
    <div style={{ height: window.innerHeight, overflow: 'hidden' }}>
      <div style={{ height: 200, width: '100%', backgroundColor: 'teal' }}>
        <Button
          variant="contained"
          color="primary"
          style={{ width: 100 }}
          onClick={() => {
            animateBfsSearch(bfsSearch(grid[startingNode[0]][startingNode[1]], endingNode, grid), nodeSize, isBlackWhite)
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
            setStartingNode([Math.floor((window.innerHeight - 200) / nodeSize / 2), Math.floor(window.innerWidth / nodeSize / 4)])
            setEndingNode([Math.floor((window.innerHeight - 200) / nodeSize / 2), Math.floor(window.innerWidth * 3 / nodeSize / 4)])
            anime({
              targets: '.node',
              background: '#FFFFFF'
            })
          }}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ width: 100 }}
          onClick={() => {
            animateDfsMaze(createDfsMaze(grid, setGrid), grid, isBlackWhite)
          }}
        >
          Maze
        </Button>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ margin: '10px 20px' }}>
            <p>Maze size</p>
            <Select
              value={mazeSize}
              onChange={(event) => setMazeSize(event.target.value)}
            >
              <MenuItem value={'very small'}>Very small</MenuItem>
              <MenuItem value={'small'}>Small</MenuItem>
              <MenuItem value={'medium'}>Medium</MenuItem>
              <MenuItem value={'big'}>Big</MenuItem>
              <MenuItem value={'very big'}>Very big</MenuItem>
            </Select>
          </div>

          <div style={{ margin: '10px 20px' }}>
            <p>Search algorithm</p>
            <Select
              value={mazeSize}
              onChange={(event) => { console.log(event.target.value) }}
            >
              <MenuItem value={'bfs'}>Breadth First Search</MenuItem>
            </Select>
          </div>

          <div style={{ margin: '10px 20px' }}>
            <p>Maze generating algorithm</p>
            <Select
              value={mazeSize}
              onChange={(event) => setMazeSize(event.target.value)}
            >
              <MenuItem value={'dfs'}>Randomized Depth First Search</MenuItem>
            </Select>
          </div>

          <div style={{ margin: '10px 20px' }}>
            <p>Show grid</p>
            <Select
              value={isGrid}
              onChange={(event) => setIsGrid(event.target.value)}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </div>

          <div style={{ margin: '10px 20px' }}>
            <p>Maze style</p>
            <Select
              value={isBlackWhite}
              onChange={(event) => setIsBlackWhite(event.target.value)}
            >
              <MenuItem value={true}>Black & White</MenuItem>
              <MenuItem value={false}>Color</MenuItem>
            </Select>
          </div>

          <div style={{ margin: '10px 20px' }}>
            <p>Mode</p>
            <Select
              value={mode}
              onChange={(event) => setMode(event.target.value)}
            >
              <MenuItem value={'atomatic'}>Automatic</MenuItem>
              <MenuItem value={'manual'}>Manual</MenuItem>
            </Select>
          </div>
        </div>
      </div>

      <div >
        {renderGrid(grid)}
      </div>
    </div>
  );
}

export default App;
