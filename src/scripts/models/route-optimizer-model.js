var BaseModel = require('models/base-model');
var WaypointsCollection = require('collections/google-maps-waypoints-collection');
var WaypointLoader = require('../collections/loader/waypoint-loader');

var operationsService = require('services/epicenter-operations-service');

module.exports = BaseModel.extend({
    defaults: {
        original: null,
        optimized: null,

        //Already has optimal route
        generated: false,

        currentScenario: '',

        waypoints: function () {
            return this.get('original').getValidModels().length;
        },

        possibleRoutes: function () {
            var factorial = function(val) {
                return (val <= 1) ? val : val * factorial(val - 1);
            };

            var waypoints = this.get('waypoints');
            var possiblities = factorial(waypoints);
            return possiblities;
        }
    },

    initialize: function () {
        var wp = new WaypointsCollection();
        this.set('original', wp);

        var op = wp.clone();
        op.name = "optimized";
        this.set('optimized', op);

        wp.on('add', function () {
            op.reset(wp.getValidModels());
        });

        this.on('change:currentScenario', this.load, this);
        BaseModel.prototype.initialize.apply(this, arguments);
    },


    load: function () {
        this.get('original').reset();
        var dataset = this.get('currentScenario');
        var factory = new WaypointLoader();
        var loader = factory.loaderFactory(dataset);

        var me = this;
        loader.fetch(this.get('original'), {reset: true, model: this}).then(function (data) {
            // Don't use data directly because some loaders parse the incoming data, use the original collection data instead
            var waypoints = me.get('original').toArray();
            me.get('optimized').reset(waypoints);
            me.trigger('load', waypoints);
            me.set('generated', false);
        });
    },

    getOptimizedValues: function (distanceMatrix) {
        return operationsService.do('solve', distanceMatrix);
    },

    optimize: function () {
        var or = this.get('original');
        var me = this;
        var $def = $.Deferred();

        var optimizeFail = function () {
            $def.reject();
        };

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
                me.set('generated', true);

                $def.resolve(me.get('optimized'));
            }).fail(optimizeFail);
        }).fail(optimizeFail);
        return $def;
    }

});
