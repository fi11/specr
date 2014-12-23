var invariant = require('inv');
var utils = require('./utils');

module.exports = {
    'DEFINE_ONCE': function(protoProp, specProp, hasKey, key) {
        invariant(!hasKey, 'You are attempting to define %s on your object more that once', key);

        return specProp;
    },

    'DEFINE_MANY': function(protoProp, specProp, hasKey, key) {
        var isUndefined = protoProp === undefined;

        invariant(
            typeof protoProp === 'function' || isUndefined,
            'Prototype property %s conflict with spec police, it`s must be a function',
            key);

        invariant(
            typeof specProp ==='function',
            'You are attempting to define %s as not function',
            key);

        return isUndefined ? specProp : utils.createChainedFunction(protoProp, specProp, key);
    },

    'DEFINE_MANY_MERGED': function(protoProp, specProp, hasKey, key) {
        var isUndefined = protoProp === undefined;

        invariant(
            typeof protoProp === 'function' || isUndefined,
            'Prototype property %s conflict with police, it`s must be a function',
            key);

        invariant(
            typeof specProp ==='function',
            'You are attempting to define %s as not function',
            key);

        return isUndefined ? specProp : utils.createMergedResultFunction(protoProp, specProp, hasKey, key);
    },

    'OVERRIDE': function(_, specProp) {
        return specProp;
    }
};
