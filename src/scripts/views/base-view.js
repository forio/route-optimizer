module.exports = (function() {
    return Backbone.View.extend({
        initialize: function (options) {
            //Attach view params to view instance
            _.extend(this, _.omit(options,
                'el', '$el', 'model', 'className', 'tagName', 'collection', 'attributes'));

            return Backbone.View.prototype.initialize.call(this, options);
        },
        close: function () {
            if (this.onClose) {
                this.onClose();
            }
            this.cleanUp();
            this.remove();

        },
        cleanUp: function () {
            this.undelegateEvents();

            var subViews = _.filter(this, function (member) { return member instanceof Backbone.View; });
            _.invoke(subViews, 'close');

            var subArrayOfViews = _.filter(this, function (member) { return _.isArray(member) && member.length > 0 && member[0] instanceof Backbone.View; });
            _.each(subArrayOfViews, function (array) { _.invoke(array, 'close'); });

        }
    });
}());
