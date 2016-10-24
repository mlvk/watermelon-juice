import { test } from "qunit";
import moduleForAcceptance from "watermelon-juice/tests/helpers/module-for-acceptance";
import { authenticateSession } from "watermelon-juice/tests/helpers/ember-simple-auth";
import showPage from "watermelon-juice/tests/pages/route-plans/show/route-visits/show/fulfillments/show";
import applicationPage from "watermelon-juice/tests/pages/application";

import {
  make,
  makeList,
  mockFindRecord
} from "ember-data-factory-guy";

import {
  buildRoutePlansWithSalesOrder
} from "watermelon-juice/tests/factories/route-plan";

moduleForAcceptance("Acceptance | fulfillments", {
  beforeEach() {
    authenticateSession(this.application);
  }
});

test("should navigate back to route visit list when parent route visit has single fulfillment", async function(assert) {
  const routePlan = buildRoutePlansWithSalesOrder();
  const routeVisit = routePlan.get("routeVisits.firstObject");
  const fulfillment = routeVisit.get("fulfillments.firstObject");

  mockFindRecord("route-plan").returns({model: routeVisit});
  mockFindRecord("route-visit").returns({model: routeVisit});
  mockFindRecord("fulfillment").returns({model: fulfillment});

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
  const fulfillments = makeList("fulfillment", 2, "withOrder");
  const fulfillment = fulfillments[0];
  const routeVisit = make("route-visit", {routePlan, fulfillments});

  mockFindRecord("route-plan").returns({model: routePlan});
  mockFindRecord("route-visit").returns({model: routeVisit});
  mockFindRecord("fulfillment").returns({model: fulfillment});

  await showPage.visit({
    route_plan_id:routePlan.get("id"),
    route_visit_id:routeVisit.get("id"),
    fulfillment_id:fulfillment.get("id")
  });

  await applicationPage.goBack();

  const urlToMatch = `/route-plans/${routePlan.get("id")}/route-visits/${routeVisit.get("id")}`;
  assert.equal(currentURL(), urlToMatch);
});

test("displays track inventory button if fulfillment is a sales order", async function(assert) {
  const routePlan = make("route-plan");
  const fulfillments = makeList("fulfillment", 2, "withOrder");
  const fulfillment = fulfillments[0];
  const routeVisit = make("route-visit", {routePlan, fulfillments});

  mockFindRecord("route-plan").returns({model: routePlan});
  mockFindRecord("route-visit").returns({model: routeVisit});
  mockFindRecord("fulfillment").returns({model: fulfillment});

  await showPage.visit({
    route_plan_id:routePlan.get("id"),
    route_visit_id:routeVisit.get("id"),
    fulfillment_id:fulfillment.get("id")
  });

  assert.ok(showPage.trackInventoryIsVisible)
});

test("hides track inventory button if fulfillment is a purchase order", async function(assert) {
  const routePlan = make("route-plan");
  const fulfillments = makeList("fulfillment", 2, "withPurchaseOrder");
  const fulfillment = fulfillments[0];
  const routeVisit = make("route-visit", {routePlan, fulfillments});

  mockFindRecord("route-plan").returns({model: routePlan});
  mockFindRecord("route-visit").returns({model: routeVisit});
  mockFindRecord("fulfillment").returns({model: fulfillment});

  await showPage.visit({
    route_plan_id:routePlan.get("id"),
    route_visit_id:routeVisit.get("id"),
    fulfillment_id:fulfillment.get("id")
  });

  assert.ok(!showPage.trackInventoryIsVisible)
});
