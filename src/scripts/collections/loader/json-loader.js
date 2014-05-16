
module.exports = function (scenario) {
    return {
        fetch: function (collection, options) {
            collection.url = 'data/' + scenario + '.json';
            return collection.fetch(options);
        }
    };
};