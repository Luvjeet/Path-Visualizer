import { useState } from "react";
import "../../styles/Navbar.css";
import { DijkstraNode, Node, BoardType, DFSNode, BFSNode } from "../../types";
import { dijkstra } from "../algorithms/Dijkstra";
import { dfs } from "../algorithms/Dfs.ts";
import { bfs } from "../algorithms/Bfs.ts";
import { getShortestPath } from "../Utils.tsx";

function Navbar({
    board,
    initializeNode,
}: {
    setBoard: React.Dispatch<React.SetStateAction<BoardType>>;
    board: BoardType;
    initializeNode: () => void;
}) {
    const source: Node = { row: 10, col: 15 };
    const target: Node = { row: 10, col: 35 };
    const [algo, setAlgo] = useState<string>("");

    function handleClick(algo: string): void {
        if (algo === "Dijkstra") {
            visualize_dijkstra();
        } else if (algo === "Depth First Search") {
            visualize_dfs();
        } else if (algo === "Breadth First Search") {
            visualize_bfs();
        }
        return;
    }
    function visualize_bfs() {
        const path = bfs(board, source, target);
        const shortestPath = getShortestPath(
            path[path.length - 1],
        ) as BFSNode[];

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
                        }, i * 5);
                    }
                }, i * 5);
            } else {
                setTimeout(() => {
                    let node = path[i];
                    const elem = document.getElementById(
                        `${node.row}-${node.col}`,
                    );
                    elem?.classList.replace("node", "visited");
                }, i * 5);
            }
        }
    }

    function visualize_dfs() {
        const path: DFSNode[] = dfs(board, source, target);
        const shortestPath = getShortestPath(
            path[path.length - 1],
        ) as DFSNode[];
        if (path.length === 0) {
            return alert("Target Node Not Found!");
        } else {
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
                            }, i * 5);
                        }
                    }, i * 5);
                } else {
                    setTimeout(() => {
                        let node = path[i];
                        const elem = document.getElementById(
                            `${node.row}-${node.col}`,
                        );
                        elem?.classList.replace("node", "visited");
                    }, i * 5);
                }
            }
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
                        }, i * 5);
                    }
                }, i * 5);
            } else {
                setTimeout(() => {
                    let node = path[i];
                    const elem = document.getElementById(
                        `${node.row}-${node.col}`,
                    );
                    elem?.classList.replace("node", "visited");
                }, i * 5);
            }
        }
    }

    return (
        <>
            <nav>
                <h2>Path Visualizer</h2>
                <ul className="nav-list">
                    <li>
                        <select onChange={(e) => setAlgo(e.target.value)}>
                            <option hidden>Algorithms</option>
                            <option>Dijkstra</option>
                            <option>Depth First Search</option>
                            <option>Breadth First Search</option>
                        </select>
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
