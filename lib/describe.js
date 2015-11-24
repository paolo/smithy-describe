describe = function (description, fn, lst) {
  if (lst === undefined) {
    lst = [];
  }
  lst.push(description);

  let steps = {
    description: lst.slice(0),
    describe: [],
    it: [],
    before: null,
    beforeEach: null,
    after: null,
    afterEach: null
  };

  let _describe = function (list, desc, dfn) {
    steps.describe.push({list, desc, dfn});
  };

  this.describe = this.context = _.bind(_describe, this, lst);

  this.before =  (bfn) => {
    steps.before = _.bind(bfn,this);
  };

  this.beforeEach =  (befn) => {
    steps.beforeEach = _.bind(befn,this);
  };

  this.after = (afn) => {
    steps.after = _.bind(afn,this);
  };

  this.afterEach =  (aefn) => {
    steps.afterEach = _.bind(aefn,this);
  };

  this.it =  (str, itfn) => {
    steps.it.push({
      desc: str,
      fn: _.bind(itfn, this)
    });
  };

  _.bind(fn, this)();

  _.bind(execute, this)(steps);
};

let execute = function(steps) {
  // execute inner describe calls first
  for (let dObj of steps.describe) {
    describe(dObj.desc, dObj.dfn, dObj.list.slice(0));
  }
  // Create a test for before
  helperFor(steps, 'before');

  // Create tests for beforeEach, it and afterEach
  for (let itObj of steps.it) {
    helperFor(steps, 'beforeEach', itObj.desc);

    if (itObj.fn.length > 1) {
      Tinytest.addAsync(prepDesc(steps.description, itObj.desc), itObj.fn)
    } else {
      Tinytest.add(prepDesc(steps.description, itObj.desc), itObj.fn);
    }

    helperFor(steps, 'afterEach', itObj.desc);
  }
  // Create a test for after
  helperFor(steps, 'after');
};

let helperFor = function (steps, when, append) {
  if (steps[when] !== null) {
    let str = when;
    if (append) {
      str = `${when} (${append})`;
    }
    if (steps[when].length > 0) {
      Tinytest.addAsync(prepDesc(steps.description, str), (test, done) => {
        steps[when](done);
      });
    } else {
      Tinytest.add(prepDesc(steps.description, str), () => {
        steps[when]();
      });
    }
  }
};

let prepDesc = function(lst, desc) {
  return lst.concat(desc).join(' - ');
};
