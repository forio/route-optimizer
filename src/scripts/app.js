'use strict';

var WayPoints = require('collections/google-maps-waypoints-collection');
var WayPointsListView = require('views/waypoint-list-view');

var OriginalMapView = require('views/original-map-view');
var OptimizedMapView = require('views/optimized-map-view');

var StatsView = require('views/stats-view');
var CodeView = require('views/code-view');

var Optimizer = require('models/route-optimizer-model');

$(function() {
    var wp = new WayPoints({});
    wp.fetch().then(function() {

        var optimizer = new Optimizer({
            original: wp,
            optimized: wp.clone()
        });
        window.optimizer = optimizer;

        var wpListView = new WayPointsListView({
            collection: optimizer.get('original'),
            className: 'waypoints'
        });
        $('#content .side').append(wpListView.render().$el);


        var originalMapView = new OriginalMapView({
            collection: optimizer.get('original'),
            el: $('.maps .original')
        });
        originalMapView.render();

        var optimizedMapView = new OptimizedMapView({
            collection: optimizer.get('optimized'),
            model: optimizer,
            el: $('.maps .optimized .map')
        });
        optimizedMapView.render();


        var statsView = new StatsView({
            model: optimizer,
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
