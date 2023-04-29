import React, { useState, useEffect } from 'react'
import undoArrow from './undo-arrow.png'
import { getRandomPuzzle, solveBoard } from './sudoku.js'

function App() {
  const rowLayout = new Array(9).fill(0)
  const boardLayout = new Array(9).fill(rowLayout)
  const [board, setBoard] = useState([...boardLayout])
  const [solved, setSolved] = useState(false)
  const puzzles = require('./puzzles.json')

  const setBoardWithRandomPuzzle = () => {
    let randomPuzzle = getRandomPuzzle(puzzles)
    setBoard(randomPuzzle)
  }

  const handleSolveBoard = () => {
    let solvedBoard = solveBoard(board)
    console.log(solvedBoard)
    setBoard(solvedBoard)
  }

  // Generate a random sudoku puzzle as the page loads
  useEffect(() => {
    setBoardWithRandomPuzzle()
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
                <div
                  className={`font-bold aspect-square text-xl text-black grid place-items-center border-r-[1px] border-black [&:nth-child(3)]:border-r-2 [&:nth-child(6)]:border-r-2 ${
                    (cell == 0 && solved) == 'bg-black'
                  }`}
                >
                  {cell !== 0 && cell}
                </div>
              ))}
            </div>
          ))}
      </div>
      <div className="w-1/5 mt-8 grid grid-cols-2 justify-items-center text-center">
        <div
          className="w-24 h-10 border-black border-2 rounded-lg grid place-items-center cursor-pointer hover:shadow-lg hover:bg-purple-100"
          onClick={setBoardWithRandomPuzzle}
        >
          <img src={undoArrow} className="w-5" />
        </div>
        <div
          className="w-24 h-10 border-black border-2 rounded-lg text-center grid place-items-center cursor-pointer hover:shadow-lg hover:bg-purple-100"
          onClick={handleSolveBoard}
        >
          Solve
        </div>
        <div
          className="cursor-pointer"
          onClick={() => console.log(board)}
        ></div>
      </div>
    </div>
  )
}

export default App
