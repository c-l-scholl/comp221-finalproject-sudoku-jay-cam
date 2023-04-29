// Jay Tran and Camden Scholl
// 4/29/2023
// The program takes a random puzzle that has a guaranteed solution 
// and solves it using backtracking. Each empty cell is tested to see
// which value fits, and if it reaches a point where no value works,
// it backtracks to previous cells to retry

// Get a random sudoku puzzle by randomize an index to get a string of 81 characters
export const getRandomPuzzle = (puzzles) => {
  const index = Math.floor(Math.random() * puzzles.length)
  const puzzle = puzzles[index].puzzleString
  let res = Array.from(Array(9), () => new Array(9).fill(0))
  for (let i = 0; i < 9; i++) {
    // Separate the string of characters into rows
    let row = puzzle.slice(9 * i, 9 * (i + 1))
    for (let j = 0; j < 9; j++) {
      // Set cell values, whether the cell is solved
      // if cell is solved, it gets colored
      res[i][j] = [parseInt(row[j]), false]
    }
  }
  return res
}

// shuffles the array to randomize next tested number
const shuffleArray = () => {
  let numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  let currIndex = numArray.length
  let randomIndex

  while (currIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currIndex)
    currIndex--

    // swapping values
    [numArray[currIndex], numArray[randomIndex]] = [
      numArray[randomIndex],
      numArray[currIndex],
    ]
  }
  return numArray
}

// Solve the board

export const solveBoard = (startingBoard) => {
  const puzzle = [...startingBoard]
  const cell = findNextEmptyCell(puzzle)

  // no empty cells left, so we are done
  if (!cell) {
    return puzzle
  }

  for (let num of shuffleArray()) {

    // if num can go in cell, place num, label as part of solution
    if (checkSafe(puzzle, cell, num)) {
      puzzle[cell.rowIndex][cell.colIndex] = [num, true]

      // try filling in next cell
      // if fails, backtrack and set cell value to zero
      if (solveBoard(puzzle)) {
        return puzzle
      } else {
        puzzle[cell.rowIndex][cell.colIndex] = [0, false]
      }
    }
  }
}

// iterate through the board to find next cell 
// with no value

const findNextEmptyCell = (boardArr) => {
  let nextEmptyCell = {
    rowIndex: -1,
    colIndex: -1,
  }

  // this is a little slow, since we can't break out,
  // but is still pretty fast since n < 100

  boardArr.forEach((row, rowIndex) => {
    if (nextEmptyCell.colIndex !== -1) {
      return // next iteration of forEach
    }
    let nextZeroColumn = row.findIndex((col) => col[0] === 0)
    if (nextZeroColumn === undefined) {
      return // next iteration of forEach
    }
    nextEmptyCell.rowIndex = rowIndex
    nextEmptyCell.colIndex = nextZeroColumn
  })

  if (nextEmptyCell.colIndex !== -1) {
    return nextEmptyCell
  }

  // didn't find empty cell
  return false
}

// check all safety methods

const checkSafe = (array, currCell, testNum) => {
  return (
    checkRow(array, currCell, testNum) &&
    checkColumn(array, currCell, testNum) &&
    checkBox(array, currCell, testNum)
  )
}

// if any cell in same row as currCell has a value of testNum,
// then it is not safe to place 

const checkRow = (array, currCell, testNum) => {
  return !array[currCell.rowIndex].some((cell) => cell[0] === testNum)
  
}

// if any cell in same column as currCell has a value of testNum,
// then it is not safe to place 

const checkColumn = (array, currCell, testNum) => {
  return !array.some((row) => row[currCell.colIndex][0] === testNum)
}

// check the 3x3 box that currCell is in
// if any cell has a value of testNum, return false

const checkBox = (array, currCell, testNum) => {
  const boxRow = currCell.rowIndex - (currCell.rowIndex % 3)
  const boxCol = currCell.colIndex - (currCell.colIndex % 3)
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (array[boxRow + i][boxCol + j][0] === testNum) return false
    }
  }
  return true
}
