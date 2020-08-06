import { sudoku1 } from "./sudokus.js";
console.time("Sudoku1");
solve(sudoku1);
console.timeEnd("Sudoku1");

function solve(oldSudoku) {
	const sudoku = spreadSudoku(oldSudoku);
	if (isSolution(sudoku)) {
		printSolution(sudoku);
	} else {
		for (let i = 0; i < 9; i++) {
			const row = sudoku[i];
			for (let j = 0; j < 9; j++) {
				const value = row[j];
				if (value === 0) {
					for (let z = 1; z <= 9; z++) {
						if (
							!alreadyInArray(z, getRow(i, sudoku)) &&
							!alreadyInArray(z, getColumn(j, sudoku)) &&
							!alreadyInArray(z, getBlock(i, j, sudoku))
						) {
							sudoku[i] = [...row];
							sudoku[i][j] = z;
							solve(sudoku);
						}
					}
				}
				if (row[j] === 0) {
					return;
				}
			}
		}
	}
}

function spreadSudoku(sudoku) {
	const newSudoku = [];
	for (let i = 0; i < 9; i++) {
		const row = sudoku[i];
		newSudoku.push([...row]);
	}
	return newSudoku;
}

function getRow(i, sudoku) {
	return [...sudoku[i]];
}

function getColumn(j, sudoku) {
	return sudoku.map((row) => row[j]);
}

function getBlock(i, j, sudoku) {
	const { i: blocki, j: blockj } = getBlockCoordinates(i, j);
	const block = [];
	for (let x = blocki; x < blocki + 3; x++) {
		for (let y = blockj; y < blockj + 3; y++) {
			block.push(sudoku[x][y]);
		}
	}
	return block;
}

function getBlockCoordinates(i, j) {
	const modi = parseInt(i / 3) * 3;
	const modj = parseInt(j / 3) * 3;

	return {
		i: modi,
		j: modj
	};
}

function alreadyInArray(value, array) {
	const found =
		array.findIndex((pos) => {
			return pos === value;
		}) !== -1;
	return found;
}

function isSolution(sudoku) {
	for (let i = 0; i < 9; i++) {
		const row = sudoku[i];
		for (let j = 0; j < 9; j++) {
			const pos = row[j];
			if (pos === 0) {
				return false;
			}
		}
	}
	return true;
}

function printSolution(sudoku) {
	console.log("---------------------");
	for (let i = 0; i < 9; i++) {
		const row = sudoku[i];
		console.log(row);
	}
	console.log("---------------------");
}
