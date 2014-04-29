var BaseModel = require('models/base-model');


var getMetricSumFromRoute = function (gDirectionsRoutes, metric){
    var sum = 0;
    _(gDirectionsRoutes).each(function(gDirectionsRoute){
        _(gDirectionsRoute).each(function (gDirectionLegs){
            _(gDirectionLegs.legs).each(function (leg) {
                sum += leg[metric].value;
            });
        });
    });
    return sum;
};

module.exports = BaseModel.extend({
    defaults: {
        from: '',
        to: '',

        distance: function() {
            return getMetricSumFromRoute(gDirectionsRoutes, 'distance');
        },
        time: function() {
            return getMetricSumFromRoute(gDirectionsRoutes, 'duration');
        }
    }
});
