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
        gResult: null,
        to: ''

        // distance: function() {
        //     return getMetricSumFromRoute(this.get('gResult'), 'distance');
        // },
        // time: function() {
        //     return getMetricSumFromRoute(this.get('gResult'), 'duration');
        // }
    }
});
