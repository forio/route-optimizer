var BaseView = require('views/waypoint-list-item-view');

var geocoder;

module.exports = BaseView.extend({
    template: require('templates/editable-list-item'),

    events: {
        'keypress :text': 'handleInput',
        'click button': 'handleDirectionComplete'
    },

    initialize: function () {
        geocoder = new google.maps.Geocoder();
        BaseView.prototype.initialize.apply(this, arguments);
    },

    handlePointChange: function () {

    },

    handleDirectionComplete: function (evt) {
        evt.preventDefault();

        var address = this.$(':text').val();
        var me = this;
        geocoder.geocode({ 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var bestResult = results[0];

                var prettyName = bestResult.formatted_address.split(',')[0];
                me.model.set({
                    name: prettyName,
                    latitude: bestResult.geometry.location.lat(),
                    longitude: bestResult.geometry.location.lng(),
                    result: results
                });
            }
            else {

            }
        });

    },

    handleInput: function(evt) {
        var $target = $(evt.target);
        this.model.set('name', $target.val());
    }

});
