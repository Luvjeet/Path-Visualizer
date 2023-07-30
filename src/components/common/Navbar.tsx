import { useState } from "react";
import "../../styles/Navbar.css";
import { DijkstraNode, Node, BoardType } from "../../types";
import { dijkstra, getShortestPath } from "../algorithms/Dijkstra";

function Navbar({
    board,
    initializeNode,
}: {
    setBoard: React.Dispatch<React.SetStateAction<BoardType>>;
    board: BoardType;
    initializeNode: () => void;
}) {
    const [algo, setAlgo] = useState<string>("");

    function handleClick(algo: string): void {
        if (algo === "Dijkstra") {
            visualize_dijkstra();
        }
        return;
    }

    function visualize_dijkstra() {
        let source: Node = { row: 10, col: 15 };
        let target: Node = { row: 10, col: 35 };
        const path: DijkstraNode[] = dijkstra(board, source, target);
        let targetNode: DijkstraNode = path[path.length - 1];
        let shortestPath: DijkstraNode[] = getShortestPath(targetNode);
        if (
            shortestPath[shortestPath.length - 1].row !== target.row &&
            shortestPath[shortestPath.length - 1].col !== target.col
        )
            shortestPath = [];
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
