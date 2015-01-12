var urlService = require('services/epicenter-url-service');

module.exports = function() {
    var runid;
    var runURL = urlService.getApiURL('run');
    var transport = require('services/ajax-transport-service')(runURL);

    return {
        listeners: [],
        runIdReq: null,
        getRunID: function (forceGet) {
            var $def = $.Deferred();

            var params = {
                account: 'showcase',
                project: 'route-optimizer',
                model: 'TSPModel.jl'
            };

            if (!runid || forceGet) {
                var _this = this;
                this.listeners.push($def);

                if (!this.runIdReq) {
                    this.runIdReq = transport
                       .post(params)
                       .done(function (run){
                           runid = run.id;
                           _.each(_this.listeners, function (prom) {
                                prom.resolve(run.id);
                            });
                           _this.runIdReq = null;
                       })
                       .fail(function () {
                            var args = arguments;
                            _.each(_this.listeners, function (prom) {
                                prom.reject(args);
                            });
                            _this.runIdReq = null;   
                       });
                }
                
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
