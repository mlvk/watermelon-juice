import { test } from "qunit";
import moduleForAcceptance from "watermelon-juice/tests/helpers/module-for-acceptance";
import { authenticateSession } from "watermelon-juice/tests/helpers/ember-simple-auth";
import trackingPage from "watermelon-juice/tests/pages/route-plans/show/route-visits/show/fulfillments/tracking";
import showPage from "watermelon-juice/tests/pages/route-plans/show/route-visits/show/fulfillments/show";
import applicationPage from "watermelon-juice/tests/pages/application";
import TrackingStates from "watermelon-juice/constants/tracking-states";

import {
  makeList,
  mockFindRecord
} from "ember-data-factory-guy";

import {
  buildRoutePlanWithSalesOrder
} from "watermelon-juice/tests/factories/route-plan";

moduleForAcceptance("Acceptance | tracking inventory index", {
  async beforeEach() {
    authenticateSession(this.application);
    this.routePlan = buildRoutePlanWithSalesOrder();
    this.routeVisit = this.routePlan.get("routeVisits.firstObject");
    this.fulfillment = this.routeVisit.get("fulfillments.firstObject");

    this.fulfilmentUrl = `/route-plans/${this.routePlan.get("id")}/route-visits/${this.routeVisit.get("id")}/fulfillments/${this.fulfillment.id}`;

    mockFindRecord("route-plan").returns({model: this.routePlan});
    mockFindRecord("route-visit").returns({model: this.routeVisit});
    mockFindRecord("fulfillment").returns({model: this.fulfillment});
  }
});

test("should only show stock levels for products", async function(assert) {
  makeList("item", 10, "ingredient");
  makeList("item", 10, "product");

  await showPage.visit({
    route_plan_id:this.routePlan.get("id"),
    route_visit_id:this.routeVisit.get("id"),
    fulfillment_id:this.fulfillment.get("id")
  });

  await trackingPage.visit({
    route_plan_id:this.routePlan.get("id"),
    route_visit_id:this.routeVisit.get("id"),
    fulfillment_id:this.fulfillment.get("id")
  });

  assert.equal(trackingPage.stockLevels().count, 11);
});

test("displays stock levels when present", async function(assert) {
  await trackingPage.visit({
    route_plan_id:this.routePlan.get("id"),
    route_visit_id:this.routeVisit.get("id"),
    fulfillment_id:this.fulfillment.get("id")
  });
  assert.equal(trackingPage.stockLevels().count, 1);
});

test("navigates back to fulfillment", async function(assert) {
  await trackingPage.visit({
    route_plan_id:this.routePlan.get("id"),
    route_visit_id:this.routeVisit.get("id"),
    fulfillment_id:this.fulfillment.get("id")
  });

  await applicationPage.goBack();

  assert.equal(currentURL(), this.fulfilmentUrl);
});

test("navigates to fulfillment when clicked on Mark Tracked button", async function(assert) {
  await trackingPage.visit({
    route_plan_id:this.routePlan.get("id"),
    route_visit_id:this.routeVisit.get("id"),
    fulfillment_id:this.fulfillment.get("id")
  });

  await trackingPage.markTracked();

  const trackingState = this.fulfillment.get("stock.stockLevels.firstObject.trackingState");
  assert.equal(trackingState, TrackingStates.TRACKED);

  assert.equal(currentURL(), this.fulfilmentUrl);
});
