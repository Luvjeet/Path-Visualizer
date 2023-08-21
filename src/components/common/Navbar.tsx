import { useState } from "react";
import "../../styles/Navbar.css";
import SelectMenu from "./SelectMenu.tsx";
import Visualize from "../components/Visualize.tsx";
import { useBoardStore } from "../State.tsx";

function Navbar() {
    const [algo, setAlgo] = useState<string>("--Select--");
    const boardx = useBoardStore((state) => state.board);
    const createBoard = useBoardStore((state) => state.initializeBoard);

    function clearPath() {
        for (let i = 0; i < boardx.length; i++) {
            for (let j = 0; j < boardx[0].length; j++) {
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
                                "Swarm",
                                // "Bi-Directional Swarm",
                            ]}
                            algo={algo}
                            setAlgo={setAlgo}
                        />
                    </li>
                    <li>
                        <button
                            className="nav-btn"
                            onClick={() => createBoard()}
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
                        <Visualize board={boardx} algo={algo} />
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Navbar;
