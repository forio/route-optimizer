var MarkerView = require('views/waypoint-marker-view');

module.exports = Backbone.View.extend({
   render: function() {
        this.renderSelf();
        this.renderWaypoints();
        // this.renderDirections();
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

   renderDirections: function() {
        var me = this;
        for (var i=0; i< this.collection.size() - 1; i++) {
            this.collection.getDirections(i, i+1).then(function(route){
                var directionsDisplay = new google.maps.DirectionsRenderer({
                    map: me.map,
                    preserveViewport: true,
                    draggable: false
                });
                directionsDisplay.setDirections(route);
            });
        }
   }
});
