// Get the config setup
module.exports = {
  config: {
    tbPath: {
      name: 'Template Builder Path',
      description: 'Path to Template Builder directory, this is this will have a connector.log in it. Requires a restart of Atom when changed.',
      type: 'string',
      default: 'C:\\templatebuilder'
    }
  },
  activate: () => {
    var tbLivereload = require('./tb-livereload'),
      linterLbsearch = require('./linters/linter-lbsearch');
      linterMinitemplate = require('./linters/linter-minitemplate');

    // Load modules
    tbLivereload.activate();

    // Load the linters
    linterLbsearch.activate();
    linterMinitemplate.activate();

    module.exports.provideLinter = linterLbsearch.provideLinter;
  }
};
