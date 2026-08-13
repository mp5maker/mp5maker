const g = {
  A: ["B", "C"],
  B: ["A", "D"],
  C: ["A", "D"],
  D: ["B", "C"],
};

const depthFirstSearch = (graph, island, visited = new Set()) => {
  if (visited.has(island)) {
    return;
  }

  visited.add(isalnd);
  console.log(island);

  for (const neighbor of graph[island]) {
    depthFirstSearch(graph, neighbor, visited);
  }
};

depthFirstSearch(graph, "A");

const breadFirstSearch = (graph, island, visited = new Set()) => {
  const visited = new Set();
  const queue = [start];

  while (queue.length > 0) {
    const island = queue.shift();

    console.log(island);

    for (const neightbor of graph[island]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
};
