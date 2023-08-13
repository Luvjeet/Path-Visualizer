import { useEffect, useState } from "react";
import { BoardType, DefaultNode } from "./types";
import Navbar from "./components/common/Navbar";
import Board from "./components/Board";

function App() {
    const rows = 20;
    const cols = 50;

    const defaultNode: DefaultNode = {
        isWall: false,
        isVisited: false,
        isStartNode: false,
        isEndNode: false,
        isWeight: false,
    };

    const [board, setBoard] = useState<BoardType>(
        Array.from({ length: rows }, () => Array(cols).fill(defaultNode)),
    );

    useEffect(() => {
        initializeNode();
    }, []);

    function initializeNode() {
        const grid = [];
        for (let i = 0; i < rows; i++) {
            const currentRow = [];
            for (let j = 0; j < cols; j++) {
                let node = { ...defaultNode };
                if (i === 10 && j === 15) {
                    node.isStartNode = true;
                }
                if (i === 10 && j === 35) {
                    node.isEndNode = true;
                }
                currentRow.push(node);
                const elem = document.getElementById(`${i}-${j}`);
                elem?.classList.replace("visited", "node");
                elem?.classList.replace("path", "node");
            }
            grid.push(currentRow);
        }
        setBoard(grid);
    }

    return (
        <>
            <Navbar board={board} initializeNode={initializeNode} />
            <Board board={board} setBoard={setBoard} />
        </>
    );
}

export default App;
