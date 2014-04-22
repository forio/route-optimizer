var waypointModel = require('models/google-maps-point-model');
var BaseCollection = require('collections/waypoints-collection');

module.exports = BaseCollection.extend({
    model: waypointModel,

    getMetric: function(metric) {
        return 34;
    },

    getDistanceFromRoute: function(gDirectionsRoutes) {
        // return _.reduce(gDirectionsResult, function(routeMemo, gDirectionsRoute){
        //     return routeMemo + _.reduce(gDirectionsRoute,  function (legMemo, gDirectionLegs){
        //         return legMemo +
        //     });
        // });

        var totalDistance = 0;
        _(gDirectionsRoutes).each(function(gDirectionsRoute){
            _(gDirectionsRoute).each(function (gDirectionLegs){
                _(gDirectionLegs.legs).each(function (leg) {
                    totalDistance += leg.distance.value;
                });
            });
        });
        return totalDistance;
    },

    getDirections: function(startIndex, destIndex) {
        var startModel = this.at(startIndex);
        var destModel = this.at(destIndex);

        var $def = $.Deferred();

        var request = ({
            origin: startModel.getLatLong(),
            destination: destModel.getLatLong(),
            travelMode: 'DRIVING'
        });

        var me = this;
        var ds = new google.maps.DirectionsService();
        ds.route(request, function(directionsResult, status) {
            if (status === 'OK') {
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
