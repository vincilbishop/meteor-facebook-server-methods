/**
 * Created by vincilbishop on 6/20/14.
 */

Meteor.startup (
  /**
   * Authenticates or creates a user with a facebook token
   *  @method 'login'
   *  @param {Object} request An object with a single property, accessToken.
   *  @returns An object containing the Meteor User Id, the SRP (not facebook) token, and when the Meteor SRP token expiry timestamp.
   *  @discussion It is assumed that the user has granted email permissions to the app. If access to the user's email address has not been granted, a unique albeit non-functioning email address is created to identify the user.
   *  @example request:
   *  {
   *  accessToken: "CAAKdPZBWM9xkBA..."
   *  }
   *  @example response:
   *  {
   id = XXXdiCsMqyboijdt6;
   token = "XXXnEYfn-AGRYVECtYE32NrmfGIjGZHCOgL3fBLYAXV";
   tokenExpires =   {
      "$date"      = 1412787730256;
   };
   @memberof Server-Methods
   */
  function () {
    Accounts.registerLoginHandler (
      function (request) {
        //there are multiple login handlers in meteor.
        //a login request go through all these handlers to find it's login hander
        //so in our login handler, we only consider login requests which has admin field

        console.log ('request.accessToken: ' + JSON.stringify (request.accessToken));



        //our authentication logic :)
        if (request.accessToken == undefined) {
          return null;
        } else {
          // Verfiy that the token from facebook is valid...
          // https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/v2.0#checktoken
          // graph.facebook.com/debug_token? input_token={token-to-inspect}&access_token={app-token-or-admin-token}

          var facebook = new Facebook ({ appId: Meteor.settings.Facebook.appId, secret: Meteor.settings.Facebook.secret });

          var appAccessToken = facebook.getApplicationAccessToken ();

          console.log ('appAccessToken: ' + appAccessToken);

          var fut = new Future ();

          var url = '/debug_token?input_token=' + request.accessToken + '&access_token=' + appAccessToken;
          facebook.api (url, Meteor.bindEnvironment (
              function (err, response) {
                console.log (JSON.stringify (response));

                /*
                 {"data":
                 {"app_id":"735847713142553",
                 "is_valid":true,
                 "metadata":{"sso":"iphone-safari"},
                 "application":"Eekd (Dev)",
                 "user_id":"10152261285788107",
                 "issued_at":1404997489,
                 "expires_at":1410181489,
                 "scopes":["public_profile"]}}
                 */

                if (response.data.is_valid === true) {
                  var fbUserInfo = Meteor.call('/facebook/api','/me?fields=id,name,email', request.accessToken);

                  /*
                   {"id":"10152261285788107","name":"Vincil Bishop","email":"vincil.bishop@vbishop.com"}

                   * */

                  //we create a user if not exists, and get the userId
                  var email = fbUserInfo.email || "-" + fbUserInfo.id + "@facebook.com";
                  var serviceData = {
                    id: fbUserInfo.id,
                    accessToken: request.accessToken,
                    email: email
                  };
                  var options = {
                    profile: {
                      name: fbUserInfo.name
                    }
                  };
                  var user = Accounts.updateOrCreateUserFromExternalService ('facebook', serviceData, options);

                  console.log ('Logged in from facebook: ' + user.userId);

                  //send loggedin user's user id
                  fut.return ({userId: user.userId});


                } else {

                  fut.return (null);

                }

              }, function (ex) {
                console.log('/debug_token error: ' + JSON.stringify(ex));
                throw ex;
              }) // End bindEnvironment
          );

          // Wait for async to finish before returning
          // the result
          return fut.wait ();

        }


      });

  });

Meteor.methods ({
  facebook_login: function (fbUser, accessToken) {
    var email = fbUser.email || "-" + id + "@facebook.com";
    var serviceData = {
      id: fbUser.id,
      accessToken: accessToken,
      email: email
    };
    var options = {
      profile: {
        name: fbUser.name
      }
    };
    var user = Accounts.updateOrCreateUserFromExternalService ('facebook', serviceData, options);

    console.log ('Logged in from facebook: ' + user.userId);
    this.setUserId (user.userId);

    return user;
  },
  test_method: function () {
    var userId = Meteor.userId ();
    var user = Meteor.user ();
  }
});