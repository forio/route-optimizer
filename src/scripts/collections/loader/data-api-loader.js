/**
* Waypoint loader which loads a dataset stored in Epicenter's data API
*
* @class DataApiLoader
* @constructor scenario scenario id trying to load
*/

var urlService = require('services/epicenter-url-service');

module.exports = function (scenario) {
    var defaultParams = {
        account: 'showcase',
        project: 'route-optimizer',
        collection: 'routes/' + scenario
    };

    return {
        fetch: function (collection, options) {
            collection.url = urlService.getDataApiURL(defaultParams);
            var oldParse = collection.parse;
            collection.parse = function (data) {
                return data.waypoints;
            };
            return collection.fetch(options).done( function (data) {
                // Play nice with other loaders that do not require a custom parser
                collection.parse = oldParse;
                if (options.model) {
                    options.model.set('routeName', data.routeName);
                }
            }).fail( function (error) {
                collection.parse = oldParse;
            });
        }
    };
};