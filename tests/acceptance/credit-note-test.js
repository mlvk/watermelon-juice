import { test } from "qunit";
import moduleForAcceptance from "watermelon-juice/tests/helpers/module-for-acceptance";
import { authenticateSession } from "watermelon-juice/tests/helpers/ember-simple-auth";
import trackingPage from "watermelon-juice/tests/pages/route-plans/show/route-visits/show/fulfillments/tracking/item";
import reviewPage from "watermelon-juice/tests/pages/route-plans/show/route-visits/show/fulfillments/review";

import {
  make,
  mockFindRecord,
  mockCreate
} from "ember-data-factory-guy";

import {
  buildRoutePlansWithSalesOrder
} from "watermelon-juice/tests/factories/route-plan";

moduleForAcceptance("Acceptance | credit-note", {
  beforeEach() {
    authenticateSession(this.application);
  }
});

test('credits credit note when there are returns and credit rate is greater than 0', async function(assert) {
  const routePlan = buildRoutePlansWithSalesOrder();
  const routeVisit = await routePlan.get("routeVisits.firstObject");
  const fulfillment = await routeVisit.get("fulfillments.firstObject");
  const order = await fulfillment.get("order");
  const location = await order.get("location");
  const orderItems = await order.get("orderItems");
  const items = await Promise.all(orderItems.map(oi => oi.get("item")));

  items.forEach(item => make("item-credit-rate", {location, item, rate:0.5}));

  mockFindRecord("route-plan").returns({model: routePlan});
  mockCreate("stock-level");

  await trackingPage
    .visit({
      route_plan_id:routePlan.get("id"),
      route_visit_id:routeVisit.get("id"),
      fulfillment_id:fulfillment.get("id"),
      item_id: order.get("orderItems.firstObject.item.id")
    })
    .incrementReturns();

  await reviewPage
    .visit({
      route_plan_id:routePlan.get("id"),
      route_visit_id:routeVisit.get("id"),
      fulfillment_id:fulfillment.get("id")
    });

  // return pauseTest();

  assert.equal(reviewPage.creditTotal, "$5.00");
});
