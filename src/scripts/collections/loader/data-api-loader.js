/**
* Waypoint loader which loads a dataset stored in Epicenter's data API
*
* @class DataApiLoader
* @constructor scenario scenario id trying to load
*/

var urlService = require('services/epicenter-url-service');
var DataAPIService = require('services/epicenter-data-service');

module.exports = function (scenario) {
    var defaultParams = {
        account: 'showcase',
        project: 'route-optimizer',
        collection: 'routes/' + scenario
    };

    return {
        fetch: function (collection, options) {
            var done = options.done;
            var model = options.model;
            //Second argument needed to be passed
            model.trigger('routeload');

            return DataAPIService.getRoute(scenario).done( function (data) {
                collection.reset(data.waypoints, options);
                if (done) done(data);

                model.set('routeName', data.routeName);
                model.trigger('hideloading');
            }).fail( function () {
                // Invalid route, defaulting to the root
                window.location.hash = '';
                model.trigger('hideloading');
            });
        }
    };
};