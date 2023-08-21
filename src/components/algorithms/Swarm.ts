//implement swarm algorithm
//Composite mix of A* and Dijkstra

import { DijkstraNode, DefaultNode, node } from "../../types";
import { getNeighbours } from "../Utils";

export function swarm(
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
    const pq: DijkstraNode[] = [startNode];

    while (pq.length > 0) {
        pq.sort(
            (a, b) => swarmHeuristic(a, endNode) - swarmHeuristic(b, endNode),
        );
        const curr = pq.shift();

        if (!curr || curr.isWall) continue;

        if (curr.distance === Infinity) return path;

        curr.isVisited = true;
        path.push(curr);

        if (curr.row === endNode.row && curr.col === endNode.col) {
            path.push(curr);
            break;
        }

        const neighbours = getNeighbours(grid, curr) as DijkstraNode[];

        for (const nbr of neighbours) {
            if (nbr.isWall || nbr.isVisited) continue;
            const newDist = curr.distance + 1;
            if (newDist < nbr.distance) {
                nbr.distance = newDist;
                nbr.previousNode = curr;
                pq.push(nbr);
            }
        }
    }

    return path;
}

function swarmHeuristic(x: DijkstraNode, y: DijkstraNode) {
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
