import { BoardType } from "../types";
import "../styles/Board.css";
import Cell from "./Cell";

type Props = {
    board: BoardType;
    setBoard: React.Dispatch<React.SetStateAction<BoardType>>;
};

function Board({ board, setBoard }: Props) {
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
