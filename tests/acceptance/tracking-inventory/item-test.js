import { test } from "qunit";
import moduleForAcceptance from "watermelon-juice/tests/helpers/module-for-acceptance";
import { authenticateSession } from "watermelon-juice/tests/helpers/ember-simple-auth";
import { item as page } from "watermelon-juice/tests/pages/track-inventory";
import applicationPage from "watermelon-juice/tests/pages/application";
import TrackingStates from "watermelon-juice/constants/tracking-states";

import {
  mockFindRecord
} from "ember-data-factory-guy";

import {
  buildRoutePlansWithSalesOrder
} from "watermelon-juice/tests/factories/route-plan";

moduleForAcceptance("Acceptance | tracking inventory item", {
  async beforeEach() {
    authenticateSession(this.application);

    this.routePlan = buildRoutePlansWithSalesOrder();
    this.routeVisit = this.routePlan.get("routeVisits.firstObject");
    this.fulfillment = this.routeVisit.get("fulfillments.firstObject");
    this.stockLevel = this.fulfillment.get("stock.stockLevels.firstObject");
    this.item = this.stockLevel.get("item");

    this.fulfilmentUrl = `/route-plans/${this.routePlan.get("id")}/route-visits/${this.routeVisit.get("id")}/fulfillments/${this.fulfillment.id}`;

    mockFindRecord("route-plan").returns({model: this.routePlan});
    mockFindRecord("route-visit").returns({model: this.routeVisit});
    mockFindRecord("fulfillment").returns({model: this.fulfillment});

    await page.visit({
      route_plan_id:this.routePlan.get("id"),
      route_visit_id:this.routeVisit.get("id"),
      fulfillment_id:this.fulfillment.get("id"),
      item_id:this.item.get("id")
    });
  }
});

test("displays stock level information when present", function(assert) {

  assert.equal(page.totalStarting.value, 0);
  assert.equal(page.returns.value, 0);
});

test("changable total starting and returns values", async function(assert) {
  await page.totalStarting
    .increase()
    .increase();
  await page.returns.increase();

  assert.equal(this.stockLevel.get("starting"), 2);
  assert.equal(this.stockLevel.get("returns"), 1);

  await page.totalStarting.decrease();
  await page.returns.decrease();

  assert.equal(this.stockLevel.get("starting"), 1);
  assert.equal(this.stockLevel.get("returns"), 0);
});

test("navigates to tracking index when clicked on Mark Tracked button", async function(assert) {
  await page.clickMarkTrackedButton();

  const trackingState = this.stockLevel.get("trackingState");
  assert.equal(trackingState, TrackingStates.TRACKED);

  const trackingIndexUrl = `${this.fulfilmentUrl}/tracking`;
  assert.equal(currentURL(), trackingIndexUrl);
});

test("navigates back to tracking index", async function(assert) {
  await applicationPage.goBack();

  const trackingIndexUrl = `${this.fulfilmentUrl}/tracking`;
  assert.equal(currentURL(), trackingIndexUrl);
});
