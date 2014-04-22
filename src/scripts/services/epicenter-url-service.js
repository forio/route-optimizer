module.exports = function() {
    var baseURL = 'api.forio.com';
    return {
        baseURL: baseURL,

        getApiURL: function (api) {
            if (api.toLowerCase() === 'run' || api.toLowerCase() === 'model' || api.toLowerCase() === 'operation') {
                return baseURL + '/model/' + api;
            }
        }
    };
}();
