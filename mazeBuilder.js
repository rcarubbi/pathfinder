import CellTypes from './cellTypes.js';
export default class MazeBuilder {

    constructor(width, height, cellSize) {
        this.cellSize = cellSize;
        this.height = height;
        this.width = width;
    }

    build(dificultyFactor) {
        const maze = this.clearMaze();
        const start = this.getRandomPoint(); //  { x: 0, y: 0 }
        const end = this.getRandomPoint(); //  { x: this.width / this.cellSize - 1, y: this.height / this.cellSize - 1 }  
        maze[start.y][start.x] = CellTypes.Start;
        maze[end.y][end.x] = CellTypes.End;
        this.buildRandomWalls({ maze, start, end }, dificultyFactor);
        return { maze, start, end };
    }

    clearMaze() {
        const maze = [];
        for (let i = 0; i < this.height / this.cellSize; i++) {
            let row = [];
            for (let j = 0; j < this.width / this.cellSize; j++) {
                row.push(CellTypes.Empty);
            }
            maze.push(row);
        }
        return maze;
    }

    getRandomPoint() {
        return {
            x: this.getRandomX(),
            y: this.getRandomY()
        }
    }

    getRandomX() {
        return Math.floor(Math.random() * (this.width / this.cellSize));
    }

    getRandomY() {
        return Math.floor(Math.random() * (this.height / this.cellSize));
    }

    buildRandomWalls(state, dificultyFactor) {

        for (let i = 0; i < this.height / this.cellSize; i++) {
            for (let j = 0; j < this.width / this.cellSize; j++) {
                if (state.maze[i][j] === CellTypes.Empty) {
                    let random = Math.floor(Math.random() * dificultyFactor);
                    if (random === 0) {

                        state.maze[i][j] = CellTypes.Wall;

                    }
                }
            }
        }

    }
}