var ItemView = require('views/waypoint-list-item-view');
var EditableItemView = require('views/editable-list-item-view');

var MAX_ALLOWED = 9;
module.exports = Backbone.View.extend({
    tagName: 'ul',

   initialize: function() {
        this.collection.on('reset', this.render, this);
        this.collection.on('add', this.render, this);
        this.model.on('change:currentScenario', this.render, this);
   },

   addItem: function (mdl, isEditable) {
        var View = (isEditable === true) ? EditableItemView : ItemView;
        var iv = new View({model: mdl});
        this.$el.append(iv.render().$el);

        iv.$(':text').focus();

        mdl.on('change:latitude', function() {
            this.collection.add({});
        }, this);
   },

   render: function() {
        this.$el.empty();
        var isMaxSize = this.collection.length == MAX_ALLOWED;
        var isCustom = this.model.get('currentScenario') === 'custom';

        this.collection.each(function(mdl, index) {
            var isLastOne = index === this.collection.length - 1;
            this.addItem(mdl, (isLastOne && !isMaxSize && isCustom) );
        }, this);

        //Loop back
        if (this.collection.length) {
            this.addItem(this.collection.at(0), false);
        }
        else {
            // this.addItem(newMdl, true);
        }

        return this;
   }
});
