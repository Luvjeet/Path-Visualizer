import { useState } from "react";
import "../../styles/Navbar.css";
import {
    DijkstraNode,
    node,
    BoardType,
    DFSNode,
    BFSNode,
    AStar,
} from "../../types";
import { dijkstra } from "../algorithms/Dijkstra";
import { dfs } from "../algorithms/Dfs.ts";
import { bfs } from "../algorithms/Bfs.ts";
import { getShortestPath } from "../Utils.tsx";
import SelectMenu from "./SelectMenu.tsx";
import { Astar } from "../algorithms/Astar.ts";

function Navbar({
    board,
    initializeNode,
}: {
    setBoard: React.Dispatch<React.SetStateAction<BoardType>>;
    board: BoardType;
    initializeNode: () => void;
}) {
    const source: node = { row: 10, col: 15 };
    const target: node = { row: 10, col: 35 };
    const [algo, setAlgo] = useState<string>("--Select--");

    function handleClick(algo: string): void {
        if (algo === "Dijkstra") {
            visualize_dijkstra();
        } else if (algo === "DFS") {
            visualize_dfs();
        } else if (algo === "BFS") {
            visualize_bfs();
        } else if (algo === "Astar") {
            visualize_astar();
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

    function visualize_bfs() {
        const path = bfs(board, source, target);
        const shortestPath = getShortestPath(
            path[path.length - 1],
        ) as BFSNode[];

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
        const path: DijkstraNode[] = dijkstra(board, source, target);
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
        path: DFSNode[] | DijkstraNode[] | BFSNode[],
        shortestPath: DFSNode[] | DijkstraNode[] | BFSNode[],
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
            <nav>
                <h2>Path Visualizer</h2>
                <ul className="nav-list">
                    <li>
                        {/*<select onChange={(e) => setAlgo(e.target.value)}>
                            <option hidden>Algorithms</option>
                            <option>Dijkstra</option>
                            <option>Depth First Search</option>
                            <option>Breadth First Search</option>
                        </select>
                        */}
                        <SelectMenu
                            options={["Dijkstra", "DFS", "BFS", "Astar"]}
                            algo={algo}
                            setAlgo={setAlgo}
                        />
                    </li>
                    <li>
                        <button
                            className="nav-btn"
                            onClick={() => initializeNode()}
                        >
                            Clear Board
                        </button>
                    </li>
                    <li>
                        <button
                            className="nav-btn"
                            onClick={() => handleClick(algo)}
                        >
                            Visualize
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Navbar;
