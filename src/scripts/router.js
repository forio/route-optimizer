module.exports = (function() {
    var app = ('./app.js');

    return Backbone.Router.extend({
        routes: {
            '': 'dashboard',
            ':theme': 'dashboard'
        },

        initialize: function (options) {
            this.app = options.app;
        },

        dashboard: function (routeID) {
            this.app(routeID);
        }
    });
}());
