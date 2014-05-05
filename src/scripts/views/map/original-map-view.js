var BaseView = require('views/map-view');

module.exports = BaseView.extend({
    initialize: function () {
        this.collection.on('add', this.renderDirections, this);
        BaseView.prototype.initialize.apply(this, arguments);
    }

});
