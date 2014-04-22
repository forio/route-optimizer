var BaseView = require('views/base-view');

module.exports = BaseView.extend({
    events: {
        'click': 'toggleSelected'
    },

    initialize: function() {
        this.model.on('change:selected', this.selectPoint, this);
        BaseView.prototype.initialize.apply(this, arguments);
    },

    selectPoint: function() {
        var isSelected = this.model.get('selected');
        var method = (isSelected) ? 'addClass' : 'removeClass';
        this.$el[method]('selected');
    },

    toggleSelected: function() {
        this.model.set({selected: !this.$el.hasClass('selected')});
    },

    getData : function() {
        return this.model.toJSON();
    },

    render: function() {
        var data = this.getData();
        var rendered = (this.template) ? this.template(data) : data;
        this.$el.html(rendered);
        return this;
    }
});
