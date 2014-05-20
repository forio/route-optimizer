var BaseView = require('views/waypoint-item-view');
module.exports = BaseView.extend({

    initialize: function() {
        _.bindAll(this, 'toggleSelected');

        this.model.on('change:latitude', this.updateLocation, this);
        BaseView.prototype.initialize.apply(this, arguments);
    },

    getIcon: function () {
        var type = this.iconType();
        var iconDefaults = {
            url: 'styles/assets/marker-sprite-shadow.png',
            size: new google.maps.Size(40,40)
        };

        var overrides = {
            flag: {
                anchor: new google.maps.Point(22,40),
                origin: new google.maps.Point(0,0),
                type: 'flag'

            },
            selected: {
                anchor: new google.maps.Point(32,37),
                origin: new google.maps.Point(0,80),
                type: 'selected'
            },
            base: {
                anchor: new google.maps.Point(32,37),
                origin: new google.maps.Point(0,40),
                type: 'base'
            }
        };
        return $.extend({}, iconDefaults, overrides[type]);
    },

    iconType: function () {
        var isSelected = this.model.get('selected');
        var coll = this.model.collection;
        var modelIndex = coll.indexOf(this.model);

        if (modelIndex === 0) {
            return 'flag';
        } else {
            return (isSelected) ? 'selected' : 'base';
        }
    },

    selectPoint: function() {
        this.marker.setIcon(this.getIcon());
    },

    handleRemove: function () {
        //Removes it
        this.marker.setMap(null);
        BaseView.prototype.handleRemove.apply(this, arguments);
    },

    toggleSelected: function() {
        var isSelected = this.marker.getIcon().type === 'selected';
        this.model.set({selected: !isSelected});
    },

    updateLocation: function() {
        var myLatlng = this.model.getLatLong();
        this.marker.setPosition(myLatlng);
    },

   render: function() {
        var myLatlng = this.model.getLatLong();
        this.marker = new google.maps.Marker({
            position: myLatlng,
            map: this.map,
            icon: this.getIcon(),
            title: this.model.get('name')
        });
        google.maps.event.addListener(this.marker, 'mouseover', this.toggleSelected);
        google.maps.event.addListener(this.marker, 'mouseout', this.toggleSelected);

       return this;
   }
});
