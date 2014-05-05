var ItemView = require('views/waypoint-list-item-view');
var EditableItemView = require('views/editable-list-item-view');

module.exports = Backbone.View.extend({
    tagName: 'ul',

   initialize: function() {
        this.collection.on('reset', this.render, this);
        this.collection.on('add', this.render, this);
   },

   addItem: function (mdl, isEditable) {
        console.log("Add");
        var View = (isEditable === true) ? EditableItemView : ItemView;
        var iv = new View({model: mdl});
        this.$el.append(iv.render().$el);
   },

   render: function() {
        this.$el.empty();
        this.collection.each(function(mdl, index) {
            this.addItem(mdl, (index === this.collection.length - 1) );
        }, this);

        //Loop back
        if (this.collection.length) {
            this.addItem(this.collection.at(0), false);
        }
        else {
            var newMdl = this.collection.add({});
            // this.addItem(newMdl, true);
        }

        return this;
   }
});
