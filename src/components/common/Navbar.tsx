import { useEffect } from "react";
import "../../styles/Navbar.css";
import { DijkstraNode, Node, BoardType } from "../../types";
import { dijkstra } from "../algorithms/Dijkstra";

function Navbar({
    setBoard,
    board,
}: {
    setBoard: React.Dispatch<React.SetStateAction<BoardType>>;
    board: BoardType;
}) {
    function handleClick(
        board: BoardType,
        setBoard: React.Dispatch<React.SetStateAction<BoardType>>,
    ): void {
        let source: Node = { row: 10, col: 15 };
        let target: Node = { row: 10, col: 35 };
        const path: DijkstraNode[][] = dijkstra(board, source, target);
        setBoard(path);
        let shortestPath: DijkstraNode[] = [];
        let curr = path[target.row][target.col];
        while (curr) {
            shortestPath.push(curr);
            curr = curr.previousNode;
        }
        for (let i = 0; i < shortestPath.length; i++) {
            setTimeout(() => {
                const vis = document.getElementsByClassName("visited");
                vis.namedItem("path");
            }, 50 * i);
        }
        console.log(board);
    }

    return (
        <>
            <nav>
                <h2>Path Visualizer</h2>
                <ul className="nav-list">
                    <li>
                        <select>
                            <option hidden>Algorithms</option>
                            <option>Dijkstra</option>
                            <option>Depth First Search</option>
                        </select>
                    </li>
                    <li>
                        <button className="nav-btn">Clear Board</button>
                    </li>
                    <li>
                        <button
                            className="nav-btn"
                            onClick={() => handleClick(board, setBoard)}
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
