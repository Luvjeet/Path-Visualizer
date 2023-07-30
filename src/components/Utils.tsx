import { BoardType, DefaultNode, DijkstraNode } from "../types";

export const updateObjectInArray = (
    rowIndex: number,
    colIndex: number,
    updatedObject: DijkstraNode | DefaultNode,
    board: BoardType,
    setBoard: React.Dispatch<React.SetStateAction<BoardType>>,
) => {
    const newData = [...board]; // Create a shallow copy of the 2D array
    newData[rowIndex][colIndex] = updatedObject; // Update the object
    setBoard(newData); // Set the state with the updated 2D array
};
