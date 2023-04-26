


const initialBoard = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0, 0]]

const possNumArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const shuffleArray = (numArray) => {
  let copyArr = [...numArray]
  let currIndex = copyArr.length
  let randomIndex

  while(currIndex != 0) {
    randomIndex = Math.floor(Math.random() * currIndex)
    currIndex--

    // swapping values
    [copyArr[currIndex], copyArr[randomIndex]] = [copyArr[randomIndex], copyArr[currIndex]]
  }

  return copyArr
}

const fillBoard = (startingBoard) => {
  const cell = findNextEmptyCell(startingBoard)

  if(cell === false) {
    return startingBoard 
  } 

  for(let num of shuffleArray(possNumArray)) {

    // have some abort function in case code takes too long

    if(checkSafe(startingBoard, cell, num)) {
      startingBoard[cell.rowIndex][cell.collIndex] = num
      if(fillBoard(startingBoard)) {
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
  return checkRow(array, currCell, testNum) &&
    checkColumn(array, currCell, testNum) &&
    checkBox(array, currCell, testNum)
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
		collIndex: null
	}

  boardArr.forEach( (row, rowIndex) => {
    if(nextEmptyCell.collIndex !== null) {
      return
    }
    
    let nextZeroColumn = row.find((col) => col === 0)

    if(nextZeroColumn === undefined) {
      return
    }
    nextEmptyCell.rowIndex = rowIndex
    nextEmptyCell.collIndex = rowIndex.indexOf(nextZeroColumn)
  })

  if(nextEmptyCell.collIndex !== null) {
    return nextEmptyCell
  }
  return false
}


