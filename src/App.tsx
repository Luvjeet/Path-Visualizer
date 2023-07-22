import { useState } from "react";
import Navbar from "./components/common/Navbar";
import Board from "./components/Board";

function App() {
  const rows = 20;
  const cols = 50;
  const defaultNode = {
    isWall: false,
    isVisited: false,
  };
  const [board, setBoard] = useState<Object[][]>(
    Array.from({ length: rows }, () => Array(cols).fill(defaultNode))
  );

  return (
    <>
      <Navbar />
      <Board setBoard={setBoard} board={board} />
    </>
  );
}

export default App;
