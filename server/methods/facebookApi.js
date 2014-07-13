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

    FB.api(requestUrl, function(err, data) {

      if (err) {
        console.log('/facebook/api' + requestUrl + ' error: ' + JSON.stringify(err));
      }
      //console.log('/facebook/api' + requestUrl + ' result: ' + JSON.stringify(data));

      fut.return(data);
    });

    return fut.wait();

  }
});