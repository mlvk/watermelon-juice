import Ember from 'ember';
import config from '../config/environment';

export default Ember.Service.extend({
  initializeFb() {
    if(!this.initialized) {
      try {
        firebase.app();
      }catch(e) {
        firebase.initializeApp({databaseURL: config.firebase.host});
      }
      this.initialized = true;
    }
  },

  buildRef(path) {
    this.initializeFb();
    return firebase.database().ref(path);
  }
});
