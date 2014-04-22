var BaseView = require('views/base-view');

var factorial = function(val) {
    return (val === 1) ? val : val * factorial(val - 1);
};

module.exports = BaseView.extend({
    template: require('templates/stats'),

    subViews: [
        require('views/distance-traveled-metric-view'),
        require('views/longest-segment-metric-view'),
        require('views/time-taken-metric-view')
    ],

    render: function() {
        this.renderSelf();
        this.renderMetrics(this.$('.main'));
        return this;
    },
    renderSelf: function() {
        var points = this.model.get('original').size();

        this.$el.html(this.template({
            stops: points,
            possibleRoutes: factorial(points)
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
