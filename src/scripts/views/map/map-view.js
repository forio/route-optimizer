var MarkerView = require('views/waypoint-marker-view');

module.exports = Backbone.View.extend({
   render: function() {
        this.renderSelf();
        this.renderWaypoints();
        this.renderDirections();
        return this;
   },

   renderSelf: function() {
        var mapOptions = {
            zoom: 13,
            draggable: false,
            disableDefaultUI: true,
            disableDoubleClickZoom: true,
            scrollwheel: false,
            center: new google.maps.LatLng(37.772207, -122.450550)

          };
        this.map = new google.maps.Map(this.el,mapOptions);
        return this;
   },

   renderWaypoints: function() {
        this.collection.each(function(mdl) {
            var mv = new MarkerView({
                model: mdl,
                map: this.map
            });
            mv.render();
        }, this);
        return this;
   },

   drawRoute: function (route) {
        var me = this;
        var directionsDisplay = new google.maps.DirectionsRenderer({
            map: me.map,
            preserveViewport: true,
            draggable: false
        });
        directionsDisplay.setDirections(route.gResult);
   },

   renderDirections: function() {
        var me = this;
        this.collection.populateAllRoutes().then(function (routes){
            _(routes).each(function (route){
                me.drawRoute(route);
            });
        });

        this.collection.getDirections(this.collection.size() - 1, 0).then(this.drawRoute);
   }
});
