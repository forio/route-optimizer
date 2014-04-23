var BaseView = require('views/map-view');

module.exports = BaseView.extend({

    initialize: function () {
        this.collection.on('sort', this.renderDirections, this);
        this.collection.on('reset', this.renderWaypoints, this);
        BaseView.prototype.initialize.apply(this, arguments);
    },
    render: function() {
        this.renderSelf();
        this.renderWaypoints();
        return this;
    },
});
