var BaseView = require('views/base-view');

var $progressIndicator = null;
var $lastProgressItem = null;

var progressText = {
    'distance_matrix': 'Analyzing <strong> <%= waypoints %> </strong> locations.',
    'optimze': 'Calculating Optimized Route: Evaluating <strong> <%= possibleRoutes %> </strong> possible routes.',
    'drawing': 'Plotting Optimized Route.'
};

module.exports = BaseView.extend({
    template: require('templates/loader'),

    events: {
        'click': 'handleGenerate'
    },

    initialize: function () {
        this.model.get('optimized').on('sort', this.removeOverlay, this);
        BaseView.prototype.initialize.apply(this, arguments);
    },

    addProgressItem: function (key) {
        if ($lastProgressItem) {
            $lastProgressItem.removeClass('progress').addClass('complete');
        }
        var text = _.template(progressText[key], this.model.toJSON());
        $lastProgressItem = $('<li class="progress">  ' + text + ' </li>');
        $lastProgressItem.appendTo(this.$('.steps'));
    },
    clearProgress: function (key) {
        this.$('.steps').empty();
    },

    render: function() {
        this.$el.html(this.template());
        return this;
    },
    removeOverlay: function () {
        this.$el.removeClass('in-progress');
        this.$el.addClass('generated');

        this.model.set('generated', true);

        $('.generate h3').text("Generate Optimized");

    },
    handleGenerate: function () {
        if (!this.model.get('generated')) {
            this.$el.addClass('in-progress');
            $('.generate h3').text("Generating..");
            $progressIndicator = this.model.optimize();

            var me = this;
            $progressIndicator.progress(function (type) {
                me.addProgressItem(type);
            });
        }
    }
});
