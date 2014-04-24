var BaseView = require('views/map-view');

module.exports = BaseView.extend({
    events: {
        'click': 'handleGenerate'
    },

    gRouteOptions: {
        polylineOptions: {
            strokeColor: '#e6a640'
        }
    },

    initialize: function () {
        this.collection.on('sort', this.renderDirections, this);
        this.collection.on('sort', this.removeOverlay, this);
        this.collection.on('reset', this.renderWaypoints, this);
        BaseView.prototype.initialize.apply(this, arguments);
    },
    render: function() {

        this.renderSelf();
        this.renderWaypoints();
        return this;
    },
    removeOverlay: function () {
        this.$el.addClass('generated');
    },
    handleGenerate: function () {
        if (!this.$el.hasClass('generated')) {
            var me = this;
            this.model.optimize();
        }
    }
});
