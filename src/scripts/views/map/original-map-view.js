var BaseView = require('views/map-view');

module.exports = BaseView.extend({
    initialize: function () {
        this.collection.on('add', this.handleAdd, this);
        BaseView.prototype.initialize.apply(this, arguments);
    },

    handleAdd: function () {
        this.renderWaypoints();
        this.renderDirections();
    }

});
