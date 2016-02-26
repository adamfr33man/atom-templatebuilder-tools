'use babel';

// Get the config setup
module.exports = {
  config: {
    tbPath: {
      title: 'Template Builder Path',
      description: 'Path to Template Builder directory, this is this will have a connector.log in it. Requires a restart of Atom when changed.',
      type: 'string',
      default: 'C:\\templatebuilder'
    },
    // liveReload: {
    //   title: 'Live Reload',
    //   description: 'If checked this will LiveReload any page that has this Chrome extension installed https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en',
    //   type: 'boolaen',
    //   default: true
    // }
  },
  activate: () => {
    var tbLivereload = require('./tb-livereload'),
      linterTemplatebuilder = require('./linters/provide-linters');

    // Load modules
    tbLivereload.activate();

    // Load the linters
    linterTemplatebuilder.activate();

    module.exports.provideLinter = linterTemplatebuilder.provideLinter;
  }
};
