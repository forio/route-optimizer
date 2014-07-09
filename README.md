route-optimizer
===============

Forio's Route Optimizer combines linear optimization in Julia with Google Maps. The completed project runs on Forio's Epicenter platform [here](https://forio.com/app/showcase/route-optimizer/).

The Route Optimizer [model](https://github.com/forio/route-optimizer/tree/master/model) is licensed under [LGPL](https://github.com/forio/route-optimizer/tree/master/LGPL_LICENSE.txt) and the [interface](https://github.com/forio/route-optimizer/tree/master/src) is licensed under [Apache v2](https://github.com/forio/route-optimizer/tree/master/Apache_LICENSE.txt). 

## Configuration

Before running the project, a Google Maps API Key is required

- Copy the 'configure.default.json' file into the same folder and name the new file 'config.json'
- Change the "YOUR_API_KEY" value to your API Key


## To run

- npm install
- bower install
- grunt production or grunt server


##Background

Additional details on our methods and motivation are in our [blog post](http://forio.com/about/blog/route-optimizer-julia-google-maps-epicenter/).

