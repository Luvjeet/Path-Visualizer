import React, { ReactElement } from "react";
import "../styles/Board.css";
import Cell from "./Cell";

type Props = {
  board: Array<Array<Object>>;
  setBoard: React.Dispatch<React.SetStateAction<Object[][]>>;
};

function Board({ setBoard, board }: Props) {
  let rows: ReactElement[] = [];

  for (let i = 0; i < 20; i++) {
    const cells: ReactElement[] = [];

    for (let j = 0; j < 50; j++) {
      cells.push(<Cell key={i + j} vertex={i + j} setBoard={setBoard} />);
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
