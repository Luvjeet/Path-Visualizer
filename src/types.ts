export type DefaultNode = {
    isWall: boolean;
    isVisited: boolean;
    isStartNode: boolean;
    isEndNode: boolean;
    isWeight: boolean;
};

export type Node = {
    row: number;
    col: number;
};

export type DijkstraNode = {
    row: number;
    col: number;
    distance: number;
    isWall: boolean;
    isVisited: boolean;
    isStartNode: boolean;
    isEndNode: boolean;
    previousNode: DijkstraNode;
};

export type BoardType = DijkstraNode[][] | DefaultNode[][];
