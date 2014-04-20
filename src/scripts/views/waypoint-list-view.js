var ItemView = require('views/waypoint-list-item-view');

module.exports = Backbone.View.extend({
    tagName: 'ul',

   initialize: function() {


   },

   render: function() {
        this.$el.empty();
        this.collection.each(function(mdl) {
            var iv = new ItemView({model: mdl});
            this.$el.append(iv.render().$el);
        }, this);
        return this;
   }
});
