import './App.css';
import anime from 'animejs/lib/anime.es.js';
import React, { useState, useEffect } from 'react';
import { Button, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import Modal from 'react-modal'
import { bfsSearch } from './pathFindingFunctions/bfsSearch';
import { dfsSearch } from './pathFindingFunctions/dfsSearch';
import { dijkstraSearch } from './pathFindingFunctions/dijkstra';
import { aStarSearch } from './pathFindingFunctions/astar'
import { createBfsMaze, animateBfsMaze } from './mazeFunctions/randomizedBfsMaze'
import { createDfsMaze, animateDfsMaze } from './mazeFunctions/randomizedDfsMaze'
import { createPrimsMaze, animatePrimsMaze } from './mazeFunctions/primsMaze'
import xmark from './assets/close.png'
import arrow from './assets/right-arrow.png'
import info from './assets/info.png'
import description from './descriptions.json'

function App() {

  const [isMousePressed, setIsMousePressed] = useState(false)
  const [isMovingStart, setIsMovingStart] = useState(false)
  const [isMovingEnd, setIsMovingEnd] = useState(false)
  const [mazeSize, setMazeSize] = useState('medium')
  const [isAutomatic, setIsAutomatic] = useState(true)
  const [nodeSize, setNodeSize] = useState(20)
  const blankGrid = createGrid()
  const [startingNode, setStartingNode] = useState([1, 1])
  const [endingNode, setEndingNode] = useState([blankGrid.length - 2, blankGrid[0].length - 2])
  const [grid, setGrid] = useState(createGrid())
  const [isGrid, setIsGrid] = useState(true)
  const [isBlackWhite, setIsBlackWhite] = useState(false)
  const [searchAlgorithm, setSearchAlgorithm] = useState('bfsSearch')
  const [mazeAlgorithm, setMazeAlgorithm] = useState('bfsMaze')
  const [speed, setSpeed] = useState(5)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalContent, setModalContent] = useState('')
  const [rootPlacement, setRootPlacement] = useState('start')

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
    if (mazeSize === 'small') {
      setNodeSize(window.innerWidth / 75)
      setSpeed(5)
    } else if (mazeSize === 'medium') {
      setNodeSize(window.innerWidth / 100)
      setSpeed(5)
    } else if (mazeSize === 'big') {
      setNodeSize(window.innerWidth / 150)
      setSpeed(3)
    }
  }, [mazeSize])

  useEffect(() => {
    setGrid(blankGrid)
    if (rootPlacement === 'start') {
      setStartingNode([1, 1])
      setEndingNode([blankGrid.length - 2, blankGrid[0].length - 2])
    } else if (rootPlacement === 'center') {
      setStartingNode([Math.floor(blankGrid.length / 2), Math.floor(blankGrid[0].length / 2)])
      setEndingNode([blankGrid.length - 2, blankGrid[0].length - 2])
    } else if (rootPlacement === 'random') {
      setStartingNode([Math.floor(Math.random() * grid.length), Math.floor(Math.random() * grid[0].length)])
      setEndingNode([Math.floor(Math.random() * grid.length), Math.floor(Math.random() * grid[0].length)])
    }
    if (!isAutomatic) {
      setStartingNode([Math.floor((window.innerHeight - 200) / nodeSize / 2), Math.floor(window.innerWidth / nodeSize / 4)])
      setEndingNode([Math.floor((window.innerHeight - 200) / nodeSize / 2), Math.floor(window.innerWidth / nodeSize * 3 / 4)])
      setIsBlackWhite(true)
    }
  }, [nodeSize, isAutomatic, rootPlacement])

  useEffect(() => {
    if (grid.length > 0) {

    }
  }, [rootPlacement, grid])

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
          if (!isAutomatic) {
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
          }
        }}
        onMouseEnter={() => {
          if (!isAutomatic) {
            if (isMovingStart) {
              if ((node.row === endingNode[0] && node.col === endingNode[1]) || node.isWall) { return }
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
          }
        }}
        onMouseUp={() => {
          if (!isAutomatic) {
            if (isMovingStart) {
              setIsMovingStart(false)
            }
            if (isMovingEnd) {
              setIsMovingEnd(false)
            }
            if (isMousePressed) {
              setIsMousePressed(false)
            }
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
                <img
                  src={xmark} style={{ width: nodeSize - 1, heigth: nodeSize - 1, objectFit: 'fill' }}
                  draggable={false}
                />
              </div>
            ) : (
              <>
                {(!node.isWall) ? (
                  <div
                    className='node'
                    id={"node".concat(Math.floor(window.innerWidth / nodeSize) * node.row + node.col)}
                    style={styles.node}
                  />
                ) : (
                  <div
                    className='node'
                    id={"node".concat(Math.floor(window.innerWidth / nodeSize) * node.row + node.col)}
                    style={styles.wall} />
                )}
              </>
            )}
          </>
        )
        }
      </div>
    )
  }

  return (
    <div style={{ height: window.innerHeight, overflow: 'hidden' }}>
      <Modal
        isOpen={modalVisible}
        style={{
          overlay: {
            backgroundColor: ''
          },
          content: {
            top: '25%',
            left: '50%',
            width: '30%',
            maxHeight: '25%',
            transform: 'translate(-50%, -50%)',
          }
        }}
        onRequestClose={() => setModalVisible(false)}
      >
        <h3>{modalContent.name}</h3>
        <p>{modalContent.description}</p>
      </Modal>
      <div style={{ height: 200, backgroundColor: 'lightgray', overflowX: 'auto', }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <div style={{ margin: 30 }}>
            <FormControl variant='outlined'>
              <InputLabel>Maze size</InputLabel>
              <Select
                value={mazeSize}
                onChange={(event) => setMazeSize(event.target.value)}
              >
                <MenuItem value={'small'}>Small</MenuItem>
                <MenuItem value={'medium'}>Medium</MenuItem>
                <MenuItem value={'big'}>Big</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div style={{ margin: 30, width: 200 }}>
            <FormControl variant='outlined'>
              <InputLabel>Search algorithm</InputLabel>
              <Select
                value={searchAlgorithm}
                onChange={(event) => setSearchAlgorithm(event.target.value)
                }
              >
                <MenuItem value={'bfsSearch'}>Breadth First Search</MenuItem>
                <MenuItem value={'dfsSearch'}>Depth First Search</MenuItem>
                <MenuItem value={'dijkstraSearch'}>Dijkstra Search Algorithm</MenuItem>
                <MenuItem value={'aStarSearch'}>A Star Algorithm (A*)</MenuItem>
              </Select>
            </FormControl>
          </div>
          <img src={info} style={{ width: 15, height: 15, marginLeft: -15 }}
            onClick={() => {
              if (searchAlgorithm === 'bfsSearch') {
                setModalContent(description.bfsSearch)
              } else if (searchAlgorithm === 'dfsSearch') {
                setModalContent(description.dfsSearch)
              } else if (searchAlgorithm === 'dijkstraSearch') {
                setModalContent(description.dijkstraSearch)
              } else if (searchAlgorithm === 'aStarSearch') {
                setModalContent(description.aStarSearch)
              }
              setModalVisible(!modalVisible)
            }}
          />

          <div style={{ margin: 30 }}>
            <FormControl variant='outlined' styles={{ minWidth: 120, margin: 20 }}>
              <InputLabel>Maze generating algorithm</InputLabel>
              <Select
                value={mazeAlgorithm}
                onChange={(event) => setMazeAlgorithm(event.target.value)}
              >
                <MenuItem value={'bfsMaze'}>Randomized Breadth First Maze</MenuItem>
                <MenuItem value={'dfsMaze'}>Randomized Depth First Maze</MenuItem>
                <MenuItem value={'primsMaze'}>Prim's Maze</MenuItem>
              </Select>
            </FormControl>
          </div>
          <img
            src={info}
            style={{ width: 15, height: 15, marginLeft: -15 }}
            onClick={() => {
              if (mazeAlgorithm === 'bfsMaze') {
                setModalContent(description.bfsMaze)
              } else if (mazeAlgorithm === 'dfsMaze') {
                setModalContent(description.dfsMaze)
              } else if (mazeAlgorithm === 'primsMaze') {
                setModalContent(description.PrimsMaze)
              }
              setModalVisible(!modalVisible)
            }}
          />

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
                value={isAutomatic}
                onChange={(event) => setIsAutomatic(event.target.value)}
              >
                <MenuItem value={true}>Automatic</MenuItem>
                <MenuItem value={false}>Manual</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div style={{ margin: 30 }}>
            <FormControl variant='outlined' styles={{ minWidth: 120, margin: 20 }}>
              <InputLabel>Start & End placement</InputLabel>
              <Select
                value={rootPlacement}
                onChange={(event) => setRootPlacement(event.target.value)}
              >
                <MenuItem value={'start'}>Opposite corners</MenuItem>
                <MenuItem value={'center'}>Center & corner</MenuItem>
                <MenuItem value={'random'}>Random</MenuItem>
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
                if (searchAlgorithm === 'bfsSearch') {
                  bfsSearch(grid[startingNode[0]][startingNode[1]], endingNode, grid, isBlackWhite, speed)
                } else if (searchAlgorithm === 'dfsSearch') {
                  dfsSearch(grid[startingNode[0]][startingNode[1]], endingNode, grid, isBlackWhite, speed)
                } else if (searchAlgorithm === 'dijkstraSearch') {
                  dijkstraSearch(grid[startingNode[0]][startingNode[1]], endingNode, grid, isBlackWhite, speed)
                } else if (searchAlgorithm === 'aStarSearch') {
                  aStarSearch(grid[startingNode[0]][startingNode[1]], endingNode, grid, isBlackWhite, speed)
                }
              }}
            >
              Start
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ width: 100, margin: '20px 40px' }}
              disabled={!isAutomatic}
              onClick={() => {
                var path
                if (mazeAlgorithm === 'bfsMaze') {
                  path = createBfsMaze(grid[startingNode[0]][startingNode[1]], grid, setGrid, isBlackWhite)
                  animateBfsMaze(path, grid, isBlackWhite, speed)
                } else if (mazeAlgorithm === 'dfsMaze') {
                  path = createDfsMaze(grid[startingNode[0]][startingNode[1]], grid, setGrid, isBlackWhite)
                  animateDfsMaze(path, grid, isBlackWhite, speed)
                } else if (mazeAlgorithm === 'primsMaze') {
                  path = createPrimsMaze(grid[startingNode[0]][startingNode[1]], grid, setGrid, isBlackWhite)
                  animatePrimsMaze(path, grid, isBlackWhite, speed)
                }
                setTimeout(() => {
                  if (grid[endingNode[0]][endingNode[1]].isWall) {
                    if (!grid[endingNode[0] + 1][endingNode[1]].isWall) {
                      setEndingNode([endingNode[0] + 1, endingNode[1]])
                    } else if (!grid[endingNode[0]][endingNode[1] + 1].isWall) {
                      setEndingNode([endingNode[0], endingNode[1] + 1])
                    } else if (!grid[endingNode[0] - 1][endingNode[1]].isWall) {
                      setEndingNode([endingNode[0] - 1, endingNode[1]])
                    } else if (!grid[endingNode[0]][endingNode[1] - 1].isWall) {
                      setEndingNode([endingNode[0], endingNode[1] - 1])
                    } else if (!grid[endingNode[0] - 1][endingNode[1] - 1].isWall) {
                      setEndingNode([endingNode[0] - 1, endingNode[1] - 1])
                    }
                  }
                }, path.length * speed + 1500)
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
