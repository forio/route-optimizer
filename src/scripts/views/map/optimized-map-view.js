var BaseView = require('views/map-view');

module.exports = BaseView.extend({
    gRouteOptions: {
        polylineOptions: {
            strokeColor: '#e6a640'
        }
    },
    initialize: function () {
        this.collection.on('sort', this.renderDirections, this);
        this.collection.on('reset', this.render, this);
        BaseView.prototype.initialize.apply(this, arguments);
    },

    handleReset: function () {
        this.renderWaypoints();
    },

    render: function() {

        this.renderSelf();
        this.renderWaypoints();
        this.fitBounds();
        this.clearRoutes();
        return this;
    }
});
