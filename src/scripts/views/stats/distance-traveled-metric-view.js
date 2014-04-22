var BaseView = require('views/metric-view');


module.exports = BaseView.extend({
    caption: 'Distance Traveled',
    unit: 'miles',

    getData: function (collection) {
        return _.reduce(collection.routes, function(memo, val) {
            return memo + val.distance;
        }, 0);

    }

});
