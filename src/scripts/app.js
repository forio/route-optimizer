'use strict';

var WayPoints = require('collections/waypoints-collection');
var WayPointsListView = require('views/waypoint-list-view');


$(function() {

    var wp = new WayPoints([
            {name: "A", latitude:1, longitude:2},
            {name: "B", latitude:1, longitude:2},
            {name: "C", latitude:1, longitude:2},
            {name: "D", latitude:1, longitude:2},
            {name: "E", latitude:1, longitude:2}
        ]);
    var wpListView = new WayPointsListView({
        collection: wp,
        className: 'waypoints'
    });
    $('#content .side').append(wpListView.render().$el);

    window.wp = wp;

});
