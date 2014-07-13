Package.describe({
  name: 'facebook-server-methods',
  summary: 'A collection of Facebook functions exposed as Meteor methods.'
});

Npm.depends ({
  'fibers':'1.0.1'
});

Package.on_use(function (api) {
  /* Use or imply other packages.

   * Example:
   *  api.use('ui', 'client');
   *  api.use('iron-router', ['client', 'server']);
   */
  api.use('accounts-facebook', ['server']);
  api.use('facebook-node-sdk', ['server']);
   /*
    * Add files that should be used with this
    * package.
    */
  api.add_files('facebook-server-methods.js', ['server']);
  api.add_files('server/methods/facebookApi.js', ['server']);
  api.add_files('server/methods/facebookLogin.js', ['server']);
  api.add_files('server/methods/facebook_getUserInfo.js', ['server']);
  api.add_files('server/methods/get_facebook_photos.js', ['server']);
  api.add_files('server/methods/testMethod.js', ['server']);

  /*
   * Export global symbols.
   *
   * Example:
   *  api.export('GlobalSymbol');
   */
  api.export('FacebookServerMethods');
});

Package.on_test(function (api) {
  api.use('facebook-server-methods');
  api.use('tinytest');
  
  api.add_files('facebook-server-methods_tests.js');
});
