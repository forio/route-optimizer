var BaseView = require('views/waypoint-item-view');
module.exports = BaseView.extend({

   render: function() {
        var myLatlng = this.model.getLatLong();
        var marker = new google.maps.Marker({
              position: myLatlng,
              map: this.map,
              title: this.model.get('name')
          });
       return this;
   }
});
