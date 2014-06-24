module.exports = Backbone.View.extend({
    template: require('templates/loading'),
    className: 'loading-container',

    loadingEvents: {
        'routesave': 'Saving Route...',
        'routeload': 'Loading Route...',
    },

    initialize: function() {
        var me = this;
        _.each(this.loadingEvents, function (message, event) {
            me.model.on(event, _.bind(me.showLoading, me, event));
        });
        this.model.on('hideloading', this.hideLoading, this);
    },

    render: function() {
        this.$el.html(this.template());
        return this;
    },

    showLoading: function (eventName) {
        var msg = this.loadingEvents[eventName];
        this.$('.load-message').html(msg);
        this.$el.addClass('loading');
    },

    hideLoading: function () {
        this.$('.load-message').html('');
        this.$el.removeClass('loading');
    }
});
