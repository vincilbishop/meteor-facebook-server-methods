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

  '/facebook/currentUser/getProfilePhotos': function () {

    var url = '/me/fql?q=SELECT+src_small+FROM+photo+WHERE+aid+IN+(SELECT+aid+FROM+album+WHERE+owner+=+me()+AND+type+=+"profile")&access_token=' + Meteor.user().services.facebook.accessToken;

    return Meteor.call('/facebook/currentUser/api',url);
  }

  /*
   '/facebook/currentUser/getProfilePhotos': function () {

   var url = '/me/fql?q=SELECT+src_small+FROM+photo+WHERE+aid+IN+(SELECT+aid+FROM+album+WHERE+owner+=+me()+AND+type+=+"profile")&access_token=' + Meteor.user().services.facebook.accessToken;

   var fut = new Future ();

   var FB = new Facebook({
   appId: FacebookServerMethods.appId,
   secret: FacebookServerMethods.secret
   });

   FB.setAccessToken(Meteor.user().services.facebook.accessToken);


   FB.api (url, Meteor.bindEnvironment (
   function (err, response) {

   console.log(url + ' response: ' + JSON.stringify(response));

   if (err){
   console.log (url + '  error: ' + JSON.stringify (err));
   }

   fut.return(response);

   }, function (ex) {
   console.log ('facebook api error: ' + JSON.stringify (ex));
   throw ex;
   }) // End bindEnvironment
   );

   return fut.wait ();

   }
  * */

});
