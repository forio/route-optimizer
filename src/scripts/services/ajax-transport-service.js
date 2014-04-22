module.exports = function() {

    var defaultParams  = {
        contentType: 'application/json',
        crossDomain: true,
        processData: false
    };

    return {

        get: function (url, data) {
            var params = $.extend({}, defaultParams, {
                data: JSON.stringify(data),
                method: 'GET',
                url: url
            });
            return $.ajax(params);
        },
        post: function (url, data) {
            var params = $.extend({}, defaultParams, {
                data: JSON.stringify(data),
                method: 'POST',
                url: url
            });
            return $.ajax(params);
        }
    };
}();
