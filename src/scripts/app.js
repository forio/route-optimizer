var Router = require('./router');
var base = require('./base');

var router = new Router({
    app: base
});
Backbone.history.start({ pushState: false, root: '/'});
