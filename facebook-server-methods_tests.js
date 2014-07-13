/*
 * Test this package by running this command from you app
 * folder:
 * 
 * > meteor test-packages facebook-server-methods
 *
 */

Tinytest.add('facebook-server-methods - main test', function (test) {
  if (Meteor.isServer){

    // This test will fail without a valid app configuration...
    FacebookServerMethods.config({
      appId: "697699146958763",
      secret: "682ee82be916a2bd067bdc90477c8004"
    })

    // This test will fail without a valid user token...
    var result = Meteor.call('/facebook/api','/me','CAAJ6jb3Qh6sBALWKPjRUBAJ5ENe86GnhvriugvFZBkLuiriQVFdZBVLvn675mxgBzHaLsfQEKDVF8uiqmKZCCUzE95AeQcG0FGawZAaL8peyXzbA0Xt9dsyxXtUmLfU5eFvD9HSwRk47vfUIE9yijAkdOk3SQ2xZBgkha1cxkyCDl2O7qdan1wVZBavQvxmpIvw9tlcwmCrwZDZD');

    console.log('result: ' + JSON.stringify(result));
    test.isTrue(result != undefined,'result cannot be undefined!');
  }
});
