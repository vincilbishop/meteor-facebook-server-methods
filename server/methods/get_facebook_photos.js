/*****************************************************************************/
/* GetFacebookPhotos Methods */
/*****************************************************************************/

Meteor.methods ({
  /**
   * Gets the logged in user's facebook photos
   *  @method '/facebook/getProfilePhotos'
   *  @returns {Object} A data object containing an array of photo information and URLs.
   *  @example response: {
   "data":[
      {
         "pid":"2637531282879283237",
         "src_small":"https://fbcdn-sphotos-b-a.akamaihd.net/hphotos-ak-xpa1/t1.0-9/s75x225/1479094_10151832631663107_351499016_n.jpg"
      },
      {
         "pid":"2637531281815752255",
         "src_small":"https://scontent-b.xx.fbcdn.net/hphotos-frc3/t1.0-9/s75x225/553656_10150953219048107_1177956855_n.jpg"
      },
      {
         "pid":"2637531281808392528",
         "src_small":"https://scontent-a.xx.fbcdn.net/hphotos-xfp1/t1.0-9/s75x225/1936072_146941708106_5251859_n.jpg"
      },
      {
         "pid":"2637531281807505093",
         "src_small":"https://fbcdn-sphotos-e-a.akamaihd.net/hphotos-ak-xfa1/t1.0-9/s75x225/3768_77896778106_7431062_n.jpg"
      }
   ]
}
   @memberof Server-Methods
   */

  '/facebook/getProfilePhotos': function () {

    //var url = '/' + Meteor.user().services.facebook.id + '/albums';
    // /me/fql?q=select+aid+from+album+where+owner=me()+and+type="profile"&access_token=
    //var url = '/me/fql?q=select+aid+from+album+where+owner=me()+and+type="profile"&access_token=' + Meteor.user().services.facebook.accessToken;
    var url = '/me/fql?q=select+pid,src_small+from+photo+where+aid+in(select+aid+from+album+where+owner=me()+and+type="profile")&access_token=' + Meteor.user().services.facebook.accessToken;

    var fut = new Future ();

    FB.api (url, Meteor.bindEnvironment (
        function (err, response) {

          console.log('facebook api response: ' + JSON.stringify(response));

          fut.return(response);

        }, function (ex) {
          console.log ('facebook api error: ' + JSON.stringify (ex));
          throw ex;
        }) // End bindEnvironment
    );

    return fut.wait ();

  }
});
