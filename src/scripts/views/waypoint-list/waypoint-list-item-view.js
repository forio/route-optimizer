module.exports = Backbone.View.extend({
    tagName: 'li',
    template: require('templates/waypoint-list-item-template'),

    initialize: function() {


    },

    render: function() {
        var data = this.model.toJSON();
        this.$el.html(this.template(data));
        return this;
    }
});
