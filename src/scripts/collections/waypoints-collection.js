var waypointModel = require('models/waypoint-model');

module.exports = Backbone.Collection.extend({
    model: waypointModel,
    url : '/data/books.json',

    getMetric: function(metric) {
        return 34;
    }
});
