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
        this.$el.html(this.template({
            caption: this.caption,
            unit: this.unit,
            optimized: 345,
            original: 34
        }));
    },
    renderChart: function() {
        var dv = new DonutView({
            el: this.$('.graph')
        });
        dv.render();
        return this;
    }
});
