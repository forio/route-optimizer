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
        collection: 'routes'
    };

    options = $.extend(defaultParams, options);

    return {
        fetch: function (collection, options) {
            var apiParams = $.extend(defaultParams, { collection: 'routes/' + scenario + '/waypoints' })
            collection.url = urlService.getDataApiURL(apiParams);
            return collection.fetch(options);
        }
    };
};