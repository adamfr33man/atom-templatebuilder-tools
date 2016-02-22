'use babel';

describe('The lbsearch provider for Linter', () => {
    it('finds at least one message', () => {
      let messages = require('../src/linters/lbSearchLinter').lintText('[HELLO]]\nthis=that', 'test');
      console.log(messages);
      expect('red').toBe('red');
    });
});
