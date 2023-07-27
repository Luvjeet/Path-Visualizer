import React, { ReactElement } from "react";
import { BoardType } from "../types";
import "../styles/Board.css";
import Cell from "./Cell";

type Props = {
    board: BoardType;
    setBoard: React.Dispatch<React.SetStateAction<BoardType>>;
    nodeStyle: String;
    setNodeStyle: React.Dispatch<React.SetStateAction<String>>;
};

function Board({ setBoard, board, nodeStyle, setNodeStyle }: Props) {
    let rows: ReactElement[] = [];

    for (let i = 0; i < 20; i++) {
        const cells: ReactElement[] = [];

        for (let j = 0; j < 50; j++) {
            cells.push(
                <Cell
                    key={i + j}
                    row={i}
                    col={j}
                    nodeStyle={nodeStyle}
                    setNodeStyle={setNodeStyle}
                    board={board}
                />,
            );
        }
        rows.push(<tr key={i}>{cells}</tr>);
    }

    return (
        <div className="board-container">
            <table>
                <tbody>{rows}</tbody>
            </table>
        </div>
    );
}

export default Board;
