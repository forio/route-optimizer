var RunsService = require('services/epicenter-runs-service');

module.exports = function() {

    var runid = "";

    return {

        do: function (operation, data) {
            var $def = $.Deferred();
            var postData = {name: operation, arguments:[data]};
            RunsService.getRunID().then(function(runid) {
                $.post('/api/operations/' + runid, postData, function (response) {
                    $def.resolve(response);
                }) ;
            });
            return $def;
        }
    };
}();
