var BaseView = require('views/base-view');

module.exports = BaseView.extend({
    template: require('templates/scenarios'),

    scenarios: {
        'art-gallery': 'San Francisco Art Tour',
        'book-crawl': 'San Francisco Book Crawl',
        'sf-sightseeing': 'San Francisco Sight-Seeing'
    },

    events: {
        'change select': 'handleScenarioSelect'
    },

    handleScenarioSelect: function (evt) {
        var url = $(evt.target).val();
        window.location.hash = url;
    },

    select: function (url) {
        this.$('select').val(url);
    },

    render: function() {
        this.$el.html(this.template({
            scenarios: this.scenarios,
            selected: this.currentLocation
        }));
        return this;
    }
});
