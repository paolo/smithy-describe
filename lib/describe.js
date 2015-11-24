describe = function (description, fn, lst) {
  if (lst === undefined) {
    lst = [];
  }
  lst.push(description);

  let steps = {
    description: lst.slice(0),
    describe: [],
    it: [],
    before: [],
    beforeEach: [],
    after: [],
    afterEach: []
  };

  let _describe = function (list, desc, dfn) {
    steps.describe.push({list, desc, dfn});
  };

  this.describe = this.context = _.bind(_describe, this, lst);

  this.before =  (bfn) => {
    steps.before.push(_.bind(bfn,this));
  };

  this.beforeEach =  (befn) => {
    steps.beforeEach.push(_.bind(befn,this));
  };

  this.after = (afn) => {
    steps.after.push(_.bind(afn,this));
  };

  this.afterEach =  (aefn) => {
    steps.afterEach.push(_.bind(aefn,this));
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
  if (steps.before.length > 0) {
    helperFor(steps, 'before');
  }
  // Create tests for beforeEach, it and afterEach
  for (let itObj of steps.it) {
    if (steps.beforeEach.length > 0) {
      helperFor(steps, 'beforeEach', itObj.desc);
    }

    if (itObj.fn.length > 1) {
      Tinytest.addAsync(prepDesc(steps.description, itObj.desc), itObj.fn)
    } else {
      Tinytest.add(prepDesc(steps.description, itObj.desc), itObj.fn);
    }

    if (steps.afterEach.length > 0) {
      helperFor(steps, 'afterEach', itObj.desc);
    }
  }
  if (steps.after.length > 0) {
    helperFor(steps, 'after');
  }
};

let helperFor = function (steps, when, append) {
  let str = when;
  if (append) {
    str = `${when} (${append})`;
  }
  Tinytest.add(prepDesc(steps.description, str), () => {
    for (let fn of steps[when]) {
      fn();
    }
  })
};

let prepDesc = function(lst, desc) {
  return lst.concat(desc).join(' - ');
};
