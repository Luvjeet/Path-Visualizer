//implement bfs

import { BFSNode, BoardType, BoardTypeNode, node } from "../../types";
import { getNeighbours } from "../Utils";

export function bfs(board: BoardType, source: node, target: node): BFSNode[] {
    const grid: BFSNode[][] = [];
    const visitedNodes: BFSNode[] = [];

    for (let i = 0; i < board.length; i++) {
        const currRow: BFSNode[] = [];
        for (let j = 0; j < board[0].length; j++) {
            let node = board[i][j];
            const newNode = createBFSNode(node, i, j);
            currRow.push(newNode);
        }
        grid.push(currRow);
    }

    const pq = [];
    pq.push(grid[source.row][source.col]);

    while (pq.length > 0) {
        let curr = pq.shift();

        if (!curr || curr.isVisited || curr.isWall) continue;

        curr.isVisited = true;
        visitedNodes.push(curr);

        if (curr.row === target.row && curr.col === target.col) {
            visitedNodes.push(curr);
            break;
        }

        const neighbours = getNeighbours(grid, curr) as BFSNode[];

        for (const nbr of neighbours) {
            if (!nbr.isVisited && !nbr.isWall) {
                nbr.previousNode = curr;
                pq.push(nbr);
            }
        }
    }
    if (visitedNodes[visitedNodes.length - 1] !== grid[target.row][target.col])
        return [];
    return visitedNodes;
}

function createBFSNode(node: BoardTypeNode, row: number, col: number) {
    return {
        ...node,
        isVisited: false,
        previousNode: {},
        row,
        col,
    } as BFSNode;
}
