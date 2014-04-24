var BaseView = require('views/metric-view');


module.exports = BaseView.extend({
    caption: 'Distance Traveled',
    unit: 'miles',

    formatData: function (meters) {
        var MILE_CONVERSION_FACTOR = 0.000621371;
        var miles = meters * MILE_CONVERSION_FACTOR;

        return d3.format(',.1f')(miles);
    },

    getData: function (collection) {
        return _.reduce(collection.routes, function(memo, val) {
            return memo + val.distance;
        }, 0);

    }

});
