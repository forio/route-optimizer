var MetricView = require('views/metric-view');

module.exports = Backbone.View.extend({
    render: function() {
        this.$el.empty();

        var dtView = new MetricView({
            caption: 'Distance Traveled',
            unit: 'miles',
            collection: this.collection
        });
        this.$el.append(dtView.render().$el);

        var longestSegmentView = new MetricView({
            caption: 'Longest Segment',
            unit: 'miles',
            collection: this.collection
        });
        this.$el.append(longestSegmentView.render().$el);

        var travelTimeView = new MetricView({
            caption: 'Travel Time',
            unit: 'hours',
            collection: this.collection
        });
        this.$el.append(travelTimeView.render().$el);

        return this;
    }
});
