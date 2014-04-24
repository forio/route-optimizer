
module.exports = Backbone.View.extend({
    template: require('templates/code'),

    render: function() {
        this.$el.html(this.template());
        return this;
    }
});
