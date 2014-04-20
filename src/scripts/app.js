'use strict';

var WayPoints = require('collections/waypoints-collection');
var WayPointsListView = require('views/waypoint-list-view');

var OriginalMapView = require('views/original-map-view');
var OptimizedMapView = require('views/optimized-map-view');


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


    var originalMapView = new OriginalMapView({
        collection: wp,
        className: 'A'
    });
    $('#content .maps').append(originalMapView.render().$el);

    var optimizedMapView = new OptimizedMapView({
        collection: wp,
        className: 'other'
    });
    $('#content .maps').append(optimizedMapView.render().$el);

    window.wp = wp;
});
