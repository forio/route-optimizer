## Driver for testing the model. Not run in production.

include("TSPModel.jl")
using TSPModel

cities = [50 200;
          100 100;
          100 300;
          505 100;
          500 302;
          550 220;
          900 220;
          85  455;
          300 275;
          250 150;
          800 1000;
          455 95;
          1500 108;
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


# dist = [[0,2455,3433,5644,1584,3202,5198,8013,3829],
#      [1891,0,1247,5898,2455,4650,5456,9468,5285],
#      [3056,1441,0,6290,3945,5887,4966,14669,7519],
#      [5415,4986,5943,0,3606,4032,2589,7647,2849],
#      [1808,2640,3425,4495,0,2656,4050,7674,3609],
#      [2839,4398,5617,4666,2702,0,4680,5672,2320],
#      [5506,4923,5252,2864,3698,4587,0,9309,4510],
#      [8086,9645,14248,8282,7949,5247,9641,0,5336],
#      [4476,6086,6546,2696,3893,2220,4530,5374,0]]

# println(dist)

# Initialize the model
init()

# Solve, print tour found
tic()
tour = solve(dist)
println("Found a tour: $(TSPModel.tour)")
toc()

# Reset
reset()