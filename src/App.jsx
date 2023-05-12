import './App.css'
import Board from './components/Board'
import Navbar from './common/Navbar'
import { useState } from 'react'

function App    () {

    const numRows = 50;
    const numCols = 20;

    const defaultNode = {
        startNode: null,
        endNode: null,
        isWall: false,
        isVisited: false,
        isPath: false,
        previous: null,
        distance: Infinity
    }
    const [boardState, setBoardState] = useState(
        Array(numRows).fill().map(() => Array(numCols).fill(defaultNode))
    )

    const clearBoardHandler = async () => {
        setBoardState(
            Array(numRows).fill().map(() => Array(numCols).fill(defaultNode)))
    }

    return (
        <div className="App">
            <Navbar
                clearBoardHandler={clearBoardHandler}
            />
            <Board defaultNode={defaultNode} boardState={boardState} setBoardState={setBoardState} />
        </div>
    )
}

export default App
