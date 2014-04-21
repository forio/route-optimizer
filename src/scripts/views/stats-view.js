var DonutView = require('views/donut-chart-view');

module.exports = Backbone.View.extend({
    render: function() {
        var dv = new DonutView();
        this.$el.append(dv.render().$el);
        return this;
    }
});
