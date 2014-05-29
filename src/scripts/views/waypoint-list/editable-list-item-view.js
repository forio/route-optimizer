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

        this.on('rendered', this.postRender, this);
        BaseView.prototype.initialize.apply(this, arguments);
    },

    handlePointChange: function () {

    },

    handleDirectionComplete: function (evt) {
        evt.preventDefault();

        var address = this.$(':text').val();
        var me = this;
        if (this.model.get('latitude')) {
            this.model.trigger('change:latitude');
        }
        else {
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
        }
    },

    handleInput: function(evt) {
        var $target = $(evt.target);
        this.model.set('name', $target.val());

        if(evt.which == 13) {
            this.$('button').trigger('click');
        }
    },

    postRender: function () {
        var searchBox = new google.maps.places.SearchBox(this.$(':text').get(0), {bounds:  this.map.getBounds()});

        var me = this;
        google.maps.event.addListener(this.map, 'bounds_changed', function() {
            var bounds = me.map.getBounds();
            searchBox.setBounds(bounds);
          });
        return this;
    }

});
