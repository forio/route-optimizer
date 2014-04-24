var BaseView = require('views/base-view');

Contour.export('donutTextOneValue', function (data, layer, options) {
    var val = data[0].data[0].y;
    var text = (val !== 0) ? parseInt( val * 100, 10) + '%' : '';
    var textEl = layer.append('text')
                    .attr('class', 'center-text')
                    .attr('x', 12)
                    .attr('y', 43)
                    .text(text);

    // var bounds =  _.nw.textBounds(data[0].data[visibleIndex].y, '.center-text');
});
module.exports = BaseView.extend({
    template: require('templates/donut-chart'),

    initialize: function () {
           this.original = this.model.get('original');
           this.optimized = this.model.get('optimized');

           this.original.on('routesRecalculated', this.render, this);
           this.optimized.on('routesRecalculated', this.render, this);

           BaseView.prototype.initialize.apply(this, arguments);
    },

    getData: function () {
        var originalVal = this.dataSource(this.original);
        var optimizedVal = this.dataSource(this.optimized);

        var difference = optimizedVal / originalVal;
        return difference;
     },

    render: function () {
        var value = this.getData();
        if (value && value !== Infinity) {
            this.renderSelf();
            this.renderChart(value);
        }
        else {
            this.$el.empty();
        }
    },
    renderSelf: function () {
        this.$el.html(this.template());
    },
    renderChart: function(value) {
        var data = [{ x: 'Gain', y: 1- value}, { x: 'Rest', y: value }];
        if (!this.graph) {
            this.graph =  new Contour({
                el: this.$('.graph').get(0),
                chart: {
                    width: 70,
                    height: 70
                },
                pie: {
                    piePadding: 0,
                    innerRadius: 28,
                    outerRadius: 35
                    // innerRadius: 28,
                    // outerRadius: 35
                },
                tooltip: {
                    formatter: function(d) {
                        return d.data.x + ': ' + formatter(d.data.y);
                    }
                }
            })
            .pie();
        }

        this.graph
            .setData(data)
            .donutTextOneValue(data)
            .render();

        return this;
   }
});
