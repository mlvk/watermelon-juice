import DeviseAuthenticator from 'ember-simple-auth/authenticators/devise';
import config from 'watermelon-juice/config/environment';

export default DeviseAuthenticator.extend({
  serverTokenEndpoint:`${config.apiHost}/users/sign_in`
});
