## File for driving the TSP solver

module TSPModel


include("tsp.jl")

using Epicenter

export init,
       setFixed, 
       removeFixed,
       solve,
       reset

global fixedPairs,
	   tour

export fixedPairs,
       tour

# Initialize the model. So far, this means that we need to reset the 
# global variables.
function init()
	reset()
end

# Reset the model.
function reset()

	global fixedPairs = (Int64, Int64)[]
	global tour = []
	global fixedConstraints = []
end

# Parse the expected JSON array into a tuple
function parseFixed(fixed)
	if length(fixed) != 2
		throw(ArgumentError)
	end

	fixed = tuple(fixed...)

	return fixed
end

## Sets the fixed arcs of the model.
## 
function setFixed(newFixed)

	status = "success"
	try
		newFixed = parseFixed(newFixed)
		duplicate = find(x -> x == newFixed, fixedPairs)

		if length(duplicate) > 0
			error("Leg is already fixed")
		end

		push!(fixedPairs, newFixed)

		record(:fixedPairs)
	catch e
		status = e.msg
	end

	return status
end


function removeFixed(toRemove)

	status = "success"
	try
		toRemove = parseFixed(toRemove)
		location = find(x -> x == toRemove, fixedPairs)

		if length(location) == 0
			error("Leg is not fixed.")
		end

		deleteat!(fixedPairs, location)

		record(:fixedPairs)
	catch e
		status = e.msg
	end

	return status
end

## Solve takes a 2d array of distances and 
## returns a tour
function solve(distanceMatrix)
	n = size(distanceMatrix)[1]

	model = TSPSolver.buildTSP(n, distanceMatrix)

	# Add the fixed constraints
	# model = TSPSolver.addFixedLegs(model, fixedPairs)

	global tour = TSPSolver.solveTSP(model)

	record(:tour)
	return tour
end

end