var BaseView = require('views/metric-view');

module.exports = BaseView.extend({
    caption: 'Longest Segment',
    unit: 'miles',

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
