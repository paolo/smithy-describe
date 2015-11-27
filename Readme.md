# smithy:describe

[![Circle CI](https://circleci.com/gh/paolo/smithy-describe.svg?style=svg)](https://circleci.com/gh/paolo/smithy-describe)

A simple **'describe'** like syntax for testing meteor packages with **Tinytest**. It also ships with **sinon**,
**chai** and a couple of helper functions to ease your testing efforts.

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

```smithy:describe``` uses a syntax very similar to ```mocha```, ```jasmine``` or even ```rspec```.
And it also bundles ```sinon``` and ```chai```, which are commonly used with mocha. This allows you to define
your tests using a syntax similar to the one describe above.

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
      // async test (needs try/catch on every async block, or you can use catchable/promisify)
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

## Game Rules

Particularly when dealing with asynchronous tests, there are some rules you must follow in order to get results
from your tests, either that they passed, or more importantly, **why they failed**. These rules apply to any of
the test hooks or the tests itself, meaning ```before```, ```after```, ```beforeEach```, ```afterEach``` and ```it```.

So, the rule of thumb is basically: **Every asynchronous block must call ```done()``` as the last statement,
and ```done(exception)``` when an exception is raised**.

### try/catch

You can fulfill the previous rule using try/catch statements like in the example below, but don't worry, we provide
some helpers to avoid this mess.

```javascript
it('test async', function(done) { // *done* params lets smithy:describe know it's and async test.
  Meteor.call('Method1', (e, r) => {
    try {
      expect(r).to.equal(true);
      Meteor.call('Method2', (e, r) => {
        try {
          expect(r).to.be.ok;
          done();
        } catch (e) {
          done(e);
        }
      });
    } catch (e) {
      done(e);
    }
  });
});
```

### catchable

Many try/catch statements could easily pollute and affect the readability of your tests, so a catchable function
is provided to reduce some lines of code.

```javascript
it('test async', function(done) { // *done* params lets smithy:describe know it's and async test.
  Meteor.call('Method1', (e, r) => {
    catchable(done, () => {
      expect(r).to.equal(true);
      Meteor.call('Method2', (e, r) => {
        catchable(done, () => {
          expect(r).to.be.ok;
          done();
        });
      });
    });
  });
});
```

### promisify

```promisify``` is a function that wraps an async function that expects a callback with error and result as parameters
(like most Meteor functions) and returns a **Promise**, you can also create promises by your self if your use case
doesn't apply for ```promisify```.

```javascript
it('test async', function(done) { // *done* params lets smithy:describe know it's and async test.
  promisify(Meteor.call, 'Method1').then((r) => {
    expect(r).to.equal(true);
    return promisify(Meteor.call, 'Method2');
  }).then((r) => {
    expect(r).to.be.ok;
    done();
  }).catch((e) => {
    done(e);
  });
});
```

Or, with ```Promise.all()``

```javascript
it('test async', function(done) { // *done* params lets smithy:describe know it's and async test.
  Promise.all([promisify(Meteor.call, 'Method1'), promisify(Meteor.call, 'Method2')]).then((values) => {
    expect(values[0]).to.equal(true);
    expect(values[1]).to.be.ok;
    done()
  }).catch((e) => {
    done(e);
  });
});
```

## Thanks

This package was heavily inspired by  [```peterellisjones:describe```](https://atmospherejs.com/peterellisjones/describe).
