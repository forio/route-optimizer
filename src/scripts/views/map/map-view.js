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
        this.addMarker(model);
        //TODO: Add 2 new routes
    },

    addMarker: function (model) {
        var mv = new MarkerView({
            model: model,
            map: this.map
        });
        mv.render();
    },

    render: function() {
        this.renderSelf();
        this.renderWaypoints();
        this.renderDirections();
        return this;
    },

    renderSelf: function() {
        var ne = new google.maps.LatLng(37.808413, -122.379703);
        var sw = new google.maps.LatLng(37.734054, -122.510681);

        var bounds = new google.maps.LatLngBounds(sw, ne);

        var mapOptions = {
            zoom: 13,
            minZoom: 12,
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
            console.log('resize');
            var map = me.map;
             var center = map.getCenter();
             google.maps.event.trigger(map, "resize");
             map.setCenter(center);
        });
        return this;
    },


    renderWaypoints: function() {
        this.collection.each(this.addMarker, this);
        return this;
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

        // console.log('render directs', this.className);
        var me = this;
        this.collection.populateAllRoutes().then(function (routes){
            _(routes).each(function (route){
                me.drawRoute.call(me, route);
            });
        });

        this.collection.getDirections(this.collection.size() - 1, 0).then(function (route) {
            me.drawRoute.call(me, route);
        });
    }
});
