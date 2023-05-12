
// FIRST DRAFT

//const getNeigbours = (node, grid) => {
//    const { x, y } = node
//    const neighbours = []
//
//    if (x > 0) neighbours.push(grid[x - 1][y])
//    if (x < grid.length - 1) neighbours.push(grid[x + 1][y])
//    if (y > 0) neighbours.push(grid[x][y - 1])
//    if (y < grid[0].length) neighbours.push(grid[x][y + 1])
//
//    return neighbours
//}
//
//const getDistance = (nodeA, nodeB) => {
//    const dx = Math.abs(nodeA.x - nodeB.x);
//    const dy = Math.abs(nodeA.y - nodeB.y);
//    return dx + dy; // Manhattan distance
//}
//
//
//export const dijkstra = (grid, startNode, endNode, visitedNodes, setVisitedNodes) => {
//
//    const distance = {}
//    const previous = {}
//    const visited = new Set() // set of visited nodes
//
//    for (let i = 0; i < grid.length; i++) {
//        for (let j = 0; j < grid[i].length; j++) {
//            const node = grid[i][j]
//            distance[node] = Infinity
//            previous[node] = undefined
//        }
//    }
//
//    distance[startNode] = 0;
//
//    const q = [startNode]
//
//    while (q.length > 0) {
//        q.sort((a, b) => distance[a] - distance[b])
//        const curr = q.shift()
//        visited.add(curr)
//        setVisitedNodes(prev => {
//            const newVisitedNodes = [...prev]
//            newVisitedNodes[curr.row][curr.col] = true
//            return newVisitedNodes
//        }
//        )
//
//        //check neighbours
//
//        for (let neighbour of getNeigbours(curr, grid)) {
//            if (visited.has(neighbour))
//                continue
//
//            const dist = distance[curr] + getDistance(curr, neighbour)
//            if (dist < distance[neighbour]) {
//                distance[neighbour] = dist
//                previous[neighbour] = curr
//                q.push(neighbour)
//            }
//        }
//        if (curr === endNode) {
//            return visitedNodes;
//        }
//    }
//}
//


const createNode = (row, col, values) => {
    return {
        row,
        col,
        ...values
    }
}

const getGrid = (boardState, rows, cols, startNode, targetNode) => {
    const grid = []
    for (let i = 0; i < rows; i++) {
        const currRow = []
        for (let j = 0; j < cols; j++) {
            currRow.push(createNode(i, j, boardState[i][j]))
        }
        grid.push(currRow)
    }
    grid[startNode.row][startNode.col].startNode = true
    grid[targetNode.row][targetNode.col].endNode = true
    return grid
}

export function dijkstra(boardState, rows, cols, startNode, targetNode) {
    //    const visited = new Set() // set of visited nodes
    const grid = getGrid(boardState, rows, cols, startNode, targetNode);
    const firstNode = grid[startNode.row][startNode.col]
    const finishNode = grid[targetNode.row][targetNode.col]

    const visitedNodesInOrder = [];
    firstNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid)
    while (unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        let closestNode = unvisitedNodes.shift();
        // If we encounter a wall, we skip it.
        if (closestNode.isWall) continue;
        // If the closest node is at a distance of infinity,
        // we must be trapped and should therefore stop.
        if (closestNode.distance === Infinity) return visitedNodesInOrder;
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode === finishNode) return visitedNodesInOrder;
        updateUnvisitedNeighbors(closestNode, grid);
    }
}

function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previous = node;
    }
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

const getAllNodes = (grid) => {
    const temp = [];
    for (const row of grid) {
        for (const node of row) {
            temp.push(node);
        }
    }
    return temp;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previous;
    }
    return nodesInShortestPathOrder;
}
