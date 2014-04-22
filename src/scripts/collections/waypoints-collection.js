var waypointModel = require('models/waypoint-model');

module.exports = Backbone.Collection.extend({
    model: waypointModel,

    getMetric: function(metric) {
        return 34;
    }
});
