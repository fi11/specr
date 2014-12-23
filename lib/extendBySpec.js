var invariant = require('inv');
var toStr = Object.prototype.toString;
var SpecPolice = require('./specPolice');

function extendProtoBySpec(proto, spec, specPolice) {
    specPolice = specPolice || {};

    var mixins = spec.mixins;

    if (mixins) {
        invariant(toStr.call(mixins) === '[object Array]', 'mixins property of spec must be an array');

        mixins.forEach(function(mixSpec) {
            extendProtoBySpec(proto, mixSpec, specPolice);
        });
    }

    Object.keys(spec || {}).forEach(function(key) {
        if (key !== 'mixins') {
            var police = SpecPolice[specPolice[key] || 'DEFINE_ONCE'];

            invariant(
                police,
                'You are attempting to define wrong %s police',
                specPolice[key]);

            proto[key] = police(proto[key], spec[key], proto.hasOwnProperty(key), key);
        }
    }, this);
}

module.exports = extendProtoBySpec;
