/**
* Waypoint loader which loads a large dataset and samples the results
* with the limit configured in the options in the fetch function
*
* @class RandomLoader
* @constructor scenario scenario id trying to load
*/

module.exports = function (scenario) {
    var transport = require('services/ajax-transport-service');
    var defaults = {
        maxResults: 9
    }

    return {
        then: function (success) {
            this.thenCallback = success;
        },
        fetch: function (collection, options) {
            var self = this;
            options = $.extend(defaults, options);

            transport('data/' + scenario + '.json')
                .get()
                .done(function (data){
                    var sample = _.sample(data, options.maxResults);
                    collection.reset(sample, options);

                    if (self.thenCallback) {
                        self.thenCallback(sample);
                    }
                });
            return this;
        }
    };
};