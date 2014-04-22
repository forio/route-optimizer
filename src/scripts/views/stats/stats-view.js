var MetricView = require('views/metric-view');
var BaseView = require('views/base-view');

var factorial = function(val) {
    return (val === 1) ? val : val * factorial(val - 1);
};

module.exports = BaseView.extend({
    template: require('templates/stats'),

    render: function() {
        this.renderSelf();
        this.renderMetrics(this.$('.main'));
        return this;
    },
    renderSelf: function() {
        var points = this.original.size();

        this.$el.html(this.template({
            stops: points,
            possibleRoutes: factorial(points)
        }));
    },
    renderMetrics: function($el) {
        var dtView = new MetricView({
            caption: 'Distance Traveled',
            unit: 'miles',
            original: this.original,
            optimized: this.optimized
        });
        $el.append(dtView.render().$el);

        var longestSegmentView = new MetricView({
            caption: 'Longest Segment',
            unit: 'miles',
            original: this.original,
            optimized: this.optimized
        });
        $el.append(longestSegmentView.render().$el);

        var travelTimeView = new MetricView({
            caption: 'Travel Time',
            unit: 'hours',
            original: this.original,
            optimized: this.optimized
        });
        $el.append(travelTimeView.render().$el);

        return this;
    }
});
