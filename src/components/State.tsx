import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { BoardType, DefaultNode } from "../types";

const defaultNode: DefaultNode = {
    isWall: false,
    isVisited: false,
    isStartNode: false,
    isEndNode: false,
    isWeight: false,
};

const rows = 20;
const cols = 50;

type BoardInterface = {
    board: BoardType;
    clearBoard: () => void;
    initializeBoard: () => void;
    updateBoard: (updatedBoard: BoardType, row: number, col: number) => void;
};

function updateMe(usedBoard: BoardType, row: number, col: number): BoardType {
    const updatedBoard = [...usedBoard];
    updatedBoard[row][col] = {
        ...updatedBoard[row][col],
        isWall: !updatedBoard[row][col].isWall,
    };
    return updatedBoard as BoardType;
}

function boardCreator(): DefaultNode[][] {
    const grid = [];
    for (let i = 0; i < rows; i++) {
        const currentRow = [];
        for (let j = 0; j < cols; j++) {
            let node = { ...defaultNode };
            if (i === 10 && j === 15) {
                node.isStartNode = true;
            }
            if (i === 10 && j === 35) {
                node.isEndNode = true;
            }
            currentRow.push(node);
            const elem = document.getElementById(`${i}-${j}`);
            elem?.classList.replace("visited", "node");
            elem?.classList.replace("path", "node");
        }
        grid.push(currentRow);
    }
    return grid;
}

export const useBoardStore = create<BoardInterface>()(
    devtools((set) => ({
        board: [],
        initializeBoard: () => {
            set(
                () => ({
                    board: boardCreator(),
                }),
                false,
                "initializeBoard",
            );
        },
        clearBoard: () => {
            set((state) => ({ board: state.board }), false, "clearBoard");
        },
        updateBoard: (usedBoard: BoardType, row: number, col: number) => {
            return set(
                () => ({
                    board: updateMe(usedBoard, row, col),
                }),
                false,
                "udpateBoard",
            );
        },
    })),
);
