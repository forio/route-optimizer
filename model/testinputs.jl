

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

cities1 = [50 200;
          100 100;
          100 300;
          545 50;
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

global dist = Dict()
dist[0] = calculate_distance(cities1)

# dist[1] = [[0,2455,3433,5644,1584,3202,5198,8013,3829],
#      [1891,0,1247,5898,2455,4650,5456,9468,5285],
#      [3056,1441,0,6290,3945,5887,4966,14669,7519],
#      [5415,4986,5943,0,3606,4032,2589,7647,2849],
#      [1808,2640,3425,4495,0,2656,4050,7674,3609],
#      [2839,4398,5617,4666,2702,0,4680,5672,2320],
#      [5506,4923,5252,2864,3698,4587,0,9309,4510],
#      [8086,9645,14248,8282,7949,5247,9641,0,5336],
#      [4476,6086,6546,2696,3893,2220,4530,5374,0]]
# dist[2] = [[0,1107,2969,3571,1396,2887,5305,2358,9023],
#         [1211,0,3042,3797,1931,2657,4691,2607,9555],
#         [3115,3316,0,4937,2357,2114,7514,6048,9457],
#         [4034,3582,5143,0,4282,6068,7189,3465,3911],
#         [1370,1909,1881,3872,0,2081,6108,3630,9603],
#         [2449,2902,1875,5526,2455,0,6464,5017,11683],
#         [5488,4695,7848,7573,6265,6803,0,3704,10565],
#         [2742,2288,4841,4267,2958,4944,3563,0,7983],
#         [9047,10245,9391,4074,9461,11248,11057,10462,0]]

# dist[3] = [[0,6785,8626,5194,3583,6008,10348,3396,5542],
#         [6523,0,6247,1841,3840,5533,8063,4196,2278],
#         [8506,6829,0,5386,5310,2733,2332,8286,5612],
#         [4681,2325,6108,0,2209,4277,7831,3102,1433],
#         [4186,3605,5154,2365,0,2810,6876,3498,2171],
#         [6778,5481,2751,4648,3095,0,4473,6090,4728],
#         [10242,8275,2357,6832,7046,4469,0,10022,6711],
#         [3252,4603,8622,3222,3375,5801,10344,0,4065],
#         [5405,2330,4883,1614,2503,4196,6699,4717,0]]

dist[4] = [[0,11388,7838,11146,5599,11562,11615,5449,8047],
           [9416,0,2138,342,6200,5278,1154,4413,2356],
           [7809,2566,0,2319,5689,5340,3128,2972,693],
           [10059,844,2201,0,5956,5201,1493,4376,2320],
           [5373,6549,6215,6306,0,11106,6775,6859,6433],
           [8640,4841,5009,5526,10547,0,5080,3718,5227],
           [9979,876,2702,1218,7076,5508,0,4976,2920],
           [5449,5214,2833,4966,6867,4166,5775,0,2805],
           [8262,2854,1293,2831,7154,5032,3094,3048,0]]

# tsp_files = ["gr17.tsp", "gr21.tsp", "gr24.tsp", "gr48.tsp"]
tsp_files = ["gr21.tsp"]

# Return a coordinate array
function read_tsp_file(filename)
	number_cities = 0
	distances = nothing
	open("tsp_data/$filename") do f
	    for line in eachline(f)
	    	if ismatch(r"DIMENSION", line)
	    		line = split(strip(line), ":")
	    		number_cities = integer(line[2])
	    		break
	    	end
	    end

	    file_type = determine_tsp_format(f)
	    
	    distances = read_distances(f, number_cities, file_type)
    end

	return distances
end

function determine_tsp_format(file)
	file_type = nothing
    for line in eachline(file)
    	if ismatch(r"EDGE_WEIGHT_TYPE", line)
    		file_format = line

    		if ismatch(r"ATT", file_format) 
    			file_type = 1
    		elseif ismatch(r"EUC_2D", file_format)
    			file_type = 1
    		elseif ismatch(r"GEO", file_format)
    			file_type = 1
    		elseif ismatch(r"EXPLICIT", file_format)
    			line = readline(file)
    			line = split(strip(line), ":")
    			edge_format = line[2]
    			if ismatch(r"LOWER_DIAG_ROW", edge_format)
    				file_type = 2
    			else
    				println("Don't know how to handle $edge_format for EXPLICIT")
    			end
			else
				println("Don't know how to handle $file_format")
			end
			break
    	end
	end
	return file_type
end

function read_distances(file, number_cities, file_type)
	distances = nothing
	if file_type == 1
		distances = read_coordinates(file, number_cities)
	elseif file_type == 2
		distances = read_lower_diag(file, number_cities)
	end

	return distances
end

function read_coordinates(file, number_cities)
    readuntil(file, "NODE_COORD_SECTION\n")

    coordinates = zeros(number_cities, 2)
    for line in eachline(file)
    	if ismatch(r"EOF", line)
    		break
    	end
    	line = split(strip(line), " ")
    	city_number = integer(line[1])
    	coordinates[city_number,1] = float(line[2])
    	coordinates[city_number,2] = float(line[3])
    end

	return calculate_distance(coordinates)
end

function read_lower_diag(file, number_cities)
	readuntil(file, "EDGE_WEIGHT_SECTION\n")

	distances = zeros(number_cities, number_cities)

	dist_string = readuntil(file, "EOF")
	dist_string = replace(dist_string, "\n", " ")
	dist_string_array = map(strip, split(dist_string, " "))
	
	index = 1
	row = 1
	col = 1
	while dist_string_array[index] != "EOF"
		if dist_string_array[index] == "0"
			row += 1
			col = 1
		elseif dist_string_array[index] != ""
			distances[row,col] = float(dist_string_array[index])
			distances[col,row] = distances[row,col]
			col += 1
		end

		index += 1
	end

	return distances
end

function read_full_distance()

end

function setup_distance()
	global dist
	for file in tsp_files
		distances = read_tsp_file(file)
		dist[file] = distances
	end

end