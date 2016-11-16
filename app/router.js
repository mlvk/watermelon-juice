import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');

  this.route('route-plans', function() {
    this.route('show', {path:':route_plan_id'}, function() {
      this.route('route-visits', function() {
        this.route('show', {path:':route_visit_id'}, function() {
          this.route('fulfillments', function() {
            this.route('show', {path:':fulfillment_id'}, function() {
              this.route('review');
              this.route('tracking');
            });
          });
        });
      });
    });
  });
});

export default Router;
