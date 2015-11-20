describe = function (str, fn, lst) {
  if (lst === undefined) {
    lst = [];
  }
  lst.push(str);

  let steps = {
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
    steps.before.push(bfn);
  };

  this.beforeEach =  (befn) => {
    steps.beforeEach.push(befn);
  };

  this.after = (afn) => {
    steps.after.push(afn);
  };

  this.afterEach =  (aefn) => {
    steps.afterEach.push(aefn);
  };

  this.it =  (str, itfn) => {
    steps.it.push({
      desc: lst.concat(str).join(' - '),
      fn: itfn
    });
  };

  fn.bind(this)();

  for (let dObj of steps.describe) {
    describe(dObj.desc, dObj.dfn, dObj.list);
  }
  for (let bfn of steps.before) { bfn(); }
  for (let itObj of steps.it) {
    for (let befn of steps.beforeEach) { befn(); }
    Tinytest.add(itObj.desc, itObj.fn);
    for (let aefn of steps.afterEach) { aefn(); }
  }
  for (let afn of steps.after) { afn(); }
};
