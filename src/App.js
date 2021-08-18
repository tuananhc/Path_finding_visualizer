import './App.css';
import anime from 'animejs/lib/anime.es.js';
import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { dijkstra, animateDijkstra } from './pathFindingFunctions/dijkstra';
import { createDfsMaze, animateDfsMaze } from './mazeFunctions/randomizedDfsMaze'
import xmark from './assets/close.png'
import arrow from './assets/right-arrow.png'

function App() {

  const blankGrid = createGrid()
  const [grid, setGrid] = useState(createGrid())
  const [isMousePressed, setIsMousePressed] = useState(false)
  const [startingNode, setStartingNode] = useState([Math.floor((window.innerHeight - 200) / 40), Math.floor(window.innerWidth / 80)])
  const [endingNode, setEndingNode] = useState([Math.floor((window.innerHeight - 200) / 40), Math.floor(window.innerWidth * 3 / 80)])
  const [isMovingStart, setIsMovingStart] = useState(false)
  const [isMovingEnd, setIsMovingEnd] = useState(false)

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
        
        style={{ width: 20, height: 20 }}
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
          <div style={{position: 'relative' }}>
            <img src={arrow} style={{width: 18, height: 18, position: 'absolute', border: '1px solid #7DEDFF'}}/>
            <div style={{width: 18, height: 18, position: 'absolute', opactiy: 0}}/>
          </div>
        ) : (
          <>
            {(node.row === endingNode[0] && node.col === endingNode[1]) ? (
              <div style={{ width: 18, height: 18 }}>
                <img src={xmark} style={{width: 18, height: 18, position: 'absolute', border: '1px solid #7DEDFF'}}/>
                <div style={{width: 18, height: 18, position: 'absolute', opactiy: 0}}/>
              </div>
            ) : (
              <>
                {(node.isWall) ? (
                  <div style={{ width: 20, height: 20, backgroundColor: 'black' }} />
                ) : (
                  <div style={{position: 'relative'}}>
                    <div style={{ width: 18, height: 18, border: '1px solid #7DEDFF', position: 'absolute'}}/>
                    <div 
                      className='node'
                      id={"node".concat(Math.floor(window.innerWidth / 20) * node.row + node.col)} 
                      style={{ width: 20, height: 20, position: 'absolute' }}
                    />
                  </div>
                  
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
            animateDijkstra(dijkstra(grid[startingNode[0]][startingNode[1]], endingNode, grid))
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
            setStartingNode([Math.floor((window.innerHeight - 200) / 40), Math.floor(window.innerWidth / 80)])
            setEndingNode([Math.floor((window.innerHeight - 200) / 40), Math.floor(window.innerWidth * 3 / 80)])
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
      </div>

      <div >
        {renderGrid(grid)}
      </div>
    </div>
  );
}

export default App;
