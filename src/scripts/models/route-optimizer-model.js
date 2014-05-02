var BaseModel = require('models/base-model');
var WaypointsCollection = require('collections/waypoints-collection');

var operationsService = require('services/epicenter-operations-service');

module.exports = BaseModel.extend({
    defaults: {
        original: null,
        optimized: null,
        //Already has optimal route
        generated: false,

        waypoints: function () {
            return this.get('original').size();
        },

        possibleRoutes: function () {
            var factorial = function(val) {
                return (val === 1) ? val : val * factorial(val - 1);
            };

            var waypoints = this.get('original').size();
            var possiblities = factorial(waypoints);
            return possiblities;
        }
    },

    load: function (dataset) {
        if (!dataset) {
            dataset = 'book-crawl';
        }
        this.get('original').url = 'data/' + dataset + '.json';
        return this.get('original').fetch({reset: true});
    },

    getOptimizedValues: function (distanceMatrix) {
        return operationsService.do('solve', distanceMatrix);
    },

    optimize: function () {
        var or = this.get('original');
        var me = this;
        var $def = $.Deferred();


        $def.notify('distance_matrix');
        or.getDistanceMatrix().done(function (distanceMatrix) {
            $def.notify('optimze');
            me.getOptimizedValues(distanceMatrix).done (function (optimizedIndices) {
                $def.notify('drawing');

                optimizedIndices.pop(); // Model returns back 0 as last item, don't need that

                me.get('optimized').each(function (model, index){
                    var newOrder = _.indexOf(optimizedIndices, index);
                    model.set('order', newOrder, {silent: true});
                });
                me.get('optimized').sort();
                $def.resolve(me.get('optimized'));
            });
        });
        return $def;
    }

});
