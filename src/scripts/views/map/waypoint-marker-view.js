var BaseView = require('views/waypoint-item-view');
module.exports = BaseView.extend({
   getData: function() {
        return this.model.get('name');
   }
});
