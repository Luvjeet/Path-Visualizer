import { BoardType } from "../types";
import "../styles/Cell.css";
import { useEffect } from "react";

function Cell({
    row,
    col,
    board,
    nodeStyle,
    setNodeStyle,
}: {
    board: BoardType;
    row: number;
    col: number;
    nodeStyle: String;
    setNodeStyle: React.Dispatch<React.SetStateAction<String>>;
}) {
    useEffect(() => {
        board[row][col].isStartNode
            ? setNodeStyle("startNode")
            : board[row][col].isEndNode
            ? setNodeStyle("endNode")
            : board[row][col].isVisited
            ? setNodeStyle("visited")
            : setNodeStyle("node");
    }, [nodeStyle, board]);
    return <td className={`${nodeStyle}`}></td>;
}

export default Cell;
