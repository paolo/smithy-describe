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

  this.describe = this.context = _describe.bind(this, lst);

  this.before =  (bfn) => {
    steps.before.push(bfn.bind(this));
  };

  this.beforeEach =  (befn) => {
    steps.beforeEach.push(befn.bind(this));
  };

  this.after = (afn) => {
    steps.after.push(afn.bind(this));
  };

  this.afterEach =  (aefn) => {
    steps.afterEach.push(aefn.bind(this));
  };

  this.it =  (str, itfn) => {
    steps.it.push({
      desc: str,
      fn: itfn.bind(this)
    });
  };

  fn.bind(this)();

  // execute inner describe calls first
  for (let dObj of steps.describe) {
    describe(dObj.desc, dObj.dfn, dObj.list);
  }
  // Create a test for before
  Tinytest.add(prepDesc(steps.description, 'before'), () => {
    for (let bfn of steps.before) { bfn(); }
  });
  // Create tests for beforeEach, it and afterEach
  for (let itObj of steps.it) {
    Tinytest.add(prepDesc(steps.description, `beforeEach (${itObj.desc})`), () => {
      for (let befn of steps.beforeEach) { befn(); }
    });
    Tinytest.add(prepDesc(steps.description, itObj.desc), (test) => {
      itObj.fn.bind(this, test)();
    });
    Tinytest.add(prepDesc(steps.description, `afterEach (${itObj.desc})`), () => {
      for (let aefn of steps.afterEach) { aefn(); }
    });
  }
  Tinytest.add(prepDesc(steps.description, 'after'), () => {
    for (let afn of steps.after) { afn(); }
  });
};

let prepDesc = function(lst, desc) {
  return lst.concat(desc).join(' - ');
};
