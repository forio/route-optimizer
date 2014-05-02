var WayPointsListView = require('views/waypoint-list-view');

var OriginalMapView = require('views/original-map-view');
var OptimizedMapView = require('views/optimized-map-view');

var StatsView = require('views/stats-view');
var CodeView = require('views/code-view');
var LoaderView = require('views/loader-view');

var ScenariosView = require('views/scenarios-view');

var Optimizer = require('models/route-optimizer-model');
var BaseView = require('views/base-view');

module.exports = BaseView.extend({
    template: require('templates/app'),

    initialize: function () {
        this.model.on('load', this.handleScenarioSelect, this);
        BaseView.prototype.initialize.apply(this, arguments);
    },

    setScenario: function(scenario) {
       return this.model.load(scenario);
    },

    render: function () {
        this.renderSelf();
        this.renderContents();
    },

    renderSelf: function() {
        this.$el.html(this.template());
        return this;
    },

    handleScenarioSelect: function () {
        // this.scenarioView.select
        this.renderRoutes();
    },

    renderRoutes: function () {
        var optimizer = this.model;

        this.scenarioView = new ScenariosView({
            el: this.$('header')
        });
        this.scenarioView.render();





    },

    renderContents: function () {
        var statsView = new StatsView({
            model: this.model,
            el: $('#stats')
        });
        statsView.render();

        var wpListView = new WayPointsListView({
            collection: this.model.get('original'),
            className: 'waypoints'
        });
        $('#content .side').html(wpListView.render().$el);

        var cv = new CodeView({
            el: $('#how-we-did-it .main')
        });
        cv.render();

        var originalMapView = new OriginalMapView({
            collection: this.model.get('original'),
            el: $('.maps .original')
        });
        originalMapView.render();

        var optimizedMapView = new OptimizedMapView({
            collection: this.model.get('optimized'),
            model: this.model,
            el: $('.maps .optimized .map')
        });
        optimizedMapView.render();

        var loaderView = new LoaderView({
            model: this.model,
            el: $('.maps .optimized .generate')
        });
        loaderView.render();

        return this;
    }
});
