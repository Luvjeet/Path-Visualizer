import { useEffect } from "react";
import Navbar from "./components/common/Navbar";
import Board from "./components/Board";
import { useBoardStore } from "./components/State";

function App() {
    const createBoard = useBoardStore((state) => state.initializeBoard);

    useEffect(() => {
        createBoard();
    }, []);

    return (
        <>
            <Navbar />
            <Board />
        </>
    );
}

export default App;
