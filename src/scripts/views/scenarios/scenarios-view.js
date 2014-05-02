
module.exports = Backbone.View.extend({
    template: require('templates/scenarios'),

    scenarios: {
        'art-gallery': 'San Francisco Art Gallery',
        'book-crawl': 'San Francisco Book Crawl',
        'sf-sightseeing': 'San Francisco Sight-Seeing'
    },

    events: {
        'change select': 'handleScenarioSelect'
    },

    handleScenarioSelect: function (evt) {
        var url = $(evt.target).val();
    },

    render: function() {
        this.$el.html(this.template({scenarios: this.scenarios}));
        return this;
    }
});
