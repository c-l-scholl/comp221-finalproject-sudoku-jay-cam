// Get a random sudoku puzzle by randomize an index to get a string of 81 characters
export const getRandomPuzzle = (puzzles) => {
  const index = Math.floor(Math.random() * puzzles.length)
  const puzzle = puzzles[index].puzzleString
  let res = Array.from(Array(9), () => new Array(9).fill(0))
  for (let i = 0; i < 9; i++) {
    // Separate the string of characters into rows
    let row = puzzle.slice(9 * i, 9 * (i + 1))
    for (let j = 0; j < 9; j++) {
      // Set cell values
      res[i][j] = [parseInt(row[j]), false]
    }
  }
  return res
}

const possNumArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const shuffleArray = (numArray) => {
  let copyArr = [...numArray]
  let currIndex = copyArr.length
  let randomIndex

  while (currIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currIndex)
    currIndex--

    // swapping values
    ;[copyArr[currIndex], copyArr[randomIndex]] = [
      copyArr[randomIndex],
      copyArr[currIndex],
    ]
  }

  return copyArr
}

let counter = 0

export const solveBoard = (startingBoard) => {
  const puzzle = [...startingBoard]
  const cell = findNextEmptyCell(puzzle)

  // if cell is not empty, then we are done
  if (!cell) {
    return puzzle
  }
  let num
  let testNumArray = shuffleArray(possNumArray)
  for (num of testNumArray) {
    // have some abort function in case code takes too long
    counter++
    if (counter >= 20000000) {
      throw new Error('Took too long to solve')
    }
    if (checkSafe(puzzle, cell, num)) {
      puzzle[cell.rowIndex][cell.colIndex] = [num, true]
      console.log(
        'set box ' + cell.rowIndex + ' by ' + cell.colIndex + ' to ' + num,
      )
      if (solveBoard(puzzle)) {
        return puzzle
      } else {
        puzzle[cell.rowIndex][cell.colIndex] = [0, false]
      }
    }
  }
}

// check all safety methods

const checkSafe = (array, currCell, testNum) => {
  return (
    checkRow(array, currCell, testNum) &&
    checkColumn(array, currCell, testNum) &&
    checkBox(array, currCell, testNum)
  )
}

// currCell should be empty
// if testNum doesn't exist in the row, index will be -1

// Make a map/loop or something to loop through each object and find the value to see if it exists
const checkRow = (array, currCell, testNum) => {
  // array[currCell.rowIndex].map((cell) => {
  //   if (cell.value === testNum) return false
  // })
  return !array[currCell.rowIndex].some((cell) => cell[0] === testNum)
  //return true
}

// currCell should be empty
// checking testNum doesn't exist in the column
const checkColumn = (array, currCell, testNum) => {
  return !array.some((row) => row[currCell.colIndex][0] === testNum)
}

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

const findNextEmptyCell = (boardArr) => {
  let nextEmptyCell = {
    rowIndex: -1,
    colIndex: -1,
  }
  console.log('findNextEmptyCell is running')

  boardArr.forEach((row, rowIndex) => {
    if (nextEmptyCell.colIndex !== -1) {
      return // next iteration of forEach
    }

    let nextZeroColumn = row.findIndex((col) => col[0] === 0)
    console.log('nextZeroColumn: ' + nextZeroColumn)
    if (nextZeroColumn === undefined) {
      return
    }
    nextEmptyCell.rowIndex = rowIndex
    nextEmptyCell.colIndex = nextZeroColumn
  })

  if (nextEmptyCell.colIndex !== -1) {
    return nextEmptyCell
  }
  return false
}

const functions = { getRandomPuzzle, solveBoard }
export default functions
