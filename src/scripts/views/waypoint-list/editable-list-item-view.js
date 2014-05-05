var BaseView = require('views/waypoint-list-item-view');

module.exports = BaseView.extend({
    template: require('templates/editable-list-item'),

    events: {
        'keypress': 'handleDirectionEntry'
    },

    handlePointChange: function () {

    },

    handleDirectionEntry: function(evt) {
        var $target = $(evt.target);
        this.model.set('name', $target.val());
    }

});
