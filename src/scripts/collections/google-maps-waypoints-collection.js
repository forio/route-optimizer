var waypointModel = require('models/google-maps-point-model');
var BaseCollection = require('collections/waypoints-collection');

var getMetricSumFromRoute = function (gDirectionsRoutes, metric){
    var sum = 0;
    _(gDirectionsRoutes).each(function(gDirectionsRoute){
        _(gDirectionsRoute).each(function (gDirectionLegs){
            _(gDirectionLegs.legs).each(function (leg) {
                sum += leg[metric].value;
            });
        });
    });
    return sum;
};

var distanceMatrixToArray = function (gDistanceMatrixResponse) {
    var returnArray = _.map(gDistanceMatrixResponse.rows, function (gDistanceMatrixResponseRow){
        return _.map(gDistanceMatrixResponseRow.elements, function (gDistanceMatrixResponseElement){
            var distance;
            if (gDistanceMatrixResponseElement.status === google.maps.DistanceMatrixElementStatus.OK) {
                distance = gDistanceMatrixResponseElement.distance.value;
            }
            else {
                distance = 0;
            }
            return distance;
        });
    });

    return returnArray;
};

module.exports = BaseCollection.extend({
    model: waypointModel,

    //Flag to see if you need to redraw all the routes
    isDirtyRoutes: true,

    routes: [],

    getDistanceFromRoute: function(gDirectionsRoutes) {
        return getMetricSumFromRoute(gDirectionsRoutes, 'distance');
    },
    getDurationromRoute: function(gDirectionsRoutes) {
        return getMetricSumFromRoute(gDirectionsRoutes, 'duration');
    },

    getMetric: function (type) {
        var metrics = {};
        mertrics.totalDistanceTravelled = _.reduce(this.routes, function(memo, val) {
            return memo + val.distance;
        }, 0);

        metrics.longestSegment = _.max(this.routes, function(route) {
            return route.distance;
        }).distance;

        metrics.timeTaken =  _.reduce(this.routes, function(memo, val) {
              return memo + val.time;
        }, 0);

        return mertrics[type];

    },

    getDistanceMatrix: function() {
        var latLangs = _.invoke(this.models, 'getLatLong');
        var dmc = new google.maps.DistanceMatrixService();

        var $def = $.Deferred();


        var distanceMatrixRequest = {
            origins: latLangs,
            travelMode: google.maps.TravelMode.DRIVING,
            destinations: latLangs
        };

        dmc.getDistanceMatrix(distanceMatrixRequest, function (gDistanceMatrixResponse, gDistanceMatrixStatus) {
            if(gDistanceMatrixStatus === google.maps.DistanceMatrixStatus.OK) {
                var arrayResponse = distanceMatrixToArray(gDistanceMatrixResponse);
                $def.resolve(arrayResponse);
            }
            else {
                $def.reject(gDistanceMatrixStatus);
            }
        });

        return $def;
    },


    getDirections: function(startIndex, destIndex) {
        var startModel = this.at(startIndex);
        var destModel = this.at(destIndex);

        var $def = $.Deferred();

        var request = ({
            origin: startModel.getLatLong(),
            destination: destModel.getLatLong(),
            travelMode: google.maps.TravelMode.DRIVING
        });

        var me = this;
        var ds = new google.maps.DirectionsService();
        ds.route(request, function(directionsResult, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                var route = {
                    gResult: directionsResult,
                    distance: me.getDistanceFromRoute(directionsResult),
                    time: me.getDurationromRoute(directionsResult),
                    from: startModel.get('name'),
                    to: destModel.get('name')
                };
                $def.resolve(route);
            }
            else {
                $def.reject(status);
            }
        });

        return $def;
    },

    populateAllRoutes: function () {
        var $def = $.Deferred();
        var routes = [];

        if (this.isDirtyRoutes === true) {
            var $routePromises = [];
            var me  = this;

            for (var i=0; i< this.size() - 1; i++) {
                $routePromises.push( this.getDirections(i, i+1));
            }

            $.when.apply($, $routePromises).done(function () {
                var responses = _.toArray(arguments);

                me.routes = responses;
                me.isDirtyRoutes = false;
                me.trigger('routesRecalculated', routes);
                $def.resolve(responses);
            });
        }
        else {
            $def.resolve(this.routes);
        }
        return $def;
    }
});
