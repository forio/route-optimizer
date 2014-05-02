var Router = require('./router');
var AppView = require('views/app-view');
var WayPoints = require('collections/google-maps-waypoints-collection');

$(function() {
    var wp = new WayPoints();


    var app = new AppView({
        collection: wp,
        el: 'body'
    });
    app.render();

    var router = new Router({
        app: app
    });

    Backbone.history.start({ pushState: false, root: '/'});

});

