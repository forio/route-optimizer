var ItemView = require('views/waypoint-list-item-view');
var BaseView = require('views/base-view');

var EditableItemView = require('views/editable-list-item-view');

var DataAPIService = require('services/epicenter-data-service');

var MAX_ALLOWED = 9;
module.exports = BaseView.extend({
    template: require('templates/save-custom'),
    className: 'save-container',

    events: {
        'click .save-button': 'saveRoute',
        'click .toggle-save-button': 'toggleSave',

        'keyup input': 'validateName',
    },

   initialize: function() {
        this.collection.on('add', this.render, this);
        this.model.on('change:currentScenario', this.render, this);
        BaseView.prototype.initialize.apply(this, arguments);
   },

   toggleSave: function () {
        if (this.$el.hasClass('editable')) {
            this.saveRoute();
        }
        else {
            this.$el.addClass('editable');
        }
   },

   saveRoute: function () {
        // For some reason there are empty waypoints in the collection?
        var waypoints = this.collection.filter( function (wp) {
            var name = wp.get('name');
            return name && name !== '';
        });
        var routeName = this.$('input').val();
        var payload = { routeName: routeName, waypoints: _.map(waypoints, function (wp) { return wp.toJSON() } ) };

        // Hide the current view to prevent double saves
        this.$el.html('');

        var me = this;
        this.model.trigger('routesave');
        DataAPIService.saveRoute(payload).done( function (collectionId) {
            me.model.trigger('hideloading'); 
            me.app.router.navigate(collectionId, {trigger: true});
        });
   },

   validateName: function (e) {
        var val = $(e.target).val();
        var validateFn = ($.trim(val) === '') ? 'removeClass' : 'addClass';
        this.$el[validateFn]('valid');
   },

   render: function() {
        this.$el.empty();
        var isMaxSize = this.collection.length == MAX_ALLOWED;
        // 'custom' is the ID of the scenario, hardcoded but the value comes from scenario-view.js
        var isCustom = this.model.get('currentScenario') === 'custom';

        // Only in the custom scneario saving is availble. Should we limit to only when all points were specified?
        if (isCustom) {
            this.$el.html(this.template());
        }

        return this;
   }
});
