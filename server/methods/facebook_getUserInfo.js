/**
 * Created by vincilbishop on 6/21/14.
 */


/** Gets facebook info for the current logged in user
 * @method '/facebook/getUserInfo'
 * @memberof Server-Methods
 */

Meteor.methods ({
  '/facebook/getUserInfo': function () {

    return Meteor.call('/facebook/currentUser/api','/me');
  }
});