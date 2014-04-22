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
    var returnArray = _(gDistanceMatrixResponse.rows).map(function (gDistanceMatrixResponseRow){
        return _(gDistanceMatrixResponseRow.elements).map(function (gDistanceMatrixResponseElement){
            var distance;
            if (gDistanceMatrixResponseElement.status === google.maps.DistanceMatrixElementStatus) {
                distance = gDistanceMatrixResponseElement.distance.value;
            }
            else {
                distance = 0;
            }
            return distance;
        });
    });

};

module.exports = BaseCollection.extend({
    model: waypointModel,

    getMetric: function(metric) {
        return 34;
    },

    getDistanceFromRoute: function(gDirectionsRoutes) {
        return getMetricSumFromRoute(gDirectionsRoutes, 'distance');
    },
    getDurationromRoute: function(gDirectionsRoutes) {
        return getMetricSumFromRoute(gDirectionsRoutes, 'duration');
    },

    getDistanceMatrix: function() {
        var latLangs = _invoke(this.models, 'getLatLong');
        var dmc = new google.maps.DistanceMatrixService();

        var $def = $.Deferred();


        var distanceMatrixRequest = {
            origins: latLangs,
            travelMode: google.maps.TravelMode.DRIVING,
            destinations: latLangs
        };

        dmc.getDistanceMatrix(distanceMatrixRequest, function (gDistanceMatrixResponse, gDistanceMatrixStatus) {
            if(google.maps.DistanceMatrixStatus.OK) {
                $def.resolve(distanceMatrixToArray(gDistanceMatrixResponse));
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
                var distance = me.getDistanceFromRoute(directionsResult);
                console.log('distance between', startModel.get('name'), 'and', destModel.get('name'), 'is', distance);
                me.distances[startIndex] = distance;
                $def.resolve(directionsResult);
            }
            else {
                $def.reject(status);
            }
        });

        return $def;
    }
});
