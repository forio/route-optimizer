var BaseModel = require('models/waypoint-model');

module.exports = BaseModel.extend({
    defaults: {
        latitude: '',
        longitude: '',
        name: '',
        selected: false
    },

    getLatLong: function() {
        var myLatlng = new google.maps.LatLng(this.get('latitude'), this.get('longitude'));
        return myLatlng;
    }
});
