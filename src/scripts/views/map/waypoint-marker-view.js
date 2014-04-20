module.exports = Backbone.View.extend({

   initialize: function() {


   },

   render: function() {
        this.$el.html(this.model.get('name'));
        return this;
   }
});
