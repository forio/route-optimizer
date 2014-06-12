var BaseView = require('views/map-view');

module.exports = BaseView.extend({
    initialize: function () {
        this.collection.on('change:latitude', this.handleLatUpdate, this);
        BaseView.prototype.initialize.apply(this, arguments);
    },

    handleLatUpdate: function (model, value) {
        if (value) {
            this.updateWaypoints();
        }
    },

    updateWaypoints: function () {
        this.renderWaypoints();
        this.renderDirections();
    }

});
