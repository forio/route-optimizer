## File for driving the TSP solver
module TSPModel

include("tsp.jl")

using Epicenter

global tour

export init,
       solve,
       reset, 
       tour

# Initialize the model. So far, this means that we need to reset the 
# global variables.
function init()
	reset()
end

# Reset the model.
function reset()
	global tour = []
end

# Helper function. Determines if a given matrix is square.
# Input:
#  matrix     Matrix to check
# Output:
#   boolean, true if square, false if not
function issquare(matrix)
	square = false
	matrixsize = size(matrix)
	if length(matrixsize) == 2 && size(matrix)[1] == size(matrix)[2]
		square = true
	end
	return square
end

# Solve takes a 2d array of travel times and returns a tour as a
# 0-based permutation of the input cities
# Input:
#  durations  n-by-n matrix of travel times between cities
# Output:
#   tour        (0-based) array of the input cities in the order visited.
function solve(durations)

	n = size(durations)[1]
	if !issquare(durations)
		n = int(sqrt(n))
		durations = reshape(durations, (n, n))
	end

	model = TSPSolver.buildTSP(n, durations)

	global tour = TSPSolver.solveTSP(model) 

	tour = tour .- 1

	record(:tour)
	return tour
end

function calculate_distance(cities)
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
	return dist
end

solve([0.0 111.80339887498948 111.80339887498948 517.228189487;
	   111.80339887498948 0.0 200.0 447.8001786511479;
	   111.80339887498948 200.0 0.0 510.41649659861116;
	   517.228189487 447.8001786511479 510.41649659861116 0.0])

end
