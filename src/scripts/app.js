var Router = require('./router');
var AppView = require('views/app-view');
var Optimizer = require('models/route-optimizer-model');

$(function() {
    var om = new Optimizer();
    var router = new Router({
        model: om
    });

    var app = new AppView({
        model: om,
        el: 'body',
        router: router
    });
    app.render();



    Backbone.history.start({ pushState: false, root: '/'});

});

