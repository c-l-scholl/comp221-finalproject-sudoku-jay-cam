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
      res[i][j] = row[j]
    }
  }
  return res
}

const possNumArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const shuffleArray = (numArray) => {
  let copyArr = [...numArray]
  let currIndex = copyArr.length
  let randomIndex

  while (currIndex != 0) {
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

const solveBoard = (startingBoard) => {
  const cell = findNextEmptyCell(startingBoard)

  if (cell === false) {
    return startingBoard
  }

  for (let num of shuffleArray(possNumArray)) {
    // have some abort function in case code takes too long

    if (checkSafe(startingBoard, cell, num)) {
      startingBoard[cell.rowIndex][cell.collIndex] = num
      if (solveBoard(startingBoard)) {
        return startingBoard
      } else {
        startingBoard[cell.rowIndex][cell.collIndex] = 0
      }
    }
    return false
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

const checkRow = (array, currCell, testNum) => {
  return array[currCell.rowIndex].indexOf(testNum) === -1
}

// currCell should be empty
// checking testNum doesn't exist in the column
const checkColumn = (array, currCell, testNum) => {
  return !array.some((row) => row[currCell.collIndex] === testNum)
}

const checkBox = (array, currCell, testNum) => {
  const boxRow = currCell.rowIndex % 3
  const boxCol = currCell.collIndex % 3
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (array[boxRow + i][boxCol + j] === testNum) return false
    }
  }
  return true
}

const findNextEmptyCell = (boardArr) => {
  let nextEmptyCell = {
    rowIndex: null,
    collIndex: null,
  }

  boardArr.forEach((row, rowIndex) => {
    if (nextEmptyCell.collIndex !== null) {
      return
    }

    let nextZeroColumn = row.find((col) => col === 0)

    if (nextZeroColumn === undefined) {
      return
    }
    nextEmptyCell.rowIndex = rowIndex
    nextEmptyCell.collIndex = rowIndex.indexOf(nextZeroColumn)
  })

  if (nextEmptyCell.collIndex !== null) {
    return nextEmptyCell
  }
  return false
}

export default getRandomPuzzle
