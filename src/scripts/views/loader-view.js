var BaseView = require('views/base-view');

module.exports = BaseView.extend({
    events: {
        'click': 'handleGenerate'
    },

    initialize: function () {
        this.model.get('optimized').on('sort', this.removeOverlay, this);
        BaseView.prototype.initialize.apply(this, arguments);
    },
    render: function() {
        return this;
    },
    removeOverlay: function () {
        this.model.set('generated', true);
        this.$el.addClass('generated');
        $('.generate h3').text("Generate Optimized");

    },
    handleGenerate: function () {
        if (!this.model.get('generated')) {
            $('.generate h3').text("Generating..");
            this.model.optimize();
        }
    }
});
