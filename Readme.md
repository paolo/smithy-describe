# smithy:describe

A simple describe like syntax for testing meteor packages with Tinytest.

## Install

To install it in your own package, simply add it as a test dependency:

```javascript
Package.onTest(function(api) {
  api.use('smithy:describe');
  // Add your test files
});
```

```tinytest``` and ```ecmascript``` are already implied on ```smithy:describe```
so you can use both right away.

## Usage

```smithy:describe``` uses a syntax very similar to ```mocha```,
```jasmine``` or even ```rspec```.

```javascript
describe('Some Scenario', function() {
  context('When some context is set', function() {
    before(function() {
      // runs before all tests (it functions)
    });

    after(function() {
      // runs after all tests (it functions)
    });

    beforeEach(function() {
      // runs before each test
    });

    afterEach(function() {
      // runs after each test
    });

    it('test 1', function(test) {
      // first test
    });

    it('test 2', function(test) {
      // second test
    });
  });
});
```

## Thanks

This package was heavily inspired by  [```peterellisjones:describe```](https://atmospherejs.com/peterellisjones/describe).
