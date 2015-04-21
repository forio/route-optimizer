route-optimizer
===============

Forio's Route Optimizer combines linear optimization in Julia with Google Maps. The completed project runs on Forio's Epicenter platform [here](https://forio.com/app/showcase/route-optimizer/).

The Route Optimizer [model](https://github.com/forio/route-optimizer/tree/master/model) is licensed under [LGPL](https://github.com/forio/route-optimizer/tree/master/LGPL_LICENSE.txt) and the [interface](https://github.com/forio/route-optimizer/tree/master/src) is licensed under [Apache v2](https://github.com/forio/route-optimizer/tree/master/Apache_LICENSE.txt).

##To run on Epicenter
Before running the project, a Google Maps API Key is required

- Copy the 'public' folder into your Epicenter project. Tutorial [here.](https://forio.com/epicenter/docs/public/project_admin/#upload)
- Verify from your project settings that your project is set to 'public'. Tutorial [here.](https://forio.com/epicenter/docs/public/updating_your_settings/#general-settings)
- Change YOUR_KEY_HERE in index.html to reference your Google Maps API key.

## To run locally
- npm install
- bower install
- grunt production or grunt server

### Configuration
- Copy the 'configure.default.json' file into the same folder and name the new file 'config.json'
- Change the "YOUR_API_KEY" value to your API Key

##Background

Additional details on our methods and motivation are in our [blog post](http://forio.com/about/blog/route-optimizer-julia-google-maps-epicenter/).
