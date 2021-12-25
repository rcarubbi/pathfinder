import CellTypes from './cellTypes.js';
export default class MazeSolver {
    constructor(state) {
        this.path = [];
        this.setCurrent(state.start);
        this.maze = state.maze;
        this.end = state.end;


        this.width = state.maze[0].length;
        this.height = state.maze.length;

    }

    setCurrent(point) {
        this.current = {
            x: point.x,
            y: point.y
        };
        this.addPath(this.current);
    }

    addPath(point) {
        this.path.push({
            x: point.x,
            y: point.y
        });
    }

    solve() {
        let impossible = false;
        const moves = this.getMoves(1);
        if (moves.length === 0) {
            impossible = true;
        }

        const movesWithCosts = moves.map(move => {
            return {
                move,
                cost: this.getCost(move)
            };
        });


        movesWithCosts.sort((a, b) => {
            return a.cost - b.cost;
        });


        const bestMove = movesWithCosts[0];
        impossible = !impossible ? bestMove.cost > 60 : true;
        if (!impossible) {
            this.setCurrent(bestMove.move);
            this.maze[this.current.y][this.current.x] = CellTypes.Path;
        }
        return { maze: this.maze, end: this.end, current: this.current, impossible, bestMoveCost: (bestMove || {}).cost };

    }

    getCost(move) {

        const distance = this.getDistance(move, this.end);
        const cost = this.path.filter(p => p.x === move.x && p.y === move.y).length;

        return distance + cost;
    }

    getDistance(point1, point2) {

        return Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y);
    }

    getMoves() {

        const moves = [];
        if (this.current.x > 0 && this.maze[this.current.y][this.current.x - 1] !== CellTypes.Wall) {
            moves.push({
                x: this.current.x - 1,
                y: this.current.y
            });
        }
        if (this.current.x < this.width - 1 && this.maze[this.current.y][this.current.x + 1] !== CellTypes.Wall) {
            moves.push({
                x: this.current.x + 1,
                y: this.current.y
            });
        }
        if (this.current.y > 0 && this.maze[this.current.y - 1][this.current.x] !== CellTypes.Wall) {
            moves.push({
                x: this.current.x,
                y: this.current.y - 1
            });
        }
        if (this.current.y < this.height - 1 && this.maze[this.current.y + 1][this.current.x] !== CellTypes.Wall) {
            moves.push({
                x: this.current.x,
                y: this.current.y + 1
            });
        }


        return moves;
    }
}