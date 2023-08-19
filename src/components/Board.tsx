import "../styles/Board.css";
import Cell from "./Cell";
import { useState } from "react";
import { useBoardStore } from "./State";

function Board() {
    const [toggleMouse, setToggleMouse] = useState<boolean>(false);
    const board = useBoardStore((state) => state.board);
    const updateBoard = useBoardStore((state) => state.updateBoard);

    function handleMouseDown(r: number, c: number) {
        setToggleMouse(true);
        updateBoard(board, r, c);
    }

    function handleMouseUp() {
        setToggleMouse(false);
    }

    function handleMouseEnter(r: number, c: number) {
        if (!toggleMouse) return;
        updateBoard(board, r, c);
    }

    return (
        <div className="board-container">
            <table>
                <tbody>
                    {board.map((row, rowIdx) => (
                        <tr key={rowIdx}>
                            {row.map((_, colIdx) => (
                                <Cell
                                    key={colIdx}
                                    row={rowIdx}
                                    col={colIdx}
                                    board={board}
                                    mouseDown={() =>
                                        handleMouseDown(rowIdx, colIdx)
                                    }
                                    mouseEnter={() =>
                                        handleMouseEnter(rowIdx, colIdx)
                                    }
                                    mouseUp={handleMouseUp}
                                />
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Board;
