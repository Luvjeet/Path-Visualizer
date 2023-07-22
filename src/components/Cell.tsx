import { Dispatch, SetStateAction } from "react";
import "../styles/Cell.css";

function handleClick(vertex: number) {
  console.log(vertex);
}

function Cell({
  setBoard,
  vertex,
}: {
  setBoard: Dispatch<SetStateAction<Object[][]>>;
  vertex: number;
}) {
  return <td className="node" onClick={() => handleClick(vertex)}></td>;
}

export default Cell;
