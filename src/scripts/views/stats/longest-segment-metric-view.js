var BaseView = require('views/metric-view');

module.exports = BaseView.extend({
    caption: 'Longest Segment',
    unit: 'miles',
    getOriginal: function () {
       return 5;
    },
    getOptimized: function () {
       return 6;
    }
});
