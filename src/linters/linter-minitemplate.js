'use babel';

const linter = require('./minitemplateLinter.js');

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
      grammarScopes: ['minitemplate.html'],
      scope: 'file',
      lintOnFly: true,
      lint: function(textEditor) {
        let messages = [];

        return new Promise(function(resolve, reject) {
          // do something async or
          console.log('Linting', textEditor.getPath());
          // Get individual lines
          let lines = textEditor.getText().split(/\n/),

          messages = linter.lintText(textEditor.getText(), textEditor.getPath());

          resolve( messages );
        });
      }
    };
    return provider;
  }
};
