//implement bi directional swarm

import { DefaultNode, DijkstraNode, node } from "../../types";
import { getNeighbours } from "../Utils";

export function biSwarm(
    board: DefaultNode[][],
    source: node,
    target: node,
): DijkstraNode[] {
    const grid: DijkstraNode[][] = [];
    const path: DijkstraNode[] = [];
    for (let i = 0; i < board.length; i++) {
        const currRow: DijkstraNode[] = [];
        for (let j = 0; j < board[0].length; j++) {
            const newNode = createNode(board[i][j], i, j);
            currRow.push(newNode);
        }
        grid.push(currRow);
    }

    const startNode = grid[source.row][source.col];
    const endNode = grid[target.row][target.col];
    startNode.distance = 0;
    startNode.isVisited = false;
    endNode.distance = 0;
    endNode.isVisited = false;

    const startNodePQ: DijkstraNode[] = [startNode];
    const endNodePQ: DijkstraNode[] = [endNode];

    while (startNodePQ.length > 0 && endNodePQ.length > 0) {
        startNodePQ.sort(
            (a, b) => swarmHeuristics(a, endNode) - swarmHeuristics(b, endNode),
        );
        endNodePQ.sort(
            (a, b) =>
                swarmHeuristics(a, startNode) - swarmHeuristics(b, startNode),
        );

        const currStartNode = startNodePQ.shift();
        const currEndNode = endNodePQ.shift();

        if (
            !currStartNode ||
            currStartNode.isWall ||
            currStartNode.isVisited ||
            !currEndNode ||
            currEndNode.isWall ||
            currEndNode.isVisited
        ) {
            continue;
        }

        if (
            currStartNode.distance === Infinity ||
            currEndNode.distance === Infinity
        ) {
            return path;
        }

        currStartNode.isVisited = true;
        currEndNode.isVisited = true;
        path.push(currStartNode);
        path.push(currEndNode);

        const currStartNeighbours = getNeighbours(
            grid,
            currStartNode,
        ) as DijkstraNode[];
        const currEndNeighbours = getEndNeighbours(grid, currEndNode);

        for (const nbr of currStartNeighbours) {
            if (nbr.isWall || nbr.isVisited) continue;

            const newDist = currStartNode.distance + 1;
            if (newDist < nbr.distance) {
                nbr.distance = newDist;
                nbr.previousNode = currStartNode;
                startNodePQ.push(nbr);
            }
            if (checkIfMet(endNodePQ, nbr)) {
                console.log(currEndNeighbours);
                path.push(currEndNode);
                path.push(currStartNode);
                path.push(nbr);
                console.log("Idhar dhek lund", currStartNode, currEndNode, nbr);
                return path;
            }
        }
        for (const nbr of currEndNeighbours) {
            if (nbr.isWall || nbr.isVisited) continue;

            const newDist = currEndNode.distance + 1;
            if (newDist < nbr.distance) {
                nbr.distance = newDist;
                nbr.previousNode = currEndNode;
                endNodePQ.push(nbr);
            }
            if (checkIfMet(startNodePQ, nbr)) {
                path.push(currStartNode);
                path.push(nbr);
                path.push(currEndNode);
                console.log(nbr, currStartNode, currEndNode);
                return path;
            }
        }
    }

    return path;
}

function swarmHeuristics(x: DijkstraNode, y: DijkstraNode) {
    return (
        x.distance +
        Math.abs(x.row - y.row) +
        (x.distance + Math.abs(x.col - y.col))
    );
}

function createNode(node: DefaultNode, i: number, j: number) {
    return {
        ...node,
        row: i,
        col: j,
        distance: Infinity,
        previousNode: {} as DijkstraNode,
    } as DijkstraNode;
}
function getEndNeighbours(
    grid: DijkstraNode[][],
    currNode: DijkstraNode,
): DijkstraNode[] {
    const neighbors: DijkstraNode[] = [];
    if (currNode.col < grid[0].length - 1)
        neighbors.push(grid[currNode.row][currNode.col + 1]);
    if (currNode.row > 0) neighbors.push(grid[currNode.row - 1][currNode.col]);
    if (currNode.row < grid.length - 1)
        neighbors.push(grid[currNode.row + 1][currNode.col]);
    if (currNode.col > 0) neighbors.push(grid[currNode.row][currNode.col - 1]);

    return neighbors.filter((nbr) => !nbr.isWall && !nbr.isVisited);
}

function checkIfMet(arr: DijkstraNode[], node: DijkstraNode): boolean {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].row === node.row && arr[i].col === node.col) return true;
    }
    return false;
}
