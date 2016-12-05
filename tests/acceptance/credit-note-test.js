import { test } from "qunit";
import moduleForAcceptance from "watermelon-juice/tests/helpers/module-for-acceptance";
import { authenticateSession } from "watermelon-juice/tests/helpers/ember-simple-auth";
import trackingPage from "watermelon-juice/tests/pages/route-plans/show/route-visits/show/fulfillments/tracking";
import reviewPage from "watermelon-juice/tests/pages/route-plans/show/route-visits/show/fulfillments/review";
import showPage from "watermelon-juice/tests/pages/route-plans/show/route-visits/show/fulfillments/show";

import {
  make,
  mockFindRecord
} from "ember-data-factory-guy";

import {
  buildRoutePlanWithSalesOrder
} from "watermelon-juice/tests/factories/route-plan";

moduleForAcceptance("Acceptance | credit-note", {
  beforeEach() {
    authenticateSession(this.application);
  }
});

test('shows credit note when there are returns and credit rate is greater than 0', async function(assert) {
  const routePlan = buildRoutePlanWithSalesOrder();
  const routeVisit = await routePlan.get("routeVisits.firstObject");
  const fulfillment = await routeVisit.get("fulfillments.firstObject");
  const order = await fulfillment.get("order");
  const location = await order.get("location");
  const orderItems = await order.get("orderItems");
  const items = await Promise.all(orderItems.map(oi => oi.get("item")));

  items.forEach(item => make("item-credit-rate", {location, item, rate:0.5}));

  mockFindRecord("route-plan").returns({model: routePlan});

  await showPage
    .visit({
      route_plan_id:routePlan.get("id"),
      route_visit_id:routeVisit.get("id"),
      fulfillment_id:fulfillment.get("id")
    });

  await trackingPage
    .visit({
      route_plan_id:routePlan.get("id"),
      route_visit_id:routeVisit.get("id"),
      fulfillment_id:fulfillment.get("id")
    });

  await trackingPage
    .stockLevels(0)
    .setStarting(1)
    .setReturns(1);

  await trackingPage
    .stockLevels(1)
    .setStarting(1)
    .setReturns(1);

  await trackingPage
    .stockLevels(2)
    .setStarting(1)
    .setReturns(1);

  await showPage
    .visit({
      route_plan_id:routePlan.get("id"),
      route_visit_id:routeVisit.get("id"),
      fulfillment_id:fulfillment.get("id")
    });

  await reviewPage
    .visit({
      route_plan_id:routePlan.get("id"),
      route_visit_id:routeVisit.get("id"),
      fulfillment_id:fulfillment.get("id")
    });

  assert.equal(reviewPage.creditTotal, "$3.00");
});
