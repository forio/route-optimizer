var MarkerView = require('views/waypoint-marker-view');

var API_KEY = "***REMOVED***";

module.exports = Backbone.View.extend({

   initialize: function() {


   },

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
          var map = new google.maps.Map(this.el,mapOptions);

        return this;
   },

   renderWaypoints: function() {
        this.collection.each(function(mdl) {
            var mv = new MarkerView({
                model: mdl
            });

            this.$el.append(mv.render().$el);
        }, this);
        return this;
   }
});
