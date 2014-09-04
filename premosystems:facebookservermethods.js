Future = Npm.require('fibers/future');

FacebookServerMethods = {};

FacebookServerMethods.config = function(config) {

  FacebookServerMethods.appId = config.appId;
  FacebookServerMethods.secret = config.secret;

}