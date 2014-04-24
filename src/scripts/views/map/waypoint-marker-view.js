var BaseView = require('views/waypoint-item-view');
module.exports = BaseView.extend({



    getIcon: function (type) {
        var iconDefaults = {
            url: 'styles/assets/map-markers/marker-sprite-shadow.png',
            size: new google.maps.Size(40,40)
        };

        var overrides = {
            flag: {
                anchor: new google.maps.Point(22,40),
                origin: new google.maps.Point(0,0),
            },
            selected: {
                anchor: new google.maps.Point(30,40),
                origin: new google.maps.Point(0,80)
            },
            base: {
                anchor: new google.maps.Point(30,40),
                origin: new google.maps.Point(0,40)
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
       return this;
   }
});
