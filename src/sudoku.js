// currCell should be empty
// if testNum doesn't exist in the row, index will be -1

const checkRow = (array, currCell, testNum) => {
	return array[currCell.rowIndex].indexOf(testNum) === -1;
};

// currCell should be empty
// checking testNum doesn't exist in the column
const checkColumn = (array, currCell, testNum) => {
	return !array.some(row => row[currCell.collIndex] === testNum);
};

const checkBox = (array, currCell, testNum) => {
	const boxRow = currCell.rowIndex % 3;
	const boxCol = currCell.collIndex % 3;

	for(let i = 0; i < )
};