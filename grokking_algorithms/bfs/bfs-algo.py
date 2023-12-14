class BFS_SP:
    # input will be in format [(i,j),...] where Vi -> Vj 
    def __init__(self, input: list[tuple], start: str, end: str) -> None:
        self.graph = {}
        self.graph[start] = []
        self.visited = []
        self.start = start 
        self.end = end
    
        # create meta data needed for algorithm 
        for row in input:
            # in case some nodes don't have any out going arrows,
            # we don't forget to initialize them in our graph
            if row[1] not in self.graph:
                self.graph[row[1]] = []

            if row[0] not in self.graph:
                self.graph[row[0]] = [row[1]]
            else:
                self.graph[row[0]].append(row[1])
        
        print(self.graph)
        
    def run(self) -> None:
        queue = [] 
        # storing the possible paths instead of just the current nodes
        # makes returning the SP easy
        queue.append([self.start])
        
        while queue:
            path = queue.pop()
            vertex = path[-1] 

            if vertex not in self.visited:
                neighbours = self.graph[vertex]

                for n in neighbours:
                    # simple assignment only assigns reference, not a copy
                    possible_path = list(path)
                    possible_path.append(n)
                    queue.append(possible_path)
                
                    if n == self.end:
                        print('The shortest path is: {0}\n'.format(possible_path))
                        return
                self.visited.append(vertex)
        
        print("No path availabe.\n")
        return
    
def create_graph_from_file(filename) -> ([], str, str):
    with open(filename) as data:
        header = next(data)
        start, end = header.strip().split(",")

        lines = data.readlines()
        graph = []

        for line in lines:
            vertex_i, vertex_j = line.strip().split(",")
            graph.append((vertex_i, vertex_j))
        return graph, start, end

print("=== Running BFS Shortest Path algorithm on a simple unweighted DAG ===")
simple_graph, start, end = create_graph_from_file("testdata.txt")
simple_solution= BFS_SP(simple_graph, start, end)
simple_solution.run()

print("=== Running BFS Shortest Path algorithm on a simple unweighted DAG ===")
no_sol_graph, start, end = create_graph_from_file("testdata2.txt")
no_sol_solution = BFS_SP(no_sol_graph, start, end)
no_sol_solution.run()