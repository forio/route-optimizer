module.exports = Backbone.View.extend({
    tagName: 'li',
    template: require('templates/waypoint-list-item-template'),

    events: {
        'click': 'toggleSelected'
    },

    initialize: function() {

    },

    toggleSelected: function() {
        this.$el.toggleClass('selected');
        this.model.set({selected: this.$el.hasClass('selected')});
    },

    render: function() {
        var data = this.model.toJSON();
        this.$el.html(this.template(data));
        return this;
    }
});
