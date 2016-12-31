import Ember from "ember";
import Application from "../../app";
import config from "../../config/environment";

export default function startApp(attrs){
  let application = null;

  const attributes = Ember.assign({}, config.APP, attrs);

  Ember.run(() => {
    application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
  });

  return application;
}
