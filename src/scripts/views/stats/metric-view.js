var DonutView = require('views/donut-chart-view');
var BaseView = require('views/base-view');

module.exports = BaseView.extend({
    template: require('templates/metric'),

    metric: '',
    format: '',
    caption: '',
    unit: '',

    className: 'metric',

    initialize: function () {
        this.original = this.model.get('original');
        this.optimized = this.model.get('optimized');

        this.original.on('routesRecalculated', this.render, this);
        this.optimized.on('routesRecalculated', this.render, this);

        BaseView.prototype.initialize.apply(this, arguments);
    },

    getData: function (collection) {
        return collection.getMetric();
    },
    formatData: function (data) {
        return data;
    },

    render: function() {
        this.renderSelf();
        this.renderChart();
        return this;
    },


    renderSelf: function() {
        var originalVal = this.formatData(this.getData(this.original));
        var optimizedVal = this.formatData(this.getData(this.optimized));

        this.$el.html(this.template({
            caption: this.caption,
            unit: this.unit,
            optimized: optimizedVal,
            original: originalVal
        }));
    },
    renderChart: function() {
       var originalVal = this.getData(this.original);
       var optimizedVal = this.getData(this.optimized);

        var difference = originalVal / optimizedVal;
        if (difference && difference !== Infinity) {
            var dv = new DonutView({
                el: this.$('.graph-container'),
                value: difference
            });
            dv.render();
        }

        return this;
    }
});
