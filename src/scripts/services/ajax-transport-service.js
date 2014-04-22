module.exports = function(baseurl) {

    var defaultParams  = {
        contentType: 'application/json',
        crossDomain: true,
        processData: false,
        url: baseurl
    };

    return {
        get: function (data) {
            var params = $.extend({}, defaultParams, {
                data: JSON.stringify(data),
                method: 'GET'
            });
            return $.ajax(params);
        },
        post: function (data) {
            var params = $.extend({}, defaultParams, {
                data: JSON.stringify(data),
                method: 'POST'
            });
            return $.ajax(params);
        }
    };
};
