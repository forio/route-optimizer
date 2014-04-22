var BaseModel = require('models/base-model');
var WaypointsCollection = require('collections/waypoints-collection');

var operationsService = require('services/epicenter-operations-service');

module.exports = BaseModel.extend({
    defaults: {
      original: null,
      optimized: null
    },

    initialize: function (options) {
        if (!options || !options.original) {
            var original = new WaypointsCollection();
            this.set('original', original);
        }
        if (!options || !options.optimized) {
            var optimized = new WaypointsCollection();
            this.set('optimized', optimized);
        }
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

        me.set('optimized', preOptimized);

        or.getDistanceMatrix().then(function (distanceMatrix) {
            me.getOptimizedValues(distanceMatrix).then (function (optimized) {

                preOptimized.sort(function(){

                });

                $def.resolve(optimized);
            });
        });
        return $def;
    },

    getLatLong: function() {
        var myLatlng = new google.maps.LatLng(this.get('latitude'), this.get('longitude'));
        return myLatlng;
    }

});
