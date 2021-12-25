import CellTypes from "./cellTypes.js";
export default class MazeRenderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.cellSize = 20;
    }

    draw(state) {
        // -1 = wall
        // 0 = empty
        // 1 = start
        // 2 = end
        // 3 = path
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.canvas.height / this.cellSize; i++) {
            for (let j = 0; j < this.canvas.width / this.cellSize; j++) {
                switch(state.maze[i][j]){
                    case CellTypes.Wall:
                        this.drawCell(j, i, 'black');
                        break;
                    case CellTypes.Start:
                        this.drawCell(j, i, 'red');
                        break;
                    case CellTypes.End:
                        this.drawCell(j, i, 'green');
                        break;
                    case CellTypes.Path:
                        this.drawCell(j, i, 'blue');
                        break;
                }
            }
        } 

        // draw best move cost on canvas
        this.ctx.fillStyle = 'red';
        this.ctx.font = '20px Arial';
        this.ctx.fillText(`Best move cost: ${state.bestMoveCost || 0}`, 10, 20);


    }

    drawCell(x, y, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
    }
}
    
