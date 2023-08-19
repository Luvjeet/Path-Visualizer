import { BoardType } from "../types";
import "../styles/Cell.css";
import { useEffect, useState } from "react";

function Cell({
    row,
    col,
    board,
    mouseDown,
    mouseUp,
    mouseEnter,
}: {
    board: BoardType;
    row: number;
    col: number;
    mouseDown: () => void;
    mouseUp: () => void;
    mouseEnter: () => void;
}) {
    const node = board[row][col];
    const [cellStyle, setCellStyle] = useState<string>("node");

    useEffect(() => {
        setCellStyle(
            board[row][col].isStartNode
                ? "startNode"
                : board[row][col].isEndNode
                ? "endNode"
                : board[row][col].isWall
                ? "wall"
                : "node",
        );
    }, [node]);

    return (
        <td
            id={`${row}-${col}`}
            className={`${cellStyle}`}
            onMouseEnter={mouseEnter}
            onMouseUp={mouseUp}
            onMouseDown={mouseDown}
        ></td>
    );
}

export default Cell;
