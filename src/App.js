import './App.css';
import anime from 'animejs/lib/anime.es.js';
import React, { useState, useEffect } from 'react';
import { Button, Select, MenuItem, InputLabel, FormControl, makeStyles } from '@material-ui/core';
import { bfsSearch } from './pathFindingFunctions/bfsSearch';
import { dfsSearch } from './pathFindingFunctions/dfsSearch';
import { dijkstraSearch } from './pathFindingFunctions/dijkstra';
import { createBfsMaze, animateBfsMaze } from './mazeFunctions/randomizedBfsMaze'
import { createDfsMaze, animateDfsMaze } from './mazeFunctions/randomizedDfsMaze'
import { createPrimsMaze, animatePrimsMaze } from './mazeFunctions/primsMaze'
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
  const [searchAlgorithm, setSearchAlgorithm] = useState('bfs')
  const [mazeAlgorithm, setMazeAlgorithm] = useState('dfs')
  const [speed, setSpeed] = useState(5)

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
      setSpeed(10)
    } else if (mazeSize === 'small') {
      setNodeSize(20)
      setSpeed(10)
    } else if (mazeSize === 'medium') {
      setNodeSize(15)
      setSpeed(5)
    } else if (mazeSize === 'big') {
      setNodeSize(10)
      setSpeed(3)
    } else if (mazeSize === 'very big') {
      setNodeSize(5)
      setSpeed(3)
    }
  }, [mazeSize])

  useEffect(() => {
    setGrid(blankGrid)
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
          value: -1
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

  function createSelect(inputLabel, value, valueFunction, items) {
    return (
      <div style={{ margin: 30 }}>
        <FormControl variant='outlined'>
          <InputLabel>{inputLabel}</InputLabel>
          <Select
            value={value}
            onChange={(event) => valueFunction(event.target.value)}
          >
            {items.map(item => {
              return (
                <MenuItem value={item.value}>{item.description}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </div>
    )
  }

  return (
    <div style={{ height: window.innerHeight, overflow: 'hidden' }}>
      <div style={{ height: 200, width: '100%', backgroundColor: 'lightgray' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ margin: 30 }}>
            <FormControl variant='outlined'>
              <InputLabel>Maze size</InputLabel>
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
            </FormControl>
          </div>

          <div style={{ margin: 30, width: 200 }}>
            <FormControl variant='outlined' styles={{ minWidth: 200, backgroundColor: 'red' }}>
              <InputLabel styles={{ minWidth: 200, backgroundColor: 'red' }}>Search algorithm</InputLabel>
              <Select
                value={searchAlgorithm}
                onChange={(event) => setSearchAlgorithm(event.target.value)}
              >
                <MenuItem value={'bfs'}>Breadth First Search</MenuItem>
                <MenuItem value={'dfs'}>Depth First Search</MenuItem>
                <MenuItem value={'dijkstra'}>Dijkstra Search Algorithm</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div style={{ margin: 30 }}>
            <FormControl variant='outlined' styles={{ minWidth: 120, margin: 20 }}>
              <InputLabel>Maze generating algorithm</InputLabel>
              <Select
                value={mazeAlgorithm}
                onChange={(event) => setMazeAlgorithm(event.target.value)}
              >
                <MenuItem value={'dfs'}>Randomized Depth First Maze</MenuItem>
                <MenuItem value={'bfs'}>Randomized Breadth First Maze</MenuItem>
                <MenuItem value={'prims'}>Prim's Maze</MenuItem>
              </Select>
            </FormControl>

          </div>

          <div style={{ margin: 30 }}>
            <FormControl variant='outlined' styles={{ minWidth: 120, margin: 20 }}>
              <InputLabel>Show grid</InputLabel>
              <Select
                value={isGrid}
                onChange={(event) => setIsGrid(event.target.value)}
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div style={{ margin: 30 }}>
            <FormControl variant='outlined' styles={{ minWidth: 120, margin: 20 }}>
              <InputLabel>Maze style</InputLabel>
              <Select
                value={isBlackWhite}
                onChange={(event) => setIsBlackWhite(event.target.value)}
              >
                <MenuItem value={false}>Color</MenuItem>
                <MenuItem value={true}>Black & White</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div style={{ margin: 30 }}>
            <FormControl variant='outlined' styles={{ minWidth: 120, margin: 20 }}>
              <InputLabel>Mode</InputLabel>
              <Select
                value={mode}
                onChange={(event) => setMode(event.target.value)}
              >
                <MenuItem value={'automatic'}>Automatic</MenuItem>
                <MenuItem value={'manual'}>Manual</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div style={{ width: '100%', display: 'flex', flex: 1, flexDirection: 'row' }}>
          <div style={{ display: 'flex', flex: 0.2, flexDirection: 'column' }}>
            <div style={{ display: 'flex', width: '100%', flexDirection: 'row', marginLeft: 30 }}>
              <div style={{ display: 'flex', flex: 0.5 }}>Nearest</div>
              <div style={{ display: 'flex', flex: 0.5, justifyContent: 'flex-end' }}>Furthest</div>
            </div>
            <div class='gradient' style={{ width: '100%', height: 12.5, marginLeft: 30 }} />
          </div>
          <div style={{ display: 'flex', flex: 0.6, alignItems: 'center', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              style={{ width: 100, margin: '20px 40px' }}
              onClick={() => {
                setGrid([])
                anime.remove()
                setTimeout(() => {
                  setGrid(blankGrid)
                  setStartingNode([Math.floor((window.innerHeight - 200) / nodeSize / 2), Math.floor(window.innerWidth / nodeSize / 4)])
                  setEndingNode([Math.floor((window.innerHeight - 200) / nodeSize / 2), Math.floor(window.innerWidth * 3 / nodeSize / 4)])
                  anime({
                    targets: '.node',
                    background: '#FFFFFF'
                  })
                }, 100)

              }}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ width: 100, margin: '20px 40px' }}
              onClick={() => {
                if (searchAlgorithm === 'bfs') {
                  bfsSearch(grid[startingNode[0]][startingNode[1]], endingNode, grid, isBlackWhite, speed)
                } else if (searchAlgorithm === 'dfs') {
                  dfsSearch(grid[startingNode[0]][startingNode[1]], endingNode, grid, isBlackWhite, speed)
                } else if (searchAlgorithm === 'dijkstra') {
                  dijkstraSearch(grid[startingNode[0]][startingNode[1]], endingNode, grid, isBlackWhite, speed)
                }
              }}
            >
              Start
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ width: 100, margin: '20px 40px' }}
              onClick={() => {
                if (mazeAlgorithm === 'bfs') {
                  animateBfsMaze(createBfsMaze(grid, setGrid, isBlackWhite), grid, isBlackWhite, speed)
                } else if (mazeAlgorithm === 'dfs') {
                  animateDfsMaze(createDfsMaze(grid, setGrid, isBlackWhite), grid, isBlackWhite, speed)
                } else if (mazeAlgorithm === 'prims') {
                  animatePrimsMaze(createPrimsMaze(grid, setGrid, isBlackWhite), grid, isBlackWhite, speed)
                }
              }}
            >
              Maze
            </Button>
          </div>
        </div>
      </div>

      <div>
        {renderGrid(grid)}
      </div>
    </div>
  );
}

export default App;
