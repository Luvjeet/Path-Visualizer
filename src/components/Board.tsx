import { BoardType } from "../types";
import "../styles/Board.css";
import Cell from "./Cell";
import { useState } from "react";

type Props = {
    board: BoardType;
    setBoard: React.Dispatch<React.SetStateAction<BoardType>>;
};

function Board({ board, setBoard }: Props) {
    const [toggleMouse, setToggleMouse] = useState<boolean>(false);

    function handleMouseDown(r: number, c: number) {
        setToggleMouse(true);
        const updateBoard = [...board];
        updateBoard[r][c] = {
            ...updateBoard[r][c],
            isWall: !updateBoard[r][c].isWall,
        };
        setBoard(updateBoard as BoardType);
    }

    function handleMouseUp() {
        setToggleMouse(false);
    }

    function handleMouseEnter(r: number, c: number) {
        if (!toggleMouse) return;
        const updateBoard = [...board];
        updateBoard[r][c] = {
            ...updateBoard[r][c],
            isWall: !updateBoard[r][c].isWall,
        };
        setBoard(updateBoard as BoardType);
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
                                    setBoard={setBoard}
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
