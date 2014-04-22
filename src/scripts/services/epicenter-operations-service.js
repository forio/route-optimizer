var runsService = require('services/epicenter-runs-service');
var urlService = require('services/epicenter-url-service');

module.exports = function() {

    var runid = "";
    var apiURL = urlService.getApiURL('operation');

    return {

        do: function (operation, data) {
            var $def = $.Deferred();
            var postData = {name: operation, arguments:[data]};

            var doPOST = function (runid) {
                $.post(apiURL + '/' + runid, postData, function (response) {
                    $def.resolve(response);
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
