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
  });
  Tinytest.add - _add;

  test.equal('ab[(c)(d)]', str);
  test.equal('Step1 - When running description - should do this', texts[0]);
  test.equal('Step1 - When running description - should do this too', texts[1]);
});
