var BaseView = require('views/base-view');

module.exports = BaseView.extend({
    template: require('templates/stats'),

    subViews: [
        require('views/distance-traveled-metric-view'),
        require('views/longest-segment-metric-view'),
        require('views/time-taken-metric-view')
    ],

    initialize: function () {
        this.model.on('change:waypoints', this.renderSelf, this);
        BaseView.prototype.initialize.apply(this, arguments);
    },

    render: function() {
        this.renderSelf();
        this.renderMetrics(this.$('.main'));
        return this;
    },
    renderSelf: function() {
        var points = this.model.get('original').size();

        this.$el.html(this.template({
            stops: this.model.get('waypoints'),
            possibleRoutes: d3.format(',f')(this.model.get('possibleRoutes'))
        }));
    },
    renderMetrics: function($el) {
        _(this.subViews).each(function (View) {
            var view = new View({model: this.model});
            $el.append(view.render().$el);

        }, this);
        return this;
    }
});
