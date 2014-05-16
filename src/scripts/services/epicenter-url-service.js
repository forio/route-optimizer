module.exports = function() {
    var baseURL = 'https://api.forio.com';
    return {
        baseURL: baseURL,

        getApiURL: function (api) {
            if (api.toLowerCase() === 'run' || api.toLowerCase() === 'model' || api.toLowerCase() === 'operation') {
                return baseURL + '/model/' + api;
            }
        },

        getDataApiURL: function (params) {
            return baseURL + '/data/' + params.account + '/' + params.project + '/' + params.collection;
        }
    };
}();
