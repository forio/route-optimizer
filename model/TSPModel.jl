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
#  traveltimes  n-by-n matrix of travel times between cities
# Output:
#   tour        (0-based) array of the input cities in the order visited.
function solve(traveltimes)

	n = size(traveltimes)[1]
	if !issquare(traveltimes)
		n = int(sqrt(n))
		traveltimes = reshape(traveltimes, (n, n))
	end

	model = TSPSolver.buildTSP(n, traveltimes)

	global tour = TSPSolver.solveTSP(model) 

	tour = tour .- 1

	record(:tour)
	return tour
end

end
