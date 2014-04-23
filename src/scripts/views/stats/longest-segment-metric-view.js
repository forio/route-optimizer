var BaseView = require('views/metric-view');

module.exports = BaseView.extend({
    caption: 'Longest Segment',
    unit: 'Miles',

    formatData: function (meters) {
        var MILE_CONVERSION_FACTOR = 0.000621371;
        var miles = meters * MILE_CONVERSION_FACTOR;

        return d3.format(',.1f')(miles);
    },

   getData: function (collection) {
        var max =  _.max(collection.routes, function(route) {
            return route.distance;
        }).distance;

        if (!max || max < 0) {
            max = 0;
        }
        return max;
    }
});
