export type DefaultNode = {
    isWall: boolean;
    isVisited: boolean;
    isStartNode: boolean;
    isEndNode: boolean;
    isWeight: boolean;
    isPath: boolean;
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
    isPath: boolean;
};

export type DFSNode = {
    row: number;
    col: number;
    isWall: boolean;
    isVisited: boolean;
    isStartNode: boolean;
    isEndNode: boolean;
    isWeight: boolean;
    isPath: boolean;
    previousNode: DFSNode;
};

export type BoardType = DijkstraNode[][] | DefaultNode[][] | DFSNode[][];
export type BoardTypeNode = DijkstraNode | DefaultNode | DFSNode;
