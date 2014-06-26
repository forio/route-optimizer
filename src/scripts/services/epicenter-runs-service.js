var urlService = require('services/epicenter-url-service');

module.exports = function() {
    var runid;
    var runURL = urlService.getApiURL('run');
    var transport = require('services/ajax-transport-service')(runURL);

    return {
        getRunID: function (forceGet) {
            var $def = $.Deferred();

            var params = {
                account: 'examples',
                project: 'route-optimizer',
                model: 'TSPModel.jl'
            };

            if (!runid || forceGet) {
                transport
                   .post(params)
                   .done(function (run){
                       runid = run.id;
                       $def.resolve(run.id);
                   })
                   .fail(function () {
                        $def.reject();                   
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
