var MarkerView = require('views/waypoint-marker-view');

module.exports = Backbone.View.extend({
   initialize: function() {


   },

   render: function() {
        this.renderSelf();
        this.renderWaypoints();

        return this;
   },

   renderSelf: function() {
        this.$el.empty();
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
