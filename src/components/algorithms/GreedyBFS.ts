//implement greedy best first search

import { BoardType, DefaultNode, BFSGreedy, node } from "../../types";
import { getNeighbours } from "../Utils";

export function greedyBFS(
    board: BoardType,
    source: node,
    target: node,
): BFSGreedy[] {
    const grid: BFSGreedy[][] = [];
    const rows = board.length;
    const cols = board[0].length;
    const path: BFSGreedy[] = [];

    for (let i = 0; i < rows; i++) {
        let currentRow: BFSGreedy[] = [];
        for (let j = 0; j < cols; j++) {
            let node: BFSGreedy = createNode(board[i][j] as DefaultNode, i, j);
            currentRow.push(node);
        }
        grid.push(currentRow);
    }

    const startNode: BFSGreedy = grid[source.row][source.col];
    const endNode: BFSGreedy = grid[target.row][target.col];
    const queue: BFSGreedy[] = [startNode];

    while (queue.length > 0) {
        queue.sort((a, b) => heuristic(a, endNode) - heuristic(b, endNode));
        let curr = queue.shift();

        if (!curr || curr.isVisited || curr.isWall) continue;

        curr.isVisited = true;
        path.push(curr);

        if (curr.row === target.row && curr.col === target.col) {
            path.push(curr);
            break;
        }
        const neighbours = getNeighbours(grid, curr) as BFSGreedy[];

        for (const nbr of neighbours) {
            nbr.previousNode = curr;
            queue.unshift(nbr);
        }
    }
    if (path[path.length - 1] !== endNode) return [];
    return path;
}

const heuristic = (node1: node, node2: node) => {
    //Manhattan distance
    return Math.abs(node1.row - node2.row) + Math.abs(node1.col - node2.col);
};
function createNode(node: DefaultNode, row: number, col: number) {
    return {
        ...node,
        col,
        row,
        isVisited: false,
        previousNode: {} as BFSGreedy,
    } as BFSGreedy;
}
