import Ember from 'ember';

const {
  notEmpty
} = Ember.computed;

export default Ember.Service.extend({
  routing: Ember.inject.service('-routing'),
  scrollQueue: [],
  scrollYMap: {},
  hasRoute: notEmpty('scrollQueue'),

  init() {
    this._super();
    this.addListener();
  },

  clearRoute() {
    this.set("scrollQueue", []);
  },

  requestReverse(route) {
    const queue = this.get("scrollQueue");
    this.set("scrollQueue", queue.concat(route));
  },

  hasStashedRoute(key) {
    const queue = this.get("scrollQueue");
    return queue.indexOf(key) > -1;
  },

  clearRight(key) {
    const queue = this.get("scrollQueue");
    const index = queue.indexOf(key);

    if(index > -1) {
      this.set("scrollQueue", queue.slice(index + 1));
    }
  },

  goBack() {
    const last = this.get("scrollQueue.lastObject");
    if(!Ember.isNone(last)){
      this.get('routing').transitionTo(last);
    }
  },

  addListener() {
    this.get('routing.router').on('willTransition', ::this.handleWillTransition);
    this.get('routing.router').on('didTransition', ::this.handleDidTransition);
  },

  handleWillTransition() {
    const key = this.get('routing.currentRouteName');
    this.scrollYMap[key] = window.scrollY;
  },

  handleDidTransition() {
    const key = this.get('routing.currentRouteName');
    const shouldScrollTo = this.hasStashedRoute(key);

    if(shouldScrollTo){
      Ember.run.later('afterRender', () => window.scrollTo(0, this.scrollYMap[key]));
      this.clearRight(key);
    }
  }
});
