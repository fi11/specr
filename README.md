## Installation

```
$ npm install specr
```
## Example

```js
var specr = require('specr');

function Obj(spec) {
    function noop() {};

    noop.prototype.bar = '...';
    noop.prototype.print = function() { console.log('bar'); };
    noop.prototype.getOptions = function() { return { someVar: 1 }; };

    specr(noop.prototype, spec, { foo: 'OVERRIDE', print: 'DEFINE_MANY', getOptions: 'DEFINE_MANY_MERGED' });

    return new noop();
}

var obj = new Obj({
   mixins: [{ print: function() { console.log('foo') } }],
   foo: 'bar',
   print: function() { console.log('baz') },
   getOptions: function() {
       return { anotherVar: 2 };
   }
});

obj.foo; // -> 'bar'
obj.print();  // -> 'foo' 'bar' 'baz'
obj.getOptions(); // -> { someVar: 1, anotherVar: 2 }
```

## Authors

  - [Pavel Silin](https://github.com/fi11)

# License

  MIT




