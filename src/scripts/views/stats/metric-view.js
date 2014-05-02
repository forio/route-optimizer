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

        this.original.on('routesRecalculated reset', this.renderTable, this);
        this.optimized.on('routesRecalculated reset', this.renderTable, this);

        BaseView.prototype.initialize.apply(this, arguments);
    },

    getData: function (collection) {
        return collection.getMetric(this.metric);
    },
    formatData: function (data) {
        return data;
    },

    render: function() {
        this.renderSelf();
        this.renderTable();
        this.renderChart();
        return this;
    },

    renderSelf: function () {
        this.$el.empty();
        this.$el.append('<div class="metric-container"> </div>');
        this.$el.append('<div class="graph-container"> </div>');
    },

    renderTable: function() {
        var originalData = this.getData(this.original);
        var optimizedData = this.getData(this.optimized);

        var originalVal = (originalData !== 0) ?  this.formatData(originalData) : '-';
        var optimizedVal = (optimizedData !== 0) ?  this.formatData(optimizedData) : '-';

        this.$('.metric-container').html(this.template({
            caption: this.caption,
            unit: this.unit,
            optimized: optimizedVal,
            original: originalVal
        }));
    },
    renderChart: function() {
        var dv = new DonutView({
            el: this.$('.graph-container'),
            model: this.model,
            dataSource: this.getData
        });
        dv.render();
        return this;
    }
});
