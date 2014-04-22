var BaseView = require('views/metric-view');


module.exports = BaseView.extend({
    caption: 'Travel Time',
    unit: 'hours',

    getOriginal: function () {
       return 5;
    },
    getOptimized: function () {
       return 6;
    }
});
