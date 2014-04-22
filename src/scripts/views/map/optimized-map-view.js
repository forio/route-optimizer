var MapView = require('views/map-view');

module.exports = MapView.extend({

   render: function() {
        this.renderSelf();
        this.renderWaypoints();
        return this;
    },
});
