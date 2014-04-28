module.exports = Backbone.Model.extend({
    _hasProcessedDefaults: false,

    /** List of calculated Properties and the variables they use, useful for debugging and if you want to build a circular reference checker **/
    _customEvalPropBindingList: {},

    _processDefaults: function(){
        var me = this;
        _(this.defaults).each(function(value, key){
            if(_.isFunction(value)){
                var keyList = {};
                var otherFunCalls = value.toString().match(/this.get\([^\)]*\)(\.[^\)]*\))?/gi);
                //console.log("Evaluating:", value.toString(), "found", otherFunCalls )
                if(otherFunCalls){
                    _(otherFunCalls).each(function(fnCall){
                         var attribute = fnCall.match(/(?:\"|\')([\S]*)(?:\"|\')/)[1];
                         if(attribute === key){
                            //Basic D'oh circular references
                            throw new Error("Circular reference found: Property " + attribute + " references itself. Printing model to console.", "BaseModel.js" );
                            console.log(me);
                         }
                         else{
                            if(!keyList[attribute]){
                                // console.log("binding", attribute, "to", key);
                                 me.bind("change:" + attribute, function(){
                                    me.trigger.apply(me, ["change:"+key].concat(arguments) );
                                });
                                 keyList[attribute] = true;
                            }
                            else{
                                //console.log("Already bound ", attribute, key);
                            }
                         }
                    });
                }
                me._customEvalPropBindingList[key] = keyList;
            }
        });
       // console.log(me._customEvalPropBindingList);
        this._hasProcessedDefaults = true;
    },

    get: function (attr) {
        if(!this._hasProcessedDefaults) this._processDefaults();
        var value = Backbone.Model.prototype.get.call(this, attr);
        return (_.isFunction(value) ? value.call(this) : value);
    },

    toJSON: function () {
        var self = this, data = {},
            json = Backbone.Model.prototype.toJSON.call(this);
            _.each(json, function (value, key) {
                data[key] = self.get(key);
            });
            return data;
    },

    save: function (attributes, options) {
        var attrs = {};
        _(attributes || this.toJSON()).each(function (value, key) {
            if (typeof value !== "function") {
                attrs[key] = value;
            };
        });
        Backbone.Model.prototype.save.call(this, attrs, options);
    }
});
