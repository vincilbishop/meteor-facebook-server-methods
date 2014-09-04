Package.describe({
  summary: "A collection of Facebook functions exposed as Meteor methods.",
  version: "1.0.0",
  git: "https://github.com/premosystems/meteor-facebook-server-methods"
});

Npm.depends ({
  'fibers':'1.0.1'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.0.1');
  
  api.use('accounts-facebook', ['server']);
  api.use("timbroddin:facebook-node-sdk@0.1.0", ['server']);
  
  api.addFiles('premosystems:facebookservermethods.js');
  
  api.add_files('facebook-server-methods.js', ['server']);
  api.add_files('server/methods/facebookApi.js', ['server']);
  api.add_files('server/methods/facebookLogin.js', ['server']);
  api.add_files('server/methods/facebook_getUserInfo.js', ['server']);
  api.add_files('server/methods/get_facebook_photos.js', ['server']);
  api.add_files('server/methods/testMethod.js', ['server']);
  
  api.export('FacebookServerMethods');
  
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('premosystems:facebookservermethods');
  api.addFiles('premosystems:facebookservermethods-tests.js');
});
