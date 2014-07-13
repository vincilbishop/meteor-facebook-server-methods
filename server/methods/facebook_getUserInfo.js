/**
 * Created by vincilbishop on 6/21/14.
 */


/** Gets facebook info for the current logged in user
 * @method '/facebook/getUserInfo'
 * @memberof Server-Methods
 */

Meteor.methods ({
  '/facebook/getUserInfo': function () {

    var FB = new Facebook({
      appID: Meteor.settings.Facebook.appId,
      secret: Meteor.settings.Facebook.secret
    });

    var user = Meteor.users.findOne(this.userId);

    FB.setAccessToken(user.services.facebook.accessToken);

    FB.api('/me', function(err, data) {
      /*
       {
       "id":"10152179306018107",
       "email":"vincil.bishop@vbishop.com",
       "first_name":"Vincil",
       "gender":"male",
       "last_name":"Bishop",
       "link":"https://www.facebook.com/app_scoped_user_id/10152179306018107/",
       "locale":"en_US",
       "name":"Vincil Bishop",
       "timezone":-5,
       "updated_time":"2014-01-11T23:41:29+0000",
       "verified":true
       }
       */
      console.log('/me: ' + JSON.stringify(data));
    });

  }
});