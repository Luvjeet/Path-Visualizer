# Pathfinding Visualizer

Welcome to Pathfinding Visualizer! I built this application because I was fascinated by pathfinding algorithms, and I wanted to visualize them in action. I hope that you enjoy playing around with this visualization tool just as much as I enjoyed building it.

## Algorithms Implemented Are: 

This application supports the following algorithms: 

**Dijkstra's Algorithm** (weighted): 
>
>The father of pathfinding algorithms; guarantees the shortest path
>
**A* Search** (weighted):
>Arguably the best pathfinding algorithm; uses heuristics to guarantee the shortest path much faster than Dijkstra's Algorithm

**Greedy Best-first Search** (weighted): a faster, more heuristic-heavy version of A*; does not guarantee the shortest path

**Swarm Algorithm** (weighted): a mixture of Dijkstra's Algorithm and A*; does not guarantee the shortest-path

**Bidirectional Swarm Algorithm** (weighted): Swarm from both sides; does not guarantee the shortest path

**Breath-first Search** (unweighted): a great algorithm; guarantees the shortest path

**Depth-first Search** (unweighted): a very bad algorithm for pathfinding; does not guarantee the shortest path

## More about the Swarm Algorithm

The Swarm Algorithm is an algorithm that (Atleast presumably so I was unable to find anything close to it online) - found it about at this repo https://github.com/clementmihailescu/Pathfinding-Visualizer. The algorithm is essentially a mixture of Dijkstra's Algorithm and A* Search; more precisely, while it converges to the target node like A* , it still explores quite a few neighboring nodes surrounding the start node like Dijkstra's. The algorithm differentiates itself from A* through its use of heuristics: it continually updates nodes' distance from the start node while taking into account their estimated distance from the target node. This effectively "balances" the difference in total distance between nodes closer to the start node and nodes closer to the target node, which results in the triangle-like shape of the Swarm Algorithm. Its potential applications could be seen in a video-game where a character must keep track of a boss with high priority (the target node), all the while keeping tracking of neighboring enemies that might be swarming nearby. 
