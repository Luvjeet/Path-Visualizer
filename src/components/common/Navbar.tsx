import { useState } from "react";
import "../../styles/Navbar.css";
import { BoardType } from "../../types";
import SelectMenu from "./SelectMenu.tsx";
import Visualize from "../components/Visualize.tsx";

function Navbar({
    board,
    initializeNode,
}: {
    board: BoardType;
    initializeNode: () => void;
}) {
    const [algo, setAlgo] = useState<string>("--Select--");

    function clearPath() {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                const elem = document.getElementById(`${i}-${j}`);
                elem?.classList.replace("visited", "node");
                elem?.classList.replace("path", "node");
            }
        }
    }

    return (
        <>
            <nav>
                <h2>Path Visualizer</h2>
                <ul className="nav-list">
                    <li>
                        <SelectMenu
                            options={[
                                "Dijkstra",
                                "DFS",
                                "BFS",
                                "Astar",
                                "Greedy Best-First Search",
                            ]}
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
                        <button className="nav-btn" onClick={() => clearPath()}>
                            Clear Path
                        </button>
                    </li>
                    <li>
                        <Visualize board={board} algo={algo} />
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Navbar;
