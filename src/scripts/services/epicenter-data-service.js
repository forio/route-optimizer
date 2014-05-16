var runsService = require('services/epicenter-runs-service');
var urlService = require('services/epicenter-url-service');

module.exports = function() {
    var defaultParams = {
        account: 'showcase',
        project: 'route-optimizer',
        collection: 'routes'
    };

    var apiURL = urlService.getDataApiURL(defaultParams);
    var transport = require('services/ajax-transport-service');

    return {
        saveRoute: function (route) {
            var $def = $.Deferred();

            transport
               .post(route)
               .done(function (data){
                   collectionId = data.id;
                   $def.resolve(collectionId);
               });

            return $def;
        },

        getRoute: function (collectionId) {
            var $def = $.Deferred();
            var params = {
                id: collectionId
            }

            transport
               .get(params)
               .done(function (data){
                   $def.resolve(data);
               });

            return $def;
        }
    };

}();