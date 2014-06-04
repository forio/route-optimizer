var ItemView = require('views/waypoint-list-item-view');
var EditableItemView = require('views/editable-list-item-view');
var BaseView = require('views/base-view');

var MAX_ALLOWED = 9;
module.exports = BaseView.extend({
    tagName: 'ul',
    editable: false,
    doneEditing: false,

   initialize: function() {
        this.collection.on('reset', this.reset, this);
        this.collection.on('add', this.render, this);
        this.model.on('change:currentScenario', this.render, this);

        BaseView.prototype.initialize.apply(this, arguments);

   },

   addItem: function (mdl, isLastOne) {
        var isEditable = isLastOne === true && this.editable === true;
        var View = isEditable ? EditableItemView : ItemView;
        var iv = new View({model: mdl, map: this.app.map});
        this.$el.append(iv.render().$el);


        var isMaxSize = this.collection.length == MAX_ALLOWED;
        if (isEditable && !isMaxSize) {
            mdl.on('change:latitude', function() {
                this.collection.add({});
            }, this);
        } else if (isEditable && isMaxSize) {
            var me = this;
            mdl.on('change:latitude', function() {
                me.doneEditing = true;
                me.render();
            }, this);
        }
   },

   reset: function () {
        this.doneEditing = false;
        this.render();
   },

   render: function() {
        this.$el.empty();
        this.editable = this.model.get('currentScenario') === 'custom' && !this.doneEditing;

        this.collection.each(function(mdl, index) {
            var isLastOne = index === this.collection.length - 1;
            this.addItem(mdl, isLastOne );
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
