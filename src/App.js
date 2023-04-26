import React, { useState, useEffect } from 'react'
import './App.css'
import undoArrow from './undo-arrow.png'

function App() {
  const rowLayout = new Array(9).fill(0)
  const boardLayout = new Array(9).fill(rowLayout)
  const [board, setBoard] = useState([...boardLayout])
  const puzzles = require('./puzzles.json')

  // Get a random sudoku puzzle by randomize an index to get a string of 81 characters
  const getRandomPuzzle = () => {
    const index = Math.floor(Math.random() * puzzles.length)
    const puzzle = puzzles[index].puzzleString
    let res = Array.from(Array(9), () => new Array(9).fill(0))
    for (let i = 0; i < rowLayout.length; i++) {
      // Separate the string of characters into rows
      let row = puzzle.slice(9 * i, 9 * (i + 1))
      for (let j = 0; j < rowLayout.length; j++) {
        // Set cell values
        res[i][j] = row[j]
      }
    }
    setBoard(res)
  }

  // Generate a random sudoku puzzle as the page loads
  useEffect(() => {
    getRandomPuzzle()
  }, [])

  return (
    <div className="App grid place-items-center">
      <div className="mt-16 grid place-content-center text-2xl">
        Sudoku Solver
      </div>
      <div className="mt-6 w-1/3 border-2 border-black">
        {board &&
          board.map((row, key) => (
            <div className="row font-bold text-xl text-black grid grid-cols-9 border-black border-b-[1px] [&:nth-child(3)]:border-b-2 [&:nth-child(6)]:border-b-2">
              {row.map((cell, key) => (
                <div className="font-bold aspect-square text-xl text-black grid place-items-center border-r-[1px] border-black [&:nth-child(3)]:border-r-2 [&:nth-child(6)]:border-r-2">
                  {cell != 0 && cell}
                </div>
              ))}
            </div>
          ))}
      </div>
      <div className="w-1/5 mt-8 grid grid-cols-2 justify-items-center text-center">
        <div
          className="w-24 h-10 border-black border-2 rounded-lg grid place-items-center cursor-pointer hover:shadow-lg hover:bg-purple-100"
          onClick={getRandomPuzzle}
        >
          <img src={undoArrow} className="w-5" />
        </div>
        <div className="w-24 h-10 border-black border-2 rounded-lg text-center grid place-items-center cursor-pointer hover:shadow-lg hover:bg-purple-100">
          Solve
        </div>
      </div>
    </div>
  )
}

export default App
