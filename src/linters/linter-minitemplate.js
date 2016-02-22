'use babel';
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
      scope: 'file', // or 'project'
      lintOnFly: true,
      lint: function(textEditor) {
        let messages = [],
            mintemplateHtml = {
              mintemplates: {}
            };

        return new Promise(function(resolve, reject) {
          // do something async or
          console.log('Linting', textEditor.getPath());
          // Get individual lines
          let lines = textEditor.getText().split(/\n/),
              currentSection;

          lines.forEach( (line, lineNum) => {
            // Skip comment lines
            if(!line.match(/^\s*#/)) {
              let match;

              // Work out what type of line we have - section
              if((match = line.match(/^\s*\[([^\]]+)\]\s*/)) !== null) {
                console.log('Scope:', line);
                let sectionName = match[1],
                    prevSection = lbSearch.sections[sectionName];

                // Does section exist ?
                if(typeof prevSection === 'undefined') {
                  lbSearch.sections[sectionName] = lineNum;
                  currentSection = sectionName;
                } else {
                  messages.push({
                    type: 'Error',
                    text: 'Duplicate section name "' + sectionName + '" originally defined on line ' + lbSearch.sections[sectionName],
                    range:[ [lineNum, 0], [lineNum, 1] ],
                    filePath: textEditor.getPath()
                  });
                }
              } else if((match = line.match(/^\s*([^=]+)=([^=]+)\s*$/)) !== null) {
                // console.log('Got KV:', match[1], ' EQ ' ,match[2]);

                if (match[1] === 'loadmodule') {
                  let moduleName = match[2].trim();
                  // Check loadmodule= uses_SOURCE suffix
                  if((moduleName !== 'SITE_INDEX') && !moduleName.match(/_SOURCE/)) {
                    messages.push({
                      type: 'Warning',
                      text: 'Source "' + match[1] + '" should have _SOURCE suffix or be SITE_INDEX to be consistent',
                      range:[ [lineNum, 0], [lineNum, 1] ],
                      filePath: textEditor.getPath()
                    });
                  }
                } else if (match[1] === 'loadtemplate') {
                  // Check loadtemplate= uses _TS suffix
                  let templateName = match[2].trim();
                  // Check templateName= uses_TS suffix
                  if(!templateName.match(/_TS/)) {
                    messages.push({
                      type: 'Warning',
                      text: 'Template "' + match[1] + '" should have _TS suffix to be consistent',
                      range:[ [lineNum, 0], [lineNum, 1] ],
                      filePath: textEditor.getPath()
                    });
                  }
                }
              }
            }
          });

          // Check we have the required sections - UPDATESERVER, BRAIND, LOCALBRAIN, CLIENT
          // Check we have required templatesets - DEFAULT_TS, STDXML_TS, SUGXML_TS
          // Check whatever the default template set is exists e.g. CUSTOM_TS

          // Check we have new sections GLOBAL
          if(typeof lbSearch.sections.GLOBAL === 'undefined') {
            messages.push({
              type: 'Warning',
              text: 'Could not find [GLOBAL] section, consider upgrading old client',
              range:[ [0, 0], [0, 1] ],
              filePath: textEditor.getPath()
            });
          }

          // Warn when source has timeout > 30 seconds ?

          // Warn when source has skip if not defined and skip if defined

          // Check that things in the {} are stage, prod e.t.c.

          // Check that child templatesets properly extend parents

          // If has moby and dory references then throw Warnings

          // Check query modifer when dory

          // Return any Errors and Warnings
          resolve( messages );
        });
      }
    };
    return provider;
  }
};
