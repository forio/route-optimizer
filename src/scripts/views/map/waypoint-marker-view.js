var BaseView = require('views/waypoint-item-view');
module.exports = BaseView.extend({


    selectPoint: function() {
        this.marker.setAnimation(google.maps.Animation.BOUNCE);

        // this.marker.setIcon({
        //     fillColor: 'white'
        // });
    },

    handleRemove: function () {
        //Removes it
        this.marker.setMap(null);
        BaseView.prototype.handleRemove.apply(this, arguments);
    },

   render: function() {
        var myLatlng = this.model.getLatLong();
         this.marker = new google.maps.Marker({
              position: myLatlng,
              map: this.map,
              title: this.model.get('name')
          });
       return this;
   }
});
