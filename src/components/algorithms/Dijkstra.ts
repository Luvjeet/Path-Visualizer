import { DefaultNode, Node, DijkstraNode } from "../../types";
import { getNeighbours } from "../Utils";

//Implement dijkstra algo
export function dijkstra(
    board: DefaultNode[][] | DijkstraNode[][],
    source: Node,
    target: Node,
): DijkstraNode[] {
    const rows = board.length;
    const cols = board[0].length;
    const grid: DijkstraNode[][] = [];
    const visitedNodesInOrder: DijkstraNode[] = [];

    for (let i = 0; i < rows; i++) {
        let currentRow: DijkstraNode[] = [];
        for (let j = 0; j < cols; j++) {
            let node: DijkstraNode = createNode(
                board[i][j] as DefaultNode,
                i,
                j,
                source,
                target,
            );
            currentRow.push(node);
        }
        grid.push(currentRow);
    }

    grid[source.row][source.col].distance = 0;

    const pq: DijkstraNode[] = [grid[source.row][source.col]];

    while (pq.length > 0) {
        pq.sort((a, b) => a.distance - b.distance);
        const currNode = pq.shift();

        if (!currNode || currNode.isVisited || currNode.isWall) continue;

        if (currNode.distance === Infinity) return visitedNodesInOrder;

        currNode.isVisited = true;
        currNode.isPath = true;
        visitedNodesInOrder.push(currNode);

        if (currNode.row === target.row && currNode.col === target.col) {
            break;
        }

        const neighbors = getNeighbours(grid, currNode) as DijkstraNode[];

        for (const nbr of neighbors) {
            if (!nbr.isVisited && !nbr.isWall) {
                const currDist = getDistance(currNode, nbr);
                const newDist = currNode.distance + currDist;
                if (newDist < nbr.distance) {
                    nbr.distance = newDist;
                    nbr.previousNode = currNode;
                    pq.push(nbr);
                }
            }
        }
    }
    return visitedNodesInOrder;
}

const getDistance = (node1: Node, node2: Node) => {
    return Math.abs(node1.row - node2.row) + Math.abs(node1.col - node2.col);
};

function createNode(
    node: DefaultNode,
    row: number,
    col: number,
    source: Node,
    target: Node,
) {
    return {
        row,
        col,
        isWall: node.isWall,
        distance: Infinity,
        isStartNode: row === source.row && col === source.col,
        isEndNode: row === target.row && col === target.col,
        isPath: false,
        previousNode: {},
    } as DijkstraNode;
}
