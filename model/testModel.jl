## Driver for testing the model. Not run in production.

include("TSPModel.jl")
using TSPModel

cities = [50 200;
          100 100;
          100 300;
          500 100;
          500 300;
          550 220;
          900 220;
          85  455;
          300 275;
          250 150;
          800 1000;
          450 100;
          1500 100;
          250 950;
          621 820;
          351 750]

n = size(cities)[1]
# Calculate pairwise distance matrix
dist = zeros(n, n)
for i = 1:n
	for j = i:n
		d = norm(cities[i,1:2] - cities[j,1:2])
		dist[i,j] = d
		dist[j,i] = d
	end
end

# Initialize the model
init()

# Solve, print tour found
tic()
tour = solve(dist)
println("Found a tour: $(TSPModel.tour)")
toc()


# Reset
reset()

# Choose the 1st and 3rd city to be fixed
newFixed = [tour[1], tour[4]]

# Ensure that they are fixed
setFixed(newFixed)

println("Fixed legs: $(TSPModel.fixedPairs)")

# Whoops, we choose the 4th instead of the third. We had better redo that.
actualFixed = (tour[1], tour[3])
setFixed(actualFixed)

removeFixed(newFixed)
println("Fixed legs: $(TSPModel.fixedPairs)")

# Ensure the correct ones are fixed. 
tic()
solve(dist)
toc()
println("Found a tour: $(TSPModel.tour)")

