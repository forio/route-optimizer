var WayPointsListView = require('views/waypoint-list-view');

var OriginalMapView = require('views/original-map-view');
var OptimizedMapView = require('views/optimized-map-view');

var StatsView = require('views/stats-view');
var CodeView = require('views/code-view');
var LoaderView = require('views/loader-view');

var ScenariosView = require('views/scenarios-view');

var Optimizer = require('models/route-optimizer-model');
var BaseView = require('views/base-view');
var SaveCustomView = require('views/save-custom-view');

module.exports = BaseView.extend({
    template: require('templates/app'),

    initialize: function () {
        this.model.on('load', this.renderMaps, this);
    },

    renderMaps: function () {
        this.originalMapView.render();
        this.optimizedMapView.render();
    },

    render: function () {
        this.renderSelf();
        this.renderContents();
    },

    renderSelf: function() {
        this.$el.html(this.template());
        return this;
    },
    renderContents: function () {
        this.originalMapView = new OriginalMapView({
            collection: this.model.get('original'),
            el: this.$('.maps .original')
        });
        this.optimizedMapView = new OptimizedMapView({
            collection: this.model.get('optimized'),
            model: this.model,
            el: this.$('.maps .optimized .map')
        });

        this.scenarioView = new ScenariosView({
            el: this.$('header'),
            model: this.model
        });
        this.scenarioView.render();

        var statsView = new StatsView({
            model: this.model,
            el: $('#stats')
        });
        statsView.render();

        var wpListView = new WayPointsListView({
            collection: this.model.get('original'),
            model: this.model,
            className: 'waypoints'
        });
        $('#content .side').html(wpListView.render().$el);

        var saveCustomView = new SaveCustomView({
            collection: this.model.get('original'),
            model: this.model
        });
        $('#content .side').append(saveCustomView.render().$el);

        var cv = new CodeView({
            el: $('#how-we-did-it .main')
        });
        cv.render();



        var loaderView = new LoaderView({
            model: this.model,
            el: $('.maps .optimized .generate')
        });
        loaderView.render();

        return this;
    }
});
