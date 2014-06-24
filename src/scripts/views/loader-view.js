var BaseView = require('views/base-view');

var $progressIndicator = null;
var $lastProgressItem = null;

var progressText = {
    'distance_matrix': 'Analyzing <strong> <%= waypoints %> </strong> locations.',
    'optimze': 'Evaluating <strong> <%= possibleRoutes %> </strong> possible routes.',
    'drawing': 'Plotting Optimized Route.'
};

module.exports = BaseView.extend({
    template: require('templates/loader'),

    events: {
        'click': 'handleGenerate'
    },

    initialize: function () {
        this.model.on('change:generated', this.handleGenerateChange, this);
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

    resetView: function () {
        this.$el.removeClass('generated');
        this.$el.removeClass('in-progress');
        this.render();
    },

    render: function() {
        this.$el.html(this.template());
        return this;
    },
    handleGenerate: function () {
        if (!this.model.get('generated')) {
            this.$el.addClass('in-progress');
            this.$('.steps').empty();

            // $('.generate h3').text("Generating..");
            $progressIndicator = this.model.optimize();

            var me = this;
            $progressIndicator.progress(function (type) {
                me.addProgressItem(type);
            }).fail(_.bind(this.resetView, this));
        }
    },

    handleGenerateChange: function () {
        if (!this.model.get('generated')) {
            this.$el.removeClass('generated');
            // $('.generate h3').text("Generating..");
        }
        else {
            this.$el.removeClass('in-progress');
            this.$el.addClass('generated');
            // this.$('.generate h3').text("Generate Optimized");
        }
    }
});
