import { sudoku1 } from "./sudokus.js";

console.log(sudoku1);

const convertedSudoku1 = convertSudoku(sudoku1);

solve(convertedSudoku1);

function solve(oldSudoku) {
	const sudoku = spreadSudoku(oldSudoku);
	if (isSolution(sudoku)) {
		console.log(sudoku);
	} else {
		for (let i = 0; i < sudoku[i].length; i++) {
			const row = sudoku[i];
			for (let j = 0; j < row.length; j++) {
				const pos = row[j];
				if (pos.value === 0) {
					for (let z = 1; z <= 9; z++) {
						if (!alreadyInRow(z, pos) && !alreadyInColumn(z, pos) && !alreadyInBlock(z, pos)) {
							pos.value = z;
							solve(sudoku);
						}
					}
				}
			}
		}
	}
};

function convertSudoku(sudoku) {
	for (let i = 0; i < sudoku[i].length; i++) {
		const row = sudoku[i];
		for (let j = 0; j < row.length; j++) {
			const value = row[j];
			row[j] = {
				value,
				i,
				j
			};
		}
	}
	for (let i = 0; i < sudoku[i].length; i++) {
		const row = sudoku[i];
		for (let j = 0; j < row.length; j++) {
			const pos = row[j];
		}
	}
};

const spreadSudoku = (sudoku) => {
	const newSudoku = [];
	for (let i = 0; i < sudoku[i].length; i++) {
		const newRow = [];
		const row = sudoku[i];
		for (let j = 0; j < row.length; j++) {
			const pos = row[j];
			newRow.push({ ...pos });
		}
		newSudoku.push(newRow);
	}
	return newSudoku;
};

const getRow = (pos, sudoku) => {};

const getColumn = (pos, sudoku) => {};

const getBlock = (pos, sudoku) => {};

const alreadyInRow = (n, pos) => {};

const alreadyInColumn = (n, pos) => {};

const alreadyInBlock = (n, pos) => {};

const isSolution = (sudoku) => {
	for (let i = 0; i < sudoku[i].length; i++) {
		const row = sudoku[i];
		for (let j = 0; j < row.length; j++) {
			const pos = row[j];
			if (pos.value === 0) return false;
		}
	}
	return true;
};
