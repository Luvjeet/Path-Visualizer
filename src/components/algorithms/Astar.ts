//implement a* algo

import { AStar, BoardType, DefaultNode, node } from "../../types";

export function Astar(board: BoardType, source: node, target: node): AStar[] {
    const grid: AStar[][] = [];
    const path: AStar[] = [];

    for (let i = 0; i < board.length; i++) {
        const newRow: AStar[] = [];
        for (let j = 0; j < board[0].length; j++) {
            const newNode: AStar = createNode(
                board[i][j] as DefaultNode,
                i,
                j,
                source,
                target,
            );
            newRow.push(newNode);
        }
        grid.push(newRow);
    }

    let openList = [];
    let closeList: AStar[] = [];

    const start = grid[source.row][source.col];
    const endNode = grid[target.row][target.col];
    openList.push(start);

    while (openList.length > 0) {
        //get the node with the lowest f value
        openList.sort((a, b) => a.f - b.f);
        let curr = openList.shift();

        if (!curr || curr.isWall || curr.isVisited) continue;

        curr.isVisited = true;
        path.push(curr);

        if (curr.row === target.row && curr.col === target.col) {
            path.push(curr);
            return path;
        }

        const neighbours = getNeighbours(grid, curr) as AStar[];

        for (const nbr of neighbours) {
            if (isPresentInList(nbr, closeList)) {
                continue;
            }

            const tentaiveG = curr.g + 1;

            if (!isPresentInList(nbr, openList) || tentaiveG < nbr.g) {
                nbr.previousNode = curr;
                nbr.g = tentaiveG;
                nbr.h = heuristic(nbr, endNode);
                nbr.f = nbr.g + nbr.h;

                if (!isPresentInList(nbr, openList)) {
                    openList.push(nbr);
                }
            }
        }
        closeList.push(curr);
    }
    return [];
}

function heuristic(node: AStar, target: AStar): number {
    return Math.sqrt(
        Math.pow(Math.abs(node.row - target.row), 2) +
            Math.pow(Math.abs(node.col - target.col), 2),
    );
    //return Math.abs(node.row - target.row) + Math.abs(node.col - target.col);
}

function createNode(
    node: DefaultNode,
    row: number,
    col: number,
    source: node,
    target: node,
) {
    return {
        row,
        col,
        isWall: node.isWall,
        isVisited: node.isVisited,
        isWeight: node.isWeight,
        isStartNode: row === source.row && col === source.col,
        isEndNode: row === target.row && col === target.col,
        f: row === source.row && col === source.col ? 0 : Infinity,
        g: 0,
        h: 0,
        previousNode: {} as AStar,
    };
}

function isPresentInList(node: AStar, list: AStar[]) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].row === node.row && list[i].col === node.col) {
            return true;
        }
    }
    return false;
}

function getNeighbours(grid: AStar[][], currNode: AStar): AStar[] {
    const neighbors: AStar[] = [];
    const row = grid.length;
    const col = grid[0].length;
    if (currNode.col < col - 1)
        neighbors.push(grid[currNode.row][currNode.col + 1]);
    if (currNode.row < row - 1)
        neighbors.push(grid[currNode.row + 1][currNode.col]);
    if (currNode.row > 0) neighbors.push(grid[currNode.row - 1][currNode.col]);
    if (currNode.col > 0) neighbors.push(grid[currNode.row][currNode.col - 1]);

    if (currNode.row > 0 && currNode.col > 0)
        neighbors.push(grid[currNode.row - 1][currNode.col - 1]);
    if (currNode.row > 0 && currNode.col < col - 1)
        neighbors.push(grid[currNode.row - 1][currNode.col + 1]);
    if (currNode.row < row - 1 && currNode.col > 0)
        neighbors.push(grid[currNode.row + 1][currNode.col - 1]);
    if (currNode.row < row - 1 && currNode.col < col - 1)
        neighbors.push(grid[currNode.row + 1][currNode.col + 1]);

    return neighbors.filter((nbr) => !nbr.isWall && !nbr.isVisited);
}
