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

function issquare(matrix)
	square = false
	matrixsize = size(matrix)
	if length(matrixsize) == 2 && size(matrix)[1] == size(matrix)[2]
		square = true
	end
	return square
end

## Solve takes a 2d array of distances and 
## returns a tour
function solve(distanceMatrix)

	n = size(distanceMatrix)[1]
	if !issquare(distanceMatrix)
		n = int(sqrt(n))
		distanceMatrix = reshape(distanceMatrix, (n, n))
	end

	model = TSPSolver.buildTSP(n, distanceMatrix)

	global tour = TSPSolver.solveTSP(model) 

	tour = tour .- 1

	record(:tour)
	return tour
end

end
