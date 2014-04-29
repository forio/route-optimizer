var BaseView = require('views/metric-view');

module.exports = BaseView.extend({
    caption: 'Longest Segment',
    unit: 'Miles',

    metric: 'longestSegment',

    formatData: function (meters) {
        if (!meters || meters < 0) {
            meters = 0;
        }

        var MILE_CONVERSION_FACTOR = 0.000621371;
        var miles = meters * MILE_CONVERSION_FACTOR;

        return d3.format(',.1f')(miles);
    }
});
