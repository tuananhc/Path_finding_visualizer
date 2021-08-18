import './App.css';
import anime from 'animejs/lib/anime.es.js';
import React, { useState, useEffect } from 'react';
import { Button, Select, MenuItem } from '@material-ui/core';
import { bfsSearch, animateBfsSearch } from './pathFindingFunctions/bfsSearch';
import { createDfsMaze, animateDfsMaze } from './mazeFunctions/randomizedDfsMaze'
import xmark from './assets/close.png'
import arrow from './assets/right-arrow.png'

function App() {

  const blankGrid = createGrid()
  const [grid, setGrid] = useState(createGrid())
  const [isMousePressed, setIsMousePressed] = useState(false)
  const [startingNode, setStartingNode] = useState([Math.floor((window.innerHeight - 200) / 30), Math.floor(window.innerWidth / 60)])
  const [endingNode, setEndingNode] = useState([Math.floor((window.innerHeight - 200) / 30), Math.floor(window.innerWidth * 3 / 60)])
  const [isMovingStart, setIsMovingStart] = useState(false)
  const [isMovingEnd, setIsMovingEnd] = useState(false)
  const [mazeSize, setMazeSize] = useState('medium')
  const [mode, setMode] = useState('automatic')
  const [nodeSize, setNodeSize] = useState(20)

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

  function createGrid() {
    var grids = []
    for (var i = 0; i < Math.floor((window.innerHeight - 200) / 15); i++) {
      var row = []
      for (var j = 0; j < Math.floor(window.innerWidth / 15); j++) {
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
        style={{ width: 15, height: 15 }}
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
          <div id={"node".concat(Math.floor(window.innerWidth / 15) * node.row + node.col)} style={{ width: 13, height: 13 }}>
            <img src={arrow} style={{ width: 13, height: 13, position: 'absolute', border: '1px solid #7DEDFF' }} draggable={false} />
          </div>
        ) : (
          <>
            {(node.row === endingNode[0] && node.col === endingNode[1]) ? (
              <div id={"node".concat(Math.floor(window.innerWidth / 15) * node.row + node.col)} style={{ width: 13, height: 13 }}>
                <img src={xmark} style={{ width: 13, height: 13, position: 'absolute', border: '1px solid #7DEDFF' }} draggable={false} />
              </div>
            ) : (
              <>
                {(node.isWall) ? (
                  <div
                    className='node'
                    id={"node".concat(Math.floor(window.innerWidth / 15) * node.row + node.col)} style={{ width: 15, height: 15, backgroundColor: 'black' }} />
                ) : (
                    <div
                      className='node'
                      id={"node".concat(Math.floor(window.innerWidth / 15) * node.row + node.col)}
                      style={{ width: 15, height: 15 }}
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
            animateBfsSearch(bfsSearch(grid[startingNode[0]][startingNode[1]], endingNode, grid))
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
            setStartingNode([Math.floor((window.innerHeight - 200) / 30), Math.floor(window.innerWidth / 60)])
            setEndingNode([Math.floor((window.innerHeight - 200) / 30), Math.floor(window.innerWidth * 3 / 60)])
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
            animateDfsMaze(createDfsMaze(grid, setGrid), grid, setGrid)
          }}
        >
          Maze
        </Button>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <div style={{ margin: '10px 20px'}}>
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
          
          <div style={{ margin: '10px 20px'}}>
            <p>Search algorithm</p>
            <Select
              value={mazeSize}
              onChange={(event) => {console.log(event.target.value)}}
            >
              <MenuItem value={'small'}>Small</MenuItem>
              <MenuItem value={'medium'}>Medium</MenuItem>
              <MenuItem value={'big'}>Big</MenuItem>
            </Select>
          </div>

          <div style={{ margin: '10px 20px'}}>
            <p>Maze generating algorithm</p>
            <Select
              value={mazeSize}
              onChange={(event) => {console.log(event.target.value)}}
            >
              <MenuItem value={'small'}>Small</MenuItem>
              <MenuItem value={'medium'}>Medium</MenuItem>
              <MenuItem value={'big'}>Big</MenuItem>
            </Select>
          </div>

          <div style={{ margin: '10px 20px'}}>
            <p>Show grid</p>
            <Select
              value={mazeSize}
              onChange={(event) => {console.log(event.target.value)}}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </div>

          <div style={{ margin: '10px 20px'}}>
            <p>Maze style</p>
            <Select
              value={mazeSize}
              onChange={(event) => {console.log(event.target.value)}}
            >
              <MenuItem value={true}>Black & White</MenuItem>
              <MenuItem value={false}>Color</MenuItem>
            </Select>
          </div>

          <div style={{ margin: '10px 20px'}}>
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
