var BaseModel = require('models/base-model');

module.exports = BaseModel.extend({
    defaults: {
        from: '',
        gResult: null,
        to: ''

    }
});
