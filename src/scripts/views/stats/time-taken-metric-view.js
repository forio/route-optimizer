var BaseView = require('views/metric-view');


module.exports = BaseView.extend({
    caption: 'Travel Time',
    unit: 'hours',

    getData: function (collection) {
        return _.reduce(collection.routes, function(memo, val) {
              return memo + val.time;
        }, 0);

    }
});
