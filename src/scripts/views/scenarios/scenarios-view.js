var BaseView = require('views/base-view');

module.exports = BaseView.extend({
    template: require('templates/scenarios'),

    scenarios: {
        'custom': 'Personalized Travel Plan',
        // 'art-gallery': 'San Francisco Art Tour',
        'book-crawl': 'San Francisco Book Crawl',
        'sf-sightseeing': 'San Francisco Sight-Seeing',
        'business-deliver': 'Business Delivery'
    },

    customRoute: {

    },

    events: {
        'change select': 'handleScenarioSelect'
    },

    initialize: function () {
        this.model.on('change:currentScenario', this.select, this);
        this.model.on('change:routeName', this.addCustomRoute, this);
    },

    handleScenarioSelect: function (evt) {
        var url = $(evt.target).val();
        window.location.hash = url;
    },

    addCustomRoute: function (model) {
        var currScenario = model.get('currentScenario');
        this.customRoute = {};
        this.customRoute[currScenario] = model.get('routeName');
        this.render();
    },

    select: function (model) {
        this.$('select').val(model.get('currentScenario'));
    },

    render: function() {
        this.$el.html(this.template({
            scenarios: $.extend(this.customRoute, this.scenarios),
            selected: this.model.get('currentScenario')
        }));
        return this;
    }
});
