import { useState } from "react";
import "../styles/Board.css"
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";

const Board = ({ defaultNode, setBoardState, boardState }) => {

    const numRows = 50;
    const numCols = 20;

    const [toggle, setToggle] = useState(false)
    const [startNode, setStartNode] = useState({ row: 10, col: 10 })
    const [targetNode, setTargetNode] = useState({ row: 40, col: 10 })


    function updateBoardState(rowIndex, colIndex, boardState, setBoardState) {
        if ((rowIndex === startNode.row && colIndex === startNode.col) ||
            (rowIndex === targetNode.row && colIndex === targetNode.col)) {
            return
        } else {
            const newBoardState = [...boardState]
            newBoardState[rowIndex][colIndex] = { ...newBoardState[rowIndex][colIndex], isWall: !newBoardState[rowIndex][colIndex].isWall }
            setBoardState(newBoardState)
        }
    }

    // TO DO WORK ON DRAG AND DROP OF START AND TARGET NODES


    //const handleDrag = (e, x, y) => {
    //    const newX = Math.floor(e.clientX / 10);
    //    const newY = Math.floor(e.clientY / 10);
    //    if (newX === targetNode.x && newY === targetNode.y) {
    //        return; // Don't overlap with end node
    //    }
    //    e.dataTransfer.setData("startNode", JSON.stringify({ newX, newY }))
    //    //setStartNode({ row: newX, col: newY });
    //    //
    //    // const newStart = [...boardState]
    //    // newStart[x][y] = [newX, newY]
    //    // setBoardState(newStart)
    //    console.log(e.clientX, e.clientY)
    //}

    //const handleDrop = (e) => {
    //    if (!toggle) {
    //        e.preventDefault();
    //        const coordinates = JSON.parse(e.dataTransfer.getData("startNode"))
    //        console.log(coordinates)
    //    }
    //}

    const rows = [];
    for (let i = 0; i < numRows; i++) {
        const cols = [];
        for (let j = 0; j < numCols; j++) {
            let classStyle = 'cell'
            if (startNode.row === i && startNode.col === j)
                classStyle = ' startNode'
            else if (targetNode.row === i && targetNode.col === j)
                classStyle = ' endNode'
            else if (boardState[i][j].isWall)
                classStyle = ' wall'
            else if (boardState[i][j].isVisited)
                classStyle = ' visited'
            if (boardState[i][j].isPath)
                classStyle = ' path'
            cols.push(
                <div
                    key={`${i}-${j}`}
                    id={`${i}-${j}`}
                    className={classStyle}
                    onMouseOver={() => {
                        if (toggle) {
                            updateBoardState(i, j, boardState, setBoardState)
                        }
                    }}
                    onClick={() => {
                        updateBoardState(i, j, boardState, setBoardState)
                    }}
                // draggable={(i === startNode.row && j === startNode.col) ? true : false}
                // onDragStart={(e) => (i === startNode.row && j === startNode.col) ? handleDrag(e) : null}
                ></div>
            );
        }
        rows.push(<div className="row" key={i}>{cols}</div>);
    }


    const visualizerHandler = async () => {
        const visitedNode = dijkstra(boardState, numRows, numCols, startNode, targetNode)
        const shortestPath = getNodesInShortestPathOrder(visitedNode[visitedNode.length - 1])
        let cnt = 0
        for (let i = 0; i < visitedNode.length; i++) {
            setTimeout(() => {
                const node = visitedNode[i]
                const newBoardState = [...boardState]
                newBoardState[node?.row][node?.col] = { ...newBoardState[node?.row][node?.col], isVisited: true }
                setBoardState(newBoardState)
                cnt++
                if (cnt === visitedNode.length && visitedNode[visitedNode.length - 1].endNode) {
                    for (let j = 1; j < shortestPath.length - 1; j++) {
                        setTimeout(() => {
                            const node = shortestPath[j];
                            const newBoardState = [...boardState]
                            newBoardState[node?.row][node?.col] = { ...newBoardState[node?.row][node?.col], isPath: true }
                            setBoardState(newBoardState)
                        }, 50 * j);
                    }
                }
            }, 5 * i)
        }
        console.log(visitedNode[visitedNode.length - 1])
    }

    return (
        <>
            <div className="board"
                onMouseDown={() => setToggle(true)}
                onMouseUp={() => setToggle(false)}
            // onDrop={(e) => handleDrop(e)}
            // onDragOver={(e) => e.preventDefault()}
            >
                {rows}
            </div>
            <button onClick={visualizerHandler}>Visualize Dijkstra</button>
        </>
    )
}

export default Board
