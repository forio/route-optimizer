var BaseView = require('views/waypoint-item-view');

module.exports = BaseView.extend({
    tagName: 'li',
    template: require('templates/waypoint-list-item-template'),

    initialize: function() {

        this.model.on('change:name', this.handlePointChange, this);
        BaseView.prototype.initialize.apply(this, arguments);
    },

    handlePointChange: function () {
        return this.render();
    }
});
