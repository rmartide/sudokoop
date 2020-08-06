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
						if (!alreadyInArray(z, pos.row) && !alreadyInArray(z, pos.column) && !alreadyInArray(z, pos.block)) {
							pos.value = z;
							solve(sudoku);
						}
					}
				}
			}
		}
		console.log('nop');
	}
}

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
			pos.row = getRow(pos, sudoku);
			pos.column = getColumn(pos, sudoku);
			pos.block = getBlock(pos, sudoku);
		}
	}
}

function spreadSudoku(sudoku) {
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
}

function getRow({ i }, sudoku) {
	return sudoku[i];
}

function getColumn({ j }, sudoku) {
	return sudoku.map((row) => row[j]);
}

function getBlock({ i, j }, sudoku) {
	const { i: blocki, j: blockj } = getBlockCoordinates(i, j);
	const block = [];
	for (let x = blocki; x < blocki + 3; x++) {
		for (let y = blockj; y < blockj + 3; y++) {
			block.push(sudoku[i][j]);
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
	return array.findIndex(pos => pos.value === value) !== -1;
}

function isSolution(sudoku) {
	for (let i = 0; i < sudoku[i].length; i++) {
		const row = sudoku[i];
		for (let j = 0; j < row.length; j++) {
			const pos = row[j];
			if (pos.value === 0) return false;
		}
	}
	return true;
}
