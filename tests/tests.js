Tinytest.add('Describe - Execution Flow', function(test) {
  // Mocking Tinytest.add
  let texts = [];
  const _add = Tinytest.add;
  Tinytest.add = function(text, fn) {
    texts.push(text);
    fn();
  };

  let str = '';
  describe('Step1', function() {
    str += 'a';
    context('When running description', function() {
      str += 'b';
      before(function() {
        str += '[';
      });

      beforeEach(function() {
        str += '(';
      });

      afterEach(function() {
        str += ')';
      });

      after(function() {
        str += ']';
      });

      it('should do this', function(t) {
        str += 'c'
      });

      it('should do this too', function(t) {
        str += 'd'
      });
    });

    context('When running other description', function() {
      str += ',e';
      it('should run at the end', function(t) {
        str += 'f';
      });
    });
  });
  Tinytest.add - _add;

  test.equal('ab[(c)(d)],ef', str);
  test.equal('Step1 - When running description - before', texts[0]);
  test.equal('Step1 - When running description - beforeEach (should do this)', texts[1]);
  test.equal('Step1 - When running description - should do this', texts[2]);
  test.equal('Step1 - When running description - afterEach (should do this)', texts[3]);
  test.equal('Step1 - When running description - beforeEach (should do this too)', texts[4]);
  test.equal('Step1 - When running description - should do this too', texts[5]);
  test.equal('Step1 - When running description - afterEach (should do this too)', texts[6]);
  test.equal('Step1 - When running description - after', texts[7]);
  test.equal('Step1 - When running other description - should run at the end', texts[8]);
});
