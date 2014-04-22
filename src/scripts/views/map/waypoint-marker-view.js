var BaseView = require('views/waypoint-item-view');
module.exports = BaseView.extend({

   render: function() {
        var myLatlng = new google.maps.LatLng(this.model.get('latitude'), this.model.get('longitude'));
        var marker = new google.maps.Marker({
              position: myLatlng,
              map: this.map,
              title: this.model.get('name')
          });
       return this;
   }
});
