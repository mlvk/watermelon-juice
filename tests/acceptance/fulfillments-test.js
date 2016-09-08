import { test } from "qunit";
import moduleForAcceptance from "watermelon-juice/tests/helpers/module-for-acceptance";
import { authenticateSession } from "watermelon-juice/tests/helpers/ember-simple-auth";
import showPage from "watermelon-juice/tests/pages/route-plans/show/route-visits/show/fulfillments/show";

import applicationPage from "watermelon-juice/tests/pages/application";

import {
  make,
  makeList,
  mockFind
} from "ember-data-factory-guy";

moduleForAcceptance("Acceptance | fulfillments", {
  beforeEach() {
    authenticateSession(this.application);
  }
});

test("should navigate back to route visit list when parent route visit has single fulfillment", async function(assert) {
  const routeVisit = make("route-visit", "withRoutePlan");
  const routePlan = routeVisit.get("routePlan");
  const fulfillment = routeVisit.get("fulfillments.firstObject");

  mockFind("route-plan").returns({model: routeVisit});
  mockFind("route-visit").returns({model: routeVisit});
  mockFind("fulfillment").returns({model: fulfillment});

  await showPage.visit({
    route_plan_id:routePlan.get("id"),
    route_visit_id:routeVisit.get("id"),
    fulfillment_id:fulfillment.get("id")
  });

  await applicationPage.goBack();

  const urlToMatch = `/route-plans/${routePlan.get("id")}`;
  assert.equal(currentURL(), urlToMatch);
});

test("should navigate back to fulfillment list when parent route visit has multiple fulfillments", async function(assert) {
  const routePlan = make("route-plan");
  const fulfillments = makeList("fulfillment", 2);
  const fulfillment = fulfillments[0];
  const routeVisit = make("route-visit", {routePlan, fulfillments});

  mockFind("route-plan").returns({model: routePlan});
  mockFind("route-visit").returns({model: routeVisit});
  mockFind("fulfillment").returns({model: fulfillment});

  await showPage.visit({
    route_plan_id:routePlan.get("id"),
    route_visit_id:routeVisit.get("id"),
    fulfillment_id:fulfillment.get("id")
  });

  await applicationPage.goBack();

  const urlToMatch = `/route-plans/${routePlan.get("id")}/route-visits/${routeVisit.get("id")}`;
  assert.equal(currentURL(), urlToMatch);
});
