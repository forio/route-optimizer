
module.exports = function () {

    var DataApiLoader = require('./data-api-loader');
    var JsonLoader = require('./json-loader');
    var RandomLoader = require('./random-loader');

    var factoryMapping = {
        'custom': JsonLoader,
        'book-crawl': JsonLoader,
        'sf-sightseeing': JsonLoader,
        'business-deliver': RandomLoader
    }
    
    return {
        loaderFactory: function (scenario) {
            var mapped = factoryMapping[scenario];
            return new mapped(scenario) || new DataApiLoader(scenario);
        }
    };
};