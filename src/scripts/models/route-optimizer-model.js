var BaseModel = require('models/base-model');
var WaypointsCollection = require('collections/waypoints-collection');

var operationsService = require('services/epicenter-operations-service');

module.exports = BaseModel.extend({
    defaults: {
      original: null,
      optimized: null
    },

    initialize: function (options) {
        // if (!options || !options.original) {
        //     var original = new WaypointsCollection();
        //     this.set('original', original);
        // }
        // if (!options || !options.optimized) {
        //     this.set('optimized', new WaypointsCollection( this.get('original').models));
        // }
        BaseModel.prototype.initialize.apply(this, arguments);
    },

    getOptimizedValues: function (distanceMatrix) {
        return operationsService.do('solve', distanceMatrix);
    },

    optimize: function () {
        var or = this.get('original');
        var preOptimized = or.clone();
        var me = this;
        var $def = $.Deferred();

        // me.set('optimized', preOptimized);

        or.getDistanceMatrix().then(function (distanceMatrix) {
            me.getOptimizedValues(distanceMatrix).then (function (optimizedIndices) {
                console.log("old order", preOptimized.pluck('name'));

                optimizedIndices.pop(); // Model returns back 0 as last item, don't need that

                me.get('optimized').each(function (model, index){
                    var newOrder = _.indexOf(optimizedIndices, index);
                    model.set('order', newOrder, {silent: true});
                });
                me.get('optimized').sort();
                console.log("new order", optimizedIndices, preOptimized.pluck('name'));
                $def.resolve(me.get('optimized'));
            });
        });
        return $def;
    },

    getLatLong: function() {
        var myLatlng = new google.maps.LatLng(this.get('latitude'), this.get('longitude'));
        return myLatlng;
    }

});
