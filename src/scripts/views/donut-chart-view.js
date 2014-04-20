Contour.export('donutTextOneValue', function (data, layer, options) {
    var visibleIndex = data[0].data[0].y < data[0].data[1].y ? 1 : 0;
    var textEl = layer.append('text')
        .attr('class', 'center-text')
        .attr('x', 29) //29
        .attr('y', 58) //58
        .text((data[0].data[visibleIndex].y));
});

module.exports = Backbone.View.extend({

   initialize: function() {


   },

   render: function() {
        // var data = [{ x: 'Case A', y: 0.82}, { x: 'Case B', y: 0.18 }];

        new Contour({
                el: '.pie-gauge',
                pie: {
                    piePadding: 0,
                    innerRadius: 40,
                    outerRadius: 50
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
