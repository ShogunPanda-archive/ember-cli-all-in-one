var EmberAddon = require("ember-cli/lib/broccoli/ember-addon");

// TODO: Write tests
module.exports = function(defaults){
  var production = EmberAddon.env() === "production";
  var app = new EmberAddon(defaults, {
    minifyJS: {enabled: production},
    minifyCSS: {enabled: production}
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  // Normalize is included just not have vendor.css empty
  app.import("../../node_modules/normalize.css/normalize.css");

  return app.toTree();
};
