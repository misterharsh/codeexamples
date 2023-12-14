class Dijkstra:
    # input will be in format [(i,j,k),...] where
    # Vi -> Vj with edge weight of Ek
    def __init__(self, input: list[tuple], start: str, end: str) -> None:
        self.costs = {}
        self.parents = {}
        self.graph = {}
        self.processed = []
        self.start = start
        self.end = end
        self.INF = float('inf')
        
        # create meta data needed for algorithm
        for row in input:
            if row[0] in self.graph:
                self.graph[row[0]][row[1]] = row[2]
            else:
                self.graph[row[0]] = {}
                self.graph[row[0]][row[1]] = row[2]

            if row[1] not in self.costs:
                if row[0] == self.start:
                    self.costs[row[1]] = row[2]
                else:
                    self.costs[row[1]] = self.INF

            if row[1] not in self.parents:
                if row[0] == self.start:
                    self.parents[row[1]] = self.start
                else:
                    self.parents[row[1]] = None

        self.graph[end] = {}
        self.processed.append(start)

    def __find_lowest_cost_vertex(self) -> str:
        min_cost = self.INF 
        min_cost_vertex = None
        for v in self.costs.keys():
            cost = self.costs[v]
            if v not in self.processed and cost < min_cost:
                min_cost = cost
                min_cost_vertex = v
        return min_cost_vertex

    def run(self) -> []:
        vertex = self.__find_lowest_cost_vertex()
        while vertex is not None:
            cost = self.costs[vertex]
            neighbours = self.graph[vertex]
            for n in neighbours.keys():
                new_cost = cost + neighbours[n]
                if new_cost < self.costs[n]:
                    self.costs[n] = new_cost
                    self.parents[n] = vertex
            self.processed.append(vertex)
            vertex = self.__find_lowest_cost_vertex()

        path = []
        vertex = end
        while vertex is not start:
            path.append(vertex)
            vertex = self.parents[vertex]
        path.append(start)
        path.reverse()
        return path 

def create_graph_from_file(filename) -> ([], str, str):
    with open(filename) as data:
        header = next(data)
        start, end = header.strip().split(",")

        lines = data.readlines()
        graph = []

        for line in lines:
            vertex_i, vertex_j, edge = line.strip().split(",")
            graph.append((vertex_i, vertex_j, int(edge)))
        return graph, start, end


print("=== Running Dijkstra's algorithm on a simple DAG ===")
simple_graph, start, end = create_graph_from_file("testdata.txt")
simple_solution= Dijkstra(simple_graph, start, end)
print("The shortest path is: {0}\n".format(simple_solution.run()))

print("=== Running Dijkstra's algorithm on a harder DAG ===")
hard_graph, start, end = create_graph_from_file("testdata2.txt")
hard_solution= Dijkstra(hard_graph, start, end)
print("The shortest path is: {0}\n".format(hard_solution.run()))