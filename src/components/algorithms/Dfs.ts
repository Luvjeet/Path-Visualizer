//implement dfs

import { BoardType, DefaultNode, Node, DFSNode } from "../../types";
import { getNeighbours } from "../Utils";

export function dfs(board: BoardType, source: Node, target: Node): DFSNode[] {
    const grid: DFSNode[][] = [];
    const path: DFSNode[] = [];

    //create dfs node
    for (let i = 0; i < board.length; i++) {
        let currRow: DFSNode[] = [];
        for (let j = 0; j < board[0].length; j++) {
            let node = board[i][j];
            const newNode = creatDFSNode(i, j, node as DefaultNode);
            currRow.push(newNode);
        }
        grid.push(currRow);
    }
    const src = grid[source.row][source.col];
    walk(grid, src, target, path);
    path.reverse();
    return path;
}

function walk(
    grid: DFSNode[][],
    curr: DFSNode,
    target: Node,
    path: DFSNode[],
): boolean {
    if (
        curr.row < 0 ||
        curr.row >= grid.length ||
        curr.col < 0 ||
        curr.col >= grid[0].length ||
        curr.isVisited ||
        curr.isWall
    ) {
        return false;
    }

    if (curr.row === target.row && curr.col === target.col) {
        path.push(curr);
        return true;
    }
    curr.isVisited = true;

    const neighbors = getNeighbours(grid, curr) as DFSNode[];

    for (const nbr of neighbors) {
        if (!nbr.isVisited && !nbr.isWall) {
            if (walk(grid, nbr, target, path)) {
                nbr.previousNode = curr;
                path.push(nbr);
                return true;
            }
        }
    }

    return false;
}

function creatDFSNode(row: number, col: number, node: DefaultNode) {
    return {
        ...node,
        isVisited: false,
        isPath: false,
        previousNode: {},
        row,
        col,
    } as DFSNode;
}
