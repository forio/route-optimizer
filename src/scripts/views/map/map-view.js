var MarkerView = require('views/waypoint-marker-view');

var API_KEY = "***REMOVED***";

module.exports = Backbone.View.extend({
   render: function() {
        this.renderSelf();
        this.renderWaypoints();

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
   }
});
