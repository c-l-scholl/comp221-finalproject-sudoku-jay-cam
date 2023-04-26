import './App.css'
import undoArrow from './undo-arrow.png'

function App() {
  const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  const board = Array(9).fill(rows)

  return (
    <div className="App grid place-items-center">
      <div className="mt-16 grid place-content-center text-2xl">
        Sudoku Solver
      </div>
      <div className="mt-6 w-1/3 border-2 border-black">
        {board.map((row, key) => (
          <div className="row font-bold text-xl text-black grid grid-cols-9 border-black border-b-[1px] [&:nth-child(3)]:border-b-2 [&:nth-child(6)]:border-b-2">
            {row.map((cell, key) => (
              <div className="font-bold aspect-square text-xl text-black grid place-items-center border-r-[1px] border-black [&:nth-child(3)]:border-r-2 [&:nth-child(6)]:border-r-2">
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="w-1/5 mt-8 grid grid-cols-2 justify-items-center text-center">
        <div className="w-24 h-10 border-black border-2 rounded-lg grid place-items-center cursor-pointer hover:shadow-lg hover:bg-purple-100">
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
