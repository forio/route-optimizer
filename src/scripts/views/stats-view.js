var MetricView = require('views/metric-view');
var BaseView = require('views/base-view');

module.exports = BaseView.extend({
    render: function() {
        this.$el.empty();

        var dtView = new MetricView({
            caption: 'Distance Traveled',
            unit: 'miles',
            original: this.original,
            optimized: this.optimized
        });
        this.$el.append(dtView.render().$el);

        var longestSegmentView = new MetricView({
            caption: 'Longest Segment',
            unit: 'miles',
            original: this.original,
            optimized: this.optimized
        });
        this.$el.append(longestSegmentView.render().$el);

        var travelTimeView = new MetricView({
            caption: 'Travel Time',
            unit: 'hours',
            original: this.original,
            optimized: this.optimized
        });
        this.$el.append(travelTimeView.render().$el);

        return this;
    }
});
