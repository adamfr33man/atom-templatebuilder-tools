'use babel';
module.exports = {
  activate() {
    console.log('My package was activated');
  },
  deactivate() {
    console.log('My package was deactivated');
  },

  provideLinter() {
    console.log('PROVIDED !');

    const provider = {
      name: 'LB Search Linter',
      grammarScopes: ['source.lbsearch'], // ['*'] will get it triggered regardless of grammar
      scope: 'file', // or 'project'
      lintOnFly: true,
      lint: function(textEditor) {
        return new Promise(function(resolve, reject) {
          // do something async or
          console.log('Linting', textEditor.getPath());
          // Get individual lines
          let text = textEditor.getText();

          let messages = require('./lbSearchLinter').lintText(text, textEditor.getPath());

          resolve( messages );
        });
      }
    };
    return provider;
  }
};
