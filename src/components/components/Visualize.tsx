import {
    DijkstraNode,
    node,
    BoardType,
    DFSNode,
    BFSNode,
    AStar,
    BFSGreedy,
    DefaultNode,
} from "../../types";
import { dijkstra } from "../algorithms/Dijkstra";
import { dfs } from "../algorithms/Dfs.ts";
import { bfs } from "../algorithms/Bfs.ts";
import { getShortestPath } from "../Utils.tsx";
import { greedyBFS } from "../algorithms/GreedyBFS.ts";
import { Astar } from "../algorithms/Astar.ts";

function Visualize({ board, algo }: { board: BoardType; algo: string }) {
    const source: node = { row: 10, col: 15 };
    const target: node = { row: 10, col: 35 };
    function handleClick(algo: string): void {
        if (algo === "Dijkstra") {
            visualize_dijkstra();
        } else if (algo === "DFS") {
            visualize_dfs();
        } else if (algo === "BFS") {
            visualize_bfs();
        } else if (algo === "Astar") {
            visualize_astar();
        } else if (algo === "Greedy Best-First Search") {
            visualze_greedyBFS();
        }
        return;
    }

    function visualize_astar() {
        const path = Astar(board, source, target);
        const shortestPath: AStar[] = getShortestPath(
            path[path.length - 1],
        ) as AStar[];
        if (path.length === 0) alert("Target not Found!");
        animate(path, shortestPath);
    }

    function visualze_greedyBFS() {
        const path = greedyBFS(board, source, target);
        const shortestPath: AStar[] = getShortestPath(
            path[path.length - 1],
        ) as AStar[];
        if (path.length === 0) alert("Target not Found!");
        animate(path, shortestPath);
    }

    function visualize_bfs() {
        const path = bfs(board, source, target);
        const shortestPath = getShortestPath(
            path[path.length - 1],
        ) as BFSNode[];
        if (path.length === 0) alert("Target not Found!");
        animate(path, shortestPath);
    }

    function visualize_dfs() {
        const path: DFSNode[] = dfs(board, source, target);
        const shortestPath = getShortestPath(
            path[path.length - 1],
        ) as DFSNode[];
        if (path.length === 0) {
            return alert("Target Node Not Found!");
        } else {
            animate(path, shortestPath);
        }
    }

    function visualize_dijkstra() {
        const path: DijkstraNode[] = dijkstra(
            board as DefaultNode[][],
            source,
            target,
        );
        let targetNode: DijkstraNode = path[path.length - 1];
        let shortestPath = getShortestPath(targetNode) as DijkstraNode[];
        if (
            shortestPath[shortestPath.length - 1].row !== target.row &&
            shortestPath[shortestPath.length - 1].col !== target.col
        ) {
            shortestPath = [];
            return alert("Target Node Not Found!");
        }
        animate(path, shortestPath);
    }

    function animate(
        path: DFSNode[] | DijkstraNode[] | BFSNode[] | BFSGreedy[],
        shortestPath: DFSNode[] | DijkstraNode[] | BFSNode[] | BFSGreedy[],
    ) {
        for (let i = 0; i < path.length - 1; i++) {
            if (i === path.length - 2) {
                //animate pat
                setTimeout(() => {
                    for (let i = 0; i < shortestPath.length; i++) {
                        setTimeout(() => {
                            let node = shortestPath[i];
                            const elem = document.getElementById(
                                `${node.row}-${node.col}`,
                            );
                            elem?.classList.replace("visited", "path");
                        }, i * 15);
                    }
                }, i * 15);
            } else {
                setTimeout(() => {
                    let node = path[i];
                    const elem = document.getElementById(
                        `${node.row}-${node.col}`,
                    );
                    elem?.classList.replace("node", "visited");
                }, i * 15);
            }
        }
    }

    return (
        <>
            <button className="nav-btn" onClick={() => handleClick(algo)}>
                Visualize
            </button>
        </>
    );
}

export default Visualize;
