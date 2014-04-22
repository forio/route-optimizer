var BaseView = require('views/base-view');

Contour.export('donutTextOneValue', function (data, layer, options) {
    var visibleIndex = data[0].data[0].y < data[0].data[1].y ? 1 : 0;
    var textEl = layer.append('text')
                    .attr('class', 'center-text')
                    .attr('x', 12)
                    .attr('y', 43)
                    .text((data[0].data[visibleIndex].y * 100) + '%');

    // var bounds =  _.nw.textBounds(data[0].data[visibleIndex].y, '.center-text');
});
module.exports = BaseView.extend({
   render: function() {
        var data = [{ x: 'Gain', y: this.value}, { x: 'Rest', y: 1 - this.value }];
        new Contour({
                el: this.el,
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
            .pie(data)
            .donutTextOneValue(data)
            .render();
        return this;
   }
});
