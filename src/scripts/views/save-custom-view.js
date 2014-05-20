var ItemView = require('views/waypoint-list-item-view');
var EditableItemView = require('views/editable-list-item-view');

var DataAPIService = require('services/epicenter-data-service');

var MAX_ALLOWED = 9;
module.exports = Backbone.View.extend({
    template: require('templates/save-custom'),

    events: {
        'click .save-button': 'saveRoute',
        'keyup input': 'validateName',
    },

   initialize: function() {
        this.collection.on('add', this.render, this);
        this.model.on('change:currentScenario', this.render, this);
   },

   saveRoute: function (e) {
        // For some reason there are empty waypoints in the collection?
        var waypoints = this.collection.filter( function (wp) {
            var name = wp.get('name');
            return name && name !== ''; 
        });
        var routeName = this.$('input').val();
        var payload = { routeName: routeName, waypoints: _.map(waypoints, function (wp) { return wp.toJSON() } ) };
        DataAPIService.saveRoute(payload).done( function (collectionId) {
            window.location.hash = collectionId;
        });
        console.log(payload);
   },

   validateName: function (e) {
        var val = $(e.target).val();
        var button = this.$('.save-button');
        var toggle = val !== '' ? button.fadeIn : button.fadeOut;
        toggle.call(button, 'fast');
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
