var runsService = require('services/epicenter-runs-service');
var urlService = require('services/epicenter-url-service');
var ajaxTransportService = require('services/ajax-transport-service');

module.exports = function() {

    var runid = "";
    var apiURL = urlService.getApiURL('operation');
    var transport = require('services/ajax-transport-service');

    return {

        do: function (operation, data) {
            var $def = $.Deferred();
            var postData = {name: operation, arguments: [data]};

            var doPOST = function (runid) {
                return transport(apiURL + '/' + runid)
                   .post(postData)
                   .then(function (run){
                       runid = run.id;
                       $def.resolve(run.id);
                   });
            };

            runsService.getRunID()
                .then(doPOST)
                .fail(function (){
                    //Run must've gone out of memory
                    runsService.getRunID(true).then(doPOST);
                });
            return $def;
        }
    };
}();
