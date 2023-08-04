//implement bfs

import { BFSNode, BoardType, BoardTypeNode, Node } from "../../types";
import { getNeighbours } from "../Utils";

export function bfs(board: BoardType, source: Node, target: Node): BFSNode[] {
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

        if (!curr || curr.isVisited) continue;

        if (curr.row === target.row && curr.col === target.col) break;

        curr.isVisited = true;
        visitedNodes.push(curr);
        const neighbours = getNeighbours(grid, curr) as BFSNode[];

        for (const nbr of neighbours) {
            if (!nbr.isVisited && !nbr.isWall) {
                nbr.previousNode = curr;
                pq.push(nbr);
            }
        }
    }
    return visitedNodes;
}

function createBFSNode(node: BoardTypeNode, row: number, col: number) {
    return {
        ...node,
        isVisited: false,
        isPath: false,
        previousNode: {},
        row,
        col,
    } as BFSNode;
}