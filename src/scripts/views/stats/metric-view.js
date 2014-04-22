var DonutView = require('views/donut-chart-view');
var BaseView = require('views/base-view');

module.exports = BaseView.extend({
    template: require('templates/metric'),

    metric: '',
    format: '',
    caption: '',
    unit: '',

    className: 'metric',

    render: function() {
        this.renderSelf();
        this.renderChart();
        return this;
    },

    renderSelf: function() {
        var originalVal = this.original.getMetric(this.metric);
        var optimizedVal = this.optimized.getMetric(this.metric);

        this.$el.html(this.template({
            caption: this.caption,
            unit: this.unit,
            optimized: optimizedVal,
            original: originalVal
        }));
    },
    renderChart: function() {
        var originalVal = this.original.getMetric(this.metric);
        var optimizedVal = this.optimized.getMetric(this.metric);

        var difference = originalVal / optimizedVal;
        var dv = new DonutView({
            el: this.$('.graph'),
            value: difference
        });
        dv.render();
        return this;
    }
});
