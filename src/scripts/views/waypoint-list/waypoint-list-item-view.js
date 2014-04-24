var BaseView = require('views/waypoint-item-view');

module.exports = BaseView.extend({
    tagName: 'li',
    template: require('templates/waypoint-list-item-template'),

});
