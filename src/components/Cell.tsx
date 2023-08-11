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
    setBoard: React.Dispatch<React.SetStateAction<BoardType>>;
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

    //function handleMouseEnter(r: number, c: number) {
    //    if (!toggleMouse) return;
    //    if (!node.isStartNode && !node.isEndNode) {
    //        const updateBoard = [...board];
    //        updateBoard[r][c] = {
    //            ...updateBoard[r][c],
    //            isWall: !updateBoard[r][c].isWall,
    //        };
    //        setBoard(updateBoard as BoardType);
    //    }
    //}

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
