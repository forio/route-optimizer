## Driver for testing the model. Not run in production.

include("TSPModel.jl")
using TSPModel

include("testinputs.jl")


function run_tests()
  # Initialize the model
  init()
  setup_distance()
  # Solve, print tour found
  for (k,v) in dist
      tic()
      # println(v)
      tour = solve(v)
      println("Instance $k, found a tour: $tour")
      toc()
      reset()
  end
end

run_tests()