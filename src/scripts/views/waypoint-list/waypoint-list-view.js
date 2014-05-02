var ItemView = require('views/waypoint-list-item-view');

module.exports = Backbone.View.extend({
    tagName: 'ul',

   initialize: function() {
        this.collection.on('reset', this.render, this);
   },

   render: function() {
        this.$el.empty();
        this.collection.each(function(mdl) {
            var iv = new ItemView({model: mdl});
            this.$el.append(iv.render().$el);
        }, this);

        //Loop back
        if (this.collection.length) {
            var iv = new ItemView({model: this.collection.at(0)});
            this.$el.append(iv.render().$el);
        }


        return this;
   }
});
