'use babel';

// Import linters
const minitemplateLinter = require('./linter-minitemplate'),
      lbSearchLinter = require('./linter-lbsearch');

module.exports = {
  activate() {
    console.log('Minitemplate Linter was activated');
  },
  deactivate() {
    console.log('Minitemplate Linter was deactivated');
  },

  provideLinter() {
    const provider = {
      name: 'Minitemplate Linter',
      grammarScopes: ['source.lbsearch', 'source.minitemplate'],
      scope: 'file',
      lintOnFly: true,
      lint: function(textEditor) {
        let messages = [],
            linter,
            scopeName = textEditor.getGrammar().scopeName;

        return new Promise(function(resolve, reject) {
          switch(scopeName) {
            case 'source.minitemplate':
              linter = minitemplateLinter;
            break;

            case 'source.lbsearch':
              linter = lbSearchLinter;
            break;

            default:
              console.log('No linter for:', scopeName);
              resolve( messages );
            break;
          }

          messages = linter.lintText(textEditor.getText(), textEditor.getPath());

          resolve( messages );
        });
      }
    };
    return provider;
  }
};
