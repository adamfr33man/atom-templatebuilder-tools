'use babel';

const lbLinter = require('../src/linters/lbSearchLinter');

describe('The lbsearch provider for Linter', () => {

    it('warns about missing [GLOBAL]', () => {
      let messages = lbLinter.lintText('[TEST]]\nthis=that', 'test');

      expect(messages.length).toBe(1);
      expect(messages[0].type).toBe('Warning');
      expect(messages[0].text).toBe('Could not find [GLOBAL] section, consider upgrading old client');
    });

    it('errors on duplicate sources', () => {
      let messages = lbLinter.lintText('[GLOBAL]\n[SITE_INDEX]\nthis=that\n[SITE_INDEX]\nthis=that', 'test');

      expect(messages.length).toBe(1);
      expect(messages[0].type).toBe('Error');
      expect(messages[0].text).toBe('Duplicate section name "SITE_INDEX" originally defined on line 1');
    });

});
