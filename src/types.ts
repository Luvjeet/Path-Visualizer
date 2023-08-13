export type DefaultNode = {
    isWall: boolean;
    isVisited: boolean;
    isStartNode: boolean;
    isEndNode: boolean;
    isWeight: boolean;
};

export type node = {
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

export type DFSNode = {
    row: number;
    col: number;
    isWall: boolean;
    isVisited: boolean;
    isStartNode: boolean;
    isEndNode: boolean;
    isWeight: boolean;
    previousNode: DFSNode;
};

export type BFSNode = {
    row: number;
    col: number;
    isWall: boolean;
    isVisited: boolean;
    isStartNode: boolean;
    isEndNode: boolean;
    isWeight: boolean;
    previousNode: DFSNode;
};

export type AStar = {
    row: number;
    col: number;
    isWall: boolean;
    isVisited: boolean;
    isStartNode: boolean;
    isEndNode: boolean;
    isWeight: boolean;
    f: number;
    h: number;
    g: number;
    previousNode: AStar;
};

export type BFSGreedy = {
    row: number;
    col: number;
    isWall: boolean;
    isVisited: boolean;
    isStartNode: boolean;
    isEndNode: boolean;
    previousNode: BFSGreedy;
};

export type BoardType =
    | DijkstraNode[][]
    | DefaultNode[][]
    | DFSNode[][]
    | BFSNode[][]
    | AStar[][]
    | BFSGreedy[][];
export type BoardTypeNode =
    | DijkstraNode
    | DefaultNode
    | DFSNode
    | BFSNode
    | AStar
    | BFSGreedy;
