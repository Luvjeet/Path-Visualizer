import { BoardType } from "../types";
import "../styles/Cell.css";
import { useEffect, useState } from "react";

function Cell({
    row,
    col,
    board,
    setBoard,
}: {
    board: BoardType;
    row: number;
    col: number;
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
                : board[row][col].isVisited
                ? "visited"
                : board[row][col].isPath
                ? "path"
                : board[row][col].isWall
                ? "wall"
                : "node",
        );
    }, [node]);

    function handleClick() {
        if (!node.isStartNode && !node.isEndNode) {
            const updateBoard = [...board];
            updateBoard[row][col] = {
                ...updateBoard[row][col],
                isWall: !updateBoard[row][col].isWall,
            };
            setBoard(updateBoard);
        }
    }

    return (
        <td
            id={`${row}-${col}`}
            className={`${cellStyle}`}
            onClick={handleClick}
        ></td>
    );
}

export default Cell;
