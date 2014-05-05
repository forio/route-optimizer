var BaseView = require('views/waypoint-item-view');
module.exports = BaseView.extend({

    initialize: function() {
        _.bindAll(this, 'toggleSelected');

        this.model.on('change:latitude', this.updateLocation, this);

        BaseView.prototype.initialize.apply(this, arguments);
    },

    getIcon: function (type) {
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


    selectPoint: function() {
        var isSelected = this.model.get('selected');

        var iconType = (isSelected) ? 'selected' : 'base';
        this.marker.setIcon(this.getIcon(iconType));
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

        var coll = this.model.collection;
        var modelIndex = coll.indexOf(this.model);
        var iconType = (modelIndex === 0 ) ? 'flag' : 'base';

         this.marker = new google.maps.Marker({
              position: myLatlng,
              map: this.map,
              icon: this.getIcon(iconType),
              title: this.model.get('name')
          });
         google.maps.event.addListener(this.marker, 'mouseover', this.toggleSelected);
         google.maps.event.addListener(this.marker, 'mouseout', this.toggleSelected);

       return this;
   }
});
