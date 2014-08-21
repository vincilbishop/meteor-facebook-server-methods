/**
 * Created by vincilbishop on 7/13/14.
 */


/** Calls a Facebook graph API method using the app's facebook access token.
 * @method '/facebook/api'
 * @memberof Server-Methods
 */

Meteor.methods ({
  '/facebook/api': function (requestUrl,userToken) {

    var FB = new Facebook({
      appId: FacebookServerMethods.appId,
      secret: FacebookServerMethods.secret
    });

    FB.setAccessToken(userToken);

    var fut = new Future ();

    FB.api(requestUrl, Meteor.bindEnvironment (
      function (err, response) {

        //console.log(requestUrl + ' response: ' + JSON.stringify(response));

        fut.return(response);

      }, function (ex) {
        console.log (requestUrl + ' error: ' + JSON.stringify (ex));
        throw ex;
      }) // End bindEnvironment
    );

    return fut.wait();

  },
  '/facebook/currentUser/api': function (requestUrl) {

    var user = Meteor.users.findOne(this.userId);

    return Meteor.call('/facebook/api',requestUrl,user.services.facebook.accessToken);

  }


});