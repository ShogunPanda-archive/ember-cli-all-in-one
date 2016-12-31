/* jshint node: true */

module.exports = function(environment){
  var ENV = {
    modulePrefix: "dummy",
    environment: environment,
    rootURL: "/",
    locationType: "auto",
    EmberENV: {
      FEATURES: {
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },
    APP: {}
  };

  if(environment === "test"){
    ENV.locationType = "none";
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
    ENV.APP.rootElement = "#ember-testing";
  }

  return ENV;
};
