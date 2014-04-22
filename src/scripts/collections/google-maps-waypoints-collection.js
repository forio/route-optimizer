var waypointModel = require('models/google-maps-point-model');
var BaseCollection = require('collections/waypoints-collection');

module.exports = BaseCollection.extend({
    model: waypointModel,

    getMetric: function(metric) {
        return 34;
    },

    getDirections: function(startIndex, destIndex) {
        var startModel = this.at(startIndex);
        var destModel = this.get(destIndex);

        // var request = google.maps.DirectionsRequest();

    }
});
