var BaseView = require('views/base-view');

var $progressIndicator = null;

module.exports = BaseView.extend({
    template: require('templates/loader'),

    events: {
        'click': 'handleGenerate'
    },

    initialize: function () {
        this.model.get('optimized').on('sort', this.removeOverlay, this);
        BaseView.prototype.initialize.apply(this, arguments);
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

            $progressIndicator.progress(function () {
                console.log(arguments);
            });
        }
    }
});
