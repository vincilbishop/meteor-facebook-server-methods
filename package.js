Package.describe({
  summary: " \* Fill me in! *\ ",
  version: "1.0.0",
  git: " \* Fill me in! *\ "
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.0.1');
  api.addFiles('meteor-facebook-server-methods.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('meteor-facebook-server-methods');
  api.addFiles('meteor-facebook-server-methods-tests.js');
});
