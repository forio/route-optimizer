module.exports = Backbone.Router.extend({
    routes: {
        '': 'dashboard',
        ':theme': 'dashboard'
    },

    initialize: function (options) {
        this.app = options.app;
    },

    dashboard: function (routeID) {
        this.app.setScenario(routeID);
    }
});
