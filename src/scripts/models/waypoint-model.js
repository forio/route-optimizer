module.exports = Backbone.Model.extend({
    defaults: {
        latitude: '',
        longitude: '',
        name: '',
        selected: false,

        //order of waypoint in list
        order: null
    },

    getLatLong: function() {
        var myLatlng = new google.maps.LatLng(this.get('latitude'), this.get('longitude'));
        return myLatlng;
    }

});
