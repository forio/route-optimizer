var runsService = require('services/epicenter-runs-service');
var urlService = require('services/epicenter-url-service');

module.exports = function() {
    var defaultParams = {
        account: 'showcase',
        project: 'route-optimizer',
        collection: 'routes'
    };

    var baseUrl = urlService.getDataApiURL(defaultParams);

    return {
        saveRoute: function (route) {
            var $def = $.Deferred();
            var transport = require('services/ajax-transport-service')(baseUrl);

            transport
               .post(route)
               .done(function (data){
                   collectionId = data.id;
                   $def.resolve(collectionId);
               });

            return $def;
        },

        getRoute: function (collectionId, options) {
            var $def = $.Deferred();
            options = options || {};
            var transport = require('services/ajax-transport-service')(baseUrl + '/' + collectionId);

            transport
               .get(options)
               .done(function (data){
                   $def.resolve(data);
               });

            return $def;
        }
    };

}();