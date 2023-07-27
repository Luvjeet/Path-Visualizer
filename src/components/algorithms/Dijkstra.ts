import { DefaultNode, Node, DijkstraNode } from "../../types";

//Implement dijkstra algo
export function dijkstra(
    board: DefaultNode[][] | DijkstraNode[][],
    source: Node,
    target: Node,
): DijkstraNode[][] {
    const rows = board.length;
    const cols = board[0].length;
    const grid: DijkstraNode[][] = [];

    for (let i = 0; i < rows; i++) {
        let currentRow: DijkstraNode[] = [];
        for (let j = 0; j < cols; j++) {
            let node: DijkstraNode = createNode(i, j, source, target);
            currentRow.push(node);
        }
        grid.push(currentRow);
    }

    grid[source.row][source.col].distance = 0;

    const pq: DijkstraNode[] = [grid[source.row][source.col]];

    while (pq.length > 0) {
        pq.sort((a, b) => a.distance - b.distance);
        const currNode = pq.shift();

        if (!currNode || currNode?.isVisited) continue;

        if (currNode.row === target.row && currNode.col === target.col) {
            break;
        }

        currNode.isVisited = true;

        const neighbors: DijkstraNode[] = getNeighbours(grid, currNode);

        for (const nbr of neighbors) {
            if (!nbr.isVisited) {
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
    return grid;
}

const getDistance = (node1: Node, node2: Node) => {
    return Math.abs(node1.row - node2.row) + Math.abs(node1.col - node2.col);
};

function getNeighbours(
    grid: DijkstraNode[][],
    currNode: DijkstraNode,
): DijkstraNode[] {
    const neighbors: DijkstraNode[] = [];
    if (currNode.row > 0) neighbors.push(grid[currNode.row - 1][currNode.col]);
    if (currNode.row < grid.length - 1)
        neighbors.push(grid[currNode.row + 1][currNode.col]);
    if (currNode.col > 0) neighbors.push(grid[currNode.row][currNode.col - 1]);
    if (currNode.col < grid[0].length - 1)
        neighbors.push(grid[currNode.row][currNode.col + 1]);

    return neighbors;
}

function createNode(row: number, col: number, source: Node, target: Node) {
    return {
        row,
        col,
        distance: Infinity,
        isWall: false,
        isVisited: false,
        isStartNode: row === source.row && col === source.col,
        isEndNode: row === target.row && col === target.col,
        previousNode: {},
    } as DijkstraNode;
}
