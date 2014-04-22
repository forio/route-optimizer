var BaseView = require('views/waypoint-item-view');
module.exports = BaseView.extend({


    selectPoint: function() {
        var isSelected = this.model.get('selected');
        var method = (isSelected) ? 'addClass' : 'removeClass';
        this.$el[method]('selected');

        this.marker.setAnimation(google.maps.Animation.BOUNCE);

        this.marker.setIcon({
            fillColor: 'white'
        });
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
