module.exports = Backbone.Router.extend({
    routes: {
        '': 'dashboard',
        ':theme': 'dashboard'
    },

    initialize: function (options) {
        this.app = options.model;
    },

    dashboard: function (routeID) {
        if (!routeID) {
            routeID = 'business-deliver';
        }
        this.app.set('currentScenario', routeID);
    }
});
