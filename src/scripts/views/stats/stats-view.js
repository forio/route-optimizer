var BaseView = require('views/base-view');

module.exports = BaseView.extend({
    template: require('templates/stats'),

    subViews: [
        require('views/distance-traveled-metric-view'),
        require('views/longest-segment-metric-view'),
        require('views/time-taken-metric-view')
    ],

    initialize: function () {
        var original = this.model.get('original');

        original.on('add', this.renderOverview, this);
        this.model.on('load', this.renderOverview, this);

        BaseView.prototype.initialize.apply(this, arguments);
    },

    render: function() {
        this.renderSelf();
        this.renderOverview();
        this.renderMetrics();
        return this;
    },
    renderSelf: function () {
          this.$el.empty();
          this.$el.append('<div class="side"> </div>');
          this.$el.append('<div class="main"> </div>');
      },
    renderOverview: function ($el) {
        this.$('.side').html(this.template({
            stops: this.model.get('waypoints'),
            possibleRoutes: d3.format(',f')(this.model.get('possibleRoutes'))
        }));
    },
    renderMetrics: function($el) {
        _(this.subViews).each(function (View) {
            var view = new View({model: this.model});
            this.$('.main').append(view.render().$el);

        }, this);
        return this;
    }
});
