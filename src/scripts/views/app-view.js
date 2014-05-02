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

    setScenario: function(scenario) {
        if (!scenario) {
            scenario = 'book-crawl';
        }
        this.collection.url = 'data/' + scenario + '.json';
        var me = this;
        this.collection.fetch({reset: true}).done(function () {
            me.handleScenarioSelect();
        });
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
        var wp = this.collection;

        this.scenarioView = new ScenariosView({
            el: this.$('header')
        });
        this.scenarioView.render();

        var optimizer = new Optimizer({
            original: wp,
            optimized: wp.clone()
        });
        window.optimizer = optimizer;


        var wpListView = new WayPointsListView({
            collection: optimizer.get('original'),
            className: 'waypoints'
        });
        $('#content .side').html(wpListView.render().$el);


        var originalMapView = new OriginalMapView({
            collection: optimizer.get('original'),
            el: $('.maps .original')
        });
        originalMapView.render();

        var optimizedMapView = new OptimizedMapView({
            collection: optimizer.get('optimized'),
            model: optimizer,
            el: $('.maps .optimized .map')
        });
        optimizedMapView.render();

        var loaderView = new LoaderView({
            model: optimizer,
            el: $('.maps .optimized .generate')
        });
        loaderView.render();


        var statsView = new StatsView({
            model: optimizer,
            el: $('#stats')
        });
        statsView.render();
    },

    renderContents: function () {


        var cv = new CodeView({
            el: $('#how-we-did-it .main')
        });
        cv.render();

        return this;
    }
});
