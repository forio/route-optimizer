'use strict';

var WayPoints = require('collections/google-maps-waypoints-collection');
var WayPointsListView = require('views/waypoint-list-view');

var OriginalMapView = require('views/original-map-view');
var OptimizedMapView = require('views/optimized-map-view');

var StatsView = require('views/stats-view');
var CodeView = require('views/code-view');

$(function() {

    window.ops = require('services/epicenter-operations-service');
    window.run = require('services/epicenter-runs-service');

    var wp = new WayPoints({});
    wp.fetch().then(function() {

        var wpListView = new WayPointsListView({
            collection: wp,
            className: 'waypoints'
        });
        $('#content .side').append(wpListView.render().$el);


        // var originalMapView = new OriginalMapView({
        //     collection: wp,
        //     className: 'A'
        // });
        // $('#content .maps').append(originalMapView.render().$el);

        // var optimizedMapView = new OptimizedMapView({
        //     collection: wp,
        //     className: 'other'
        // });
        // $('#content .maps').append(optimizedMapView.render().$el);

        var statsView = new StatsView({
            original: wp,
            optimized: wp,
            el: $('#stats')
        });
        statsView.render();

        var cv = new CodeView({
            el: $('#how-we-did-it .main')
        });
        cv.render();

        window.wp = wp;
    });
});
