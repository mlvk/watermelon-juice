import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import computed from 'ember-computed-decorators';

const { equal } = Ember.computed;

export default Model.extend({
  date:               attr('string'),
  publishedState:     attr('string'),
  startTime:          attr('number'),
  endTime:            attr('number'),
  dropOffCount:       attr('number'),
  pickUpCount:        attr('number'),

  routeVisits:        hasMany('route-visit'),

  @computed('date')
  formattedDate(date) {
    return moment(date, 'YYYY-MM-DD').format("dddd, MMM Do - YYYY");
  },

  @computed('routeVisits.@each.{position}')
  sortedRouteVisits(routeVisits) {
    return routeVisits.sortBy('position');
  },

  isDraft: equal('publishedState', 'draft'),
  isPublished: equal('publishedState', 'published'),
  isCompleted: equal('publishedState', 'completed')
});
