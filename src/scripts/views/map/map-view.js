var MarkerView = require('views/waypoint-marker-view');

module.exports = Backbone.View.extend({

    gDirDisplays: [],
    gRouteOptions: {},

    initialize: function () {
        this.collection.on('remove', this.handleRouteRemove, this);
        this.collection.on('add', this.handleRouteAdd, this);
    },

    handleRouteRemove: function (model) {
        //TODO:Route between previous and next;

    },

    handleRouteAdd: function (model) {
        //TODO:Get index
        //TODO:Remove previous route between prev and next
        //Add marker

        var newModelIndex = this.collection.indexOf(model);

        this.addMarker(model);
        this.addDirection(model);

        if (newModelIndex  < this.collection.size() - 1) {
            var nextPoint = this.collection.at(newModelIndex + 1);
            this.addDirection(model);
        }
    },

    addMarker: function (model) {
        var mv = new MarkerView({
            model: model,
            map: this.map
        });
        mv.render();
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
        this.renderSelf();
        this.renderWaypoints();
        this.renderDirections();
        return this;
    },

    renderSelf: function() {
        var bounds = this.getBounds();

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
        this.map.fitBounds(bounds);
        var me = this;
        google.maps.event.addDomListener(window, "resize", function() {
            var map = me.map;
            var bounds = me.getBounds();
            map.fitBounds(bounds);
            google.maps.event.trigger(map, "resize");
            map.fitBounds(bounds);
        });
        return this;
    },


    renderWaypoints: function() {
        this.collection.each(this.addMarker, this);
        return this;
    },

    getBounds: function () {
        var latLongs = _.invoke(this.collection.models, 'getLatLong');
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
        directionsDisplay.setDirections(route.get('gResult'));
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
        // console.log('render directs', this.className);
        var me = this;
        this.collection.populateAllRoutes().done(function (routes){
            _(routes).each(function (route){
                me.drawRoute.call(me, route);
            });
        });

        this.collection.getDirections(this.collection.size() - 1, 0).done(function (route) {
            me.drawRoute.call(me, route);
        });
    }
});
