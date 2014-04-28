var waypointModel = require('models/waypoint-model');

module.exports = Backbone.Collection.extend({
    model: waypointModel,

    distances: [],

    comparator: 'order',

    // comparator: function (model){
    //     var order = model.get('order');
    //     if (order === null) {

    //     }
    //  return -(new Date(model.get('lastModified'))).valueOf();
    // },

    getMetric: function(metric) {
        return 34;
    },

    getDirections: function(startIndex, destIndex) {


    }
});
