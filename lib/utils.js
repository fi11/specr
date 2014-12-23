function createChainedFunction(one, two, name) {
    return (new Function('one', 'two', 'return function ' + (name || '') +
        '(){ one && one.apply(this, arguments); two.apply(this, arguments); };'))(one, two);
}

function createMergedResultFunction(one, two, name) {
    function mergeResults(a, b) {
        a = a || {};

        Object.keys(b || {}).forEach(function(key) {
            a[key] = b[key]
        });

        return a;
    }

    return (new Function('one', 'two', 'merge', 'return function ' + (name || '') +
        '(){ return merge(one.apply(this, arguments), two.apply(this, arguments)); };'))(one, two, mergeResults);
}

exports.createChainedFunction = createChainedFunction;
exports.createMergedResultFunction = createMergedResultFunction;
