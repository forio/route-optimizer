var MarkerView = require('views/waypoint-marker-view');
var BaseView = Backbone.View;

module.exports = BaseView.extend({

    gDirDisplays: [],
    markers: [],

    gRouteOptions: {},

    initialize: function () {
        // this.collection.on('reset', this.clearMarkers, this);
        BaseView.prototype.initialize.apply(this, arguments);
    },


    addMarker: function (model) {
        var mv = new MarkerView({
            model: model,
            map: this.map
        });
        mv.render();
        this.markers.push(mv);
    },
    clearMarkers: function () {
        _(this.markers).each(function (mv) {
            mv.handleRemove();
        });
        this.markers = [];
    },

    addDirection: function (model) {
        var me = this;
        var newModelIndex = this.collection.indexOf(model);
        if (newModelIndex > 0) {
            this.collection.getDirections(newModelIndex - 1, newModelIndex).done(function (route) {
                me.drawRoute.call(me, route);
            });
        }
    },

    render: function() {
        // this.clearMarkers();

        this.renderSelf();
        this.renderWaypoints();
        this.renderDirections();
        return this;
    },

    renderSelf: function() {
        if (this.map) {
            var bounds = this.getBounds();
            this.map.fitBounds(bounds);

            return this;
        }


        var mapOptions = {
            zoom: 13,
            draggable: false,
            disableDefaultUI: true,
            disableDoubleClickZoom: true,
            scrollwheel: false,
            // center: new google.maps.LatLng(37.772207, -122.450550),
            styles: [{
                featureType: 'road.highway',
                stylers: [{visibility: 'off'}]
            }]

          };
        this.map = new google.maps.Map(this.el,mapOptions);
        this.fitBounds();
        var me = this;
        google.maps.event.addDomListener(window, 'resize', function() {
            var map = me.map;
            me.fitBounds();
            google.maps.event.trigger(map, 'resize');
            map.fitBounds(bounds);
        });
        return this;
    },

    fitBounds: function () {
        var valid = this.collection.getValidModels();
        if (valid.length === 1) {
            this.map.setZoom(13);
            this.map.setCenter(valid[0].getLatLong());
        }
        else {
            var bounds = this.getBounds();
            this.map.fitBounds(bounds);
        }
    },

    renderWaypoints: function() {
        this.clearMarkers();
        this.collection.each(this.addMarker, this);
        return this;
    },

    getBounds: function () {
        var latLongs = _.invoke(this.collection.getValidModels(), 'getLatLong');
        var bounds = new google.maps.LatLngBounds();
        _(latLongs).each(function (latlng) {
            bounds.extend(latlng);
        });
        return bounds;
    },

    drawRoute: function (route) {
        var me = this;
        var directionsDisplay = new google.maps.DirectionsRenderer($.extend({}, {
            map: me.map,
            preserveViewport: true,
            suppressMarkers: true,
            draggable: false
        }, this.gRouteOptions));
        directionsDisplay.setDirections(route.gResult);
        this.gDirDisplays.push(directionsDisplay);
    },

    clearRoutes: function () {
        _(this.gDirDisplays).each(function (gDirectionDisplay){
            gDirectionDisplay.setMap(null);
        });
        this.gDirDisplays = [];
    },

    renderDirections: function() {
        this.clearRoutes();
        // this.collection.each(this.addDirection, this);
        var me = this;
        this.collection.populateAllRoutes().done(function (route){
            if (route.gResult) {
                me.drawRoute.call(me, route);
                me.fitBounds();
            }
        });
    }
});
