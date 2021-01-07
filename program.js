let cavasSize = 450;
let cellSize = 10;
let cellsPerLine = cavasSize / cellSize;
let grid = makeArray(cellsPerLine, cellsPerLine, 0);
const neighbors = [[1,0], [1,1], [0,1], [-1,1], [-1,0], [-1,-1], [0,-1], [1,-1]];
let mapGeneratorButton;
let gameStartButton;


function setup() {
	createCanvas(cavasSize, cavasSize);
	mapGeneratorButton = createButton("Click to generate random map");
	gameStartButton = createButton("Next Generation");
}

function draw() {
	background(200);
	displayGrid(width, height, cellSize);
	mapGeneratorButton.mouseClicked(populateGrid);
	gameStartButton.mouseClicked(calculateNextGen);
}

function calculateNextGen() {
	let newGrid = makeArray(cellsPerLine, cellsPerLine, -1);
	for (let i = 0; i < cellsPerLine; i++) {
		for (let j = 0; j < cellsPerLine; j++) {

			//count neighbors
			let validNeighborsNum = getValidNeighbors(i, j);

			if (grid[i][j] == 1) {
				if (validNeighborsNum <= 1 || validNeighborsNum > 3) {
					newGrid[i][j] = 0;
				}
				
			} else if (grid[i][j] == 0) {
				if (validNeighborsNum == 3) {
					newGrid[i][j] = 1;
                }
            }
		}
	}


	for (let i = 0; i < cellsPerLine; i++) {
		for (let j = 0; j < cellsPerLine; j++) {
			if (newGrid[i][j] == -1) {
				newGrid[i][j] = grid[i][j];
            }
		}
	}

	grid = newGrid;
}

function getValidNeighbors(xPos, yPos) {
	let neighborsNum = 0;
	for (let i = 0; i < neighbors.length; i++) {
		let addX = neighbors[i][0];
		let addY = neighbors[i][1];

		let neighborX = xPos + addX;
		let neighborY = yPos + addY;

		if (neighborX >= 0 && neighborX < cellsPerLine && neighborY >= 0 && neighborY < cellsPerLine) {
			if (grid[neighborX][neighborY] == 1) {
				neighborsNum++;
			}
        }
	}
	return neighborsNum;
}

function populateGrid() {
	for (let i = 0; i < 50; i++) {
		let randomRow = floor(random(cellsPerLine));
		let randomColumn = floor(random(cellsPerLine));
		grid[randomRow][randomColumn] = 1;
	}
}

function makeArray(w, h, val) {
	let arr = [];
	for (let i = 0; i < h; i++) {
		arr[i] = [];
		for (let j = 0; j < w; j++) {
			arr[i][j] = val;
		}
	}
	return arr;
}

function displayGrid(x, y, cellSize) {
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid.length; j++) {
			if (grid[i][j] == 1) {
				fill(0);
			} else if (grid[i][j] == 0) {
				fill(255);
			}
			rect(i * cellSize, j * cellSize, cellSize, cellSize);
		}
	}
}

