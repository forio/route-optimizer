
module.exports = Backbone.View.extend({
    template: require('templates/scenarios'),
    render: function() {
        this.$el.html(this.template());
        return this;
    }
});
