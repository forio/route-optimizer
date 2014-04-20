module.exports = Backbone.View.extend({

    initialize: function() {
        this.model.on('change:selected', this.selectPoint, this);
    },

    selectPoint: function() {
        var isSelected = this.model.get('selected');
        var method = (isSelected) ? 'addClass' : 'removeClass';
        this.$el[method]('selected');
    },

    render: function() {
        this.$el.html(this.model.get('name'));
        return this;
    }
});
