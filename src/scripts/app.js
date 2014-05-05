var Router = require('./router');
var AppView = require('views/app-view');
var Optimizer = require('models/route-optimizer-model');

$(function() {
    var om = new Optimizer();
    window.om = om;
    var app = new AppView({
        model: om,
        el: 'body'
    });
    app.render();

    var router = new Router({
        model: om
    });

    Backbone.history.start({ pushState: false, root: '/'});

});

