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

    addLocationToModel: function (model, results) {
        var location = results[0];
        var prettyName =   location.name ? location.name :  location.formatted_address.split(',')[0];
        model.set({
            name: prettyName,
            latitude: location.geometry.location.lat(),
            longitude: location.geometry.location.lng(),
            result: results
        });
    },

    handleDirectionComplete: function (evt) {
        evt.preventDefault();

        var address = this.$(':text').val();
        var me = this;
        if ($.trim(address).toLowerCase() === 'forio') {
            this.model.trigger('change:latitude'); //special casing this
        }
        else {
            geocoder.geocode({ 'address': address, bounds: this.map.getBounds() }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    me.addLocationToModel(me.model, results);
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

        google.maps.event.addListener(searchBox, 'places_changed', function() {
            var places = searchBox.getPlaces();
            me.addLocationToModel(me.model, places);
        });
        return this;
    }

});
