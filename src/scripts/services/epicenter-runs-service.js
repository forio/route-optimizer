var urlService = require('services/epicenter-url-service');

module.exports = function() {
    var runid;
    var runURL = urlService.getApiURL('run');

    return {
        getRunID: function (forceGet) {
            var $def = $.Deferred();

            if (!runid || forceGet) {
                $.post(runURL, function (run){
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
