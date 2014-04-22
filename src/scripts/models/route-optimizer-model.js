var BaseModel = require('models/base-model');
var WaypointsCollection = require('collections/waypoints-collection');

module.exports = BaseModel.extend({
    defaults: {
      originalRoutes: null,
      optimizedWaypoints: null
    },

    initialize: function () {
        var originalRoutes = new WaypointsCollection();
        var optimizedRoutes = new WaypointsCollection();
        this.set(originalRoutes, originalRoutes);
        this.set(optimizedRoutes, optimizedRoutes);

        BaseModel.prototype.initialize.apply(this, arguments);
    },

    getOptimizedValues: function (distanceMatrix) {
        var $def = $.Deferred();

        $.post('/api/operations', distanceMatrix, function (response) {
            $def.resolve(response);
        });

        return $def;
        //
    },

    optimize: function () {
        var or = this.get(originalRoutes);
        var preOptimized = or.clone();
        var me = this;
        var $def = $.Deferred();

        me.set(optimizedWaypoints, preOptimized);

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
