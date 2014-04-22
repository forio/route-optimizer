var urlService = require('services/epicenter-url-service');
var ajaxTransportService = require('services/ajax-transport-service');

module.exports = function() {
    var runid;
    var runURL = urlService.getApiURL('run');

    return {
        getRunID: function (forceGet) {
            var $def = $.Deferred();

            var params = {
                account: 'showcase',
                project: 'route-optimizer',
                model: 'TSPModel.jl'
            };

            var transport = ajaxTransportService;

            if (!runid || forceGet) {
                transport
                   .post(runURL, params)
                   .then(function (run){
                       runid = run.id;
                       $def.resolve(run.id);
                   });
            }
            else {
                $def.resolve(runid);
            }

            return $def;
        },

        create: function () {

        }
    };
}();
