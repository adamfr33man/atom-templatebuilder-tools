'use babel';

module.exports.lintText = (text, path) => {
  const messages = [],
        parser = new DOMParser();
  // Parse the XML Doc and return any Errors
  console.log('Hello from the structure linter');

  let doc = parser.parseFromString(text, "application/xml"),
      err = doc.querySelector('parsererror div');

  if(err) {
    let msg = err.textContent.trim(),
        parts = msg.match(/line (\d+) at column (\d+): (.*)/);

        if(parts) {
          let row = parseInt(parts[1]) - 1,
              col = parseInt(parts[2]) - 1;

            messages.push({
              type: 'Error',
              text: parts[3],
              range:[ [row, col], [row, col] ],
              filePath: path
            });
        }
    // "error on line 4 at column 5: error parsing attribute name"

  }

  console.log(doc);

  /*
   * Make sure all elements have st_ or sts_
   * Limit attributes to allowed only
   * Structure minitemplates can only have inner or outer tags, not content (as that gets replaced)
   */
  // Return any Errors and Warnings
  return messages;
};
