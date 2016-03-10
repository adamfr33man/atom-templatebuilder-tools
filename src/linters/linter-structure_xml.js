'use babel';

module.exports.lintText = (text, path) => {
  const messages = [],
        parser = new DOMParser();
  // Parse the XML Doc and return any Errors
  console.log('Hello from the structure linter');

  let doc = parser.parseFromString(text, "application/xml");

  console.log(doc);

  /*
   * Make sure all elements have st_ or sts_
   * Limit attributes to allowed only
   * Structure minitemplates can only have inner or outer tags, not content (as that gets replaced)
   */
  // Return any Errors and Warnings
  return messages;
};