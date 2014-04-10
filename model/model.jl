## File for driving the TSP solver

module TSPModel


include("tsp.jl")

#using Epicenter

export init,
       setFixed, 
       solve,
       reset

# Initialize the model
function init()
	# setup the model without an objective function
end

# Reset the model (not needed?)
function reset()

end

## Sets the fixed arcs of the model.
## 
function setFixed()

end

## Solve takes a 2d array of distances and 
## returns a tour
function solve()

end

function 

end

end