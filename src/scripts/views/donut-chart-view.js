var BaseView = require('views/base-view');

Contour.export('donutTextOneValue', function (data, layer, options) {
    var val = data[0].data[0].y;
    var text = (val !== 0) ? (val * 100) + '%' : '';
    var textEl = layer.append('text')
                    .attr('class', 'center-text')
                    .attr('x', 12)
                    .attr('y', 43)
                    .text(text);

    // var bounds =  _.nw.textBounds(data[0].data[visibleIndex].y, '.center-text');
});
module.exports = BaseView.extend({
    template: require('templates/donut-chart'),

    render: function () {
        if (this.value && this.value !== Infinity) {
            this.renderSelf();
            this.renderChart();
        }
        else {
            this.$el.empty();
        }
    },
    renderSelf: function () {
        this.$el.html(this.template());
    },
    renderChart: function() {
        var data = [{ x: 'Gain', y: this.value}, { x: 'Rest', y: 1 - this.value }];
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
