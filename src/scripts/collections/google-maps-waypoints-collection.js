var waypointModel = require('models/google-maps-point-model');

var BaseCollection = require('collections/waypoints-collection');
var RouteModel = require('models/route-model');

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

    routes: {},

    initialize: function () {
        this.resetRoutes();
        this.on('reset', this.resetRoutes, this);
        BaseCollection.prototype.initialize.apply(this, arguments);
    },

    resetRoutes: function () {
        this.routes =  {
            gResult: null,
            legs: []
        };
    },

    getMetric: function (type) {
        var metrics = {};
        metrics.totalDistanceTravelled = _.reduce(this.routes.legs, function(memo, routeModel) {
            return memo + routeModel.get('distance');
        }, 0);

        metrics.longestSegment = (this.routes.legs.length) ? _.max(_.pluck(_.invoke(this.routes.legs, 'toJSON'), 'distance')) : 0;

        metrics.timeTaken =  _.reduce(this.routes.legs, function(memo, routeModel) {
              return memo + routeModel.get('time');
        }, 0);

        return metrics[type];
    },

    getValidModels: function(){
        return _.reject(this.models, function(mdl){
            return !mdl.get('latitude');
        });
    },

    getDistanceMatrix: function() {
        var validModels = this.getValidModels();
        var latLangs = _.invoke(validModels, 'getLatLong');
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


    getDirections: function(startIndex, destIndex, waypoints) {
        var startModel = this.at(startIndex);
        var destModel = this.at(destIndex);

        var $def = $.Deferred();

        var request = ({
            origin: startModel.getLatLong(),
            destination: destModel.getLatLong(),
            travelMode: google.maps.TravelMode.DRIVING
        });

        if (waypoints) {
            request.waypoints = waypoints;
        }

        var me = this;
        var ds = new google.maps.DirectionsService();
        ds.route(request, function(directionsResult, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                me.routes.gResult = directionsResult;

                _(directionsResult.routes[0].legs).each(function(leg, index) {
                    var route = new RouteModel({
                        distance: leg.distance.value,
                        time: leg.duration.value
                    });
                    me.routes.legs.push(route);
                });
                $def.resolve(me.routes);
            }
            else {
                $def.reject(status);
            }
        });

        return $def;
    },

    populateAllRoutes: function () {
        var $def = $.Deferred();
        var me = this;
        var validModels = this.getValidModels();

        if (this.isDirtyRoutes === true && validModels.length) {
            this.resetRoutes();

            var models = validModels.slice(1, this.length);
            var waypoints = _.map(models, function (mdl) {
                return {location: mdl.getLatLong(), stopover: true};
            });
            this.getDirections(0, 0, waypoints).then(function (response) {
                me.trigger('routesRecalculated');
                $def.resolve(response);
            });
        }
        else {
            $def.resolve(this.routes);
        }
        return $def;
    }
});
