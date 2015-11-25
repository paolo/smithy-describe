# smithy:describe

[![Circle CI](https://circleci.com/gh/paolo/smithy-describe.svg?style=svg)](https://circleci.com/gh/paolo/smithy-describe)

A simple **'describe'** like syntax for testing meteor packages with **Tinytest**. It also ships with **sinon** and
**chai**.

## Install

To install it in your own package, simply add it as a test dependency:

```javascript
Package.onTest(function(api) {
  api.use('smithy:describe');
  // Add your test files
});
```

```tinytest```, ```ecmascript``` and ```underscore``` are already implied on ```smithy:describe```
so you can use them right away.

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

    it('test 1', function() {
      // first test
      expect(1).to.equal(1);
    });

    it('test 2', function() {
      // second test
      expect(2).to.equal(2);
    });
  });
});

describe('Some Async Scenario', function() {
  context('Async context', function() {
    before(function(done) {
      Meteor.setTimeout(() => {
        done();
      });
    });

    it('test async', function(done) {
      // async test (needs try/catch on every async block, or you can use catchable)
      Meteor.setTimeout(() => {
        catchable(done, () => {
          expect('async').to.equal('async');
          done();
        });
      });
    });
  });
});
```

## Thanks

This package was heavily inspired by  [```peterellisjones:describe```](https://atmospherejs.com/peterellisjones/describe).
