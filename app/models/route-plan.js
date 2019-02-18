import { gt, lt } from '@ember/object/computed';
import Model from "ember-data/model";
import attr from "ember-data/attr";
import { hasMany } from "ember-data/relationships";
import { computed } from '@ember/object';

export default Model.extend({
  date:               attr("string"),
  publishedState:     attr("string"),
  startTime:          attr("number"),
  endTime:            attr("number"),
  dropOffCount:       attr("number", {defaultValue: 0}),
  pickUpCount:        attr("number", {defaultValue: 0}),

  routeVisits:        hasMany("route-visit"),

  hasPickups:         gt("pickUpCount", 0),
  hasDeliveries:      gt("dropOffCount", 0),
  isComplete:         lt("pendingRouteVisits.length", 1),

  formattedDate: computed("date", function() {
    const date = this.get("date");
    return moment(date, "YYYY-MM-DD").format("dddd, MMM Do - YYYY");
  }),

  sortedRouteVisits: computed("routeVisits.@each.{position}", function() {
    const routeVisits = this.get("routeVisits");
    return routeVisits.sortBy("position");
  }),

  pendingRouteVisits: computed("routeVisits.@each.{fulfilled}", function() {
    const routeVisits = this.get("routeVisits");
    return routeVisits.filter(rv => rv.get("pending"));
  })
});
