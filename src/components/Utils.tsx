import { BoardType, BoardTypeNode } from "../types";

export function getNeighbours(
    grid: BoardType,
    currNode: BoardTypeNode,
): BoardTypeNode[] {
    const neighbors: BoardTypeNode[] = [];
    if (currNode.row < grid.length - 1)
        neighbors.push(grid[currNode.row + 1][currNode.col]);
    if (currNode.col < grid[0].length - 1)
        neighbors.push(grid[currNode.row][currNode.col + 1]);
    if (currNode.row > 0) neighbors.push(grid[currNode.row - 1][currNode.col]);
    if (currNode.col > 0) neighbors.push(grid[currNode.row][currNode.col - 1]);

    return neighbors.filter((nbr) => !nbr.isVisited);
}

export function getShortestPath(target: BoardTypeNode): BoardTypeNode[] {
    let temp: BoardTypeNode[] = [];
    let curr = target;
    while (curr) {
        temp.unshift(curr);
        curr = curr.previousNode;
    }
    return temp;
}
