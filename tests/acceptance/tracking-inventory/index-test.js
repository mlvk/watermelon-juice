import { test } from "qunit";
import moduleForAcceptance from "watermelon-juice/tests/helpers/module-for-acceptance";
import { authenticateSession } from "watermelon-juice/tests/helpers/ember-simple-auth";
import { index as page } from "watermelon-juice/tests/pages/track-inventory";
import applicationPage from "watermelon-juice/tests/pages/application";
import TrackingStates from "watermelon-juice/constants/tracking-states";

import {
  mockFindRecord
} from "ember-data-factory-guy";

import {
  buildRoutePlansWithSalesOrder
} from "watermelon-juice/tests/factories/route-plan";

moduleForAcceptance("Acceptance | tracking inventory index", {
  async beforeEach() {
    authenticateSession(this.application);

    this.routePlan = buildRoutePlansWithSalesOrder();
    this.routeVisit = this.routePlan.get("routeVisits.firstObject");
    this.fulfillment = this.routeVisit.get("fulfillments.firstObject");

    this.fulfilmentUrl = `/route-plans/${this.routePlan.get("id")}/route-visits/${this.routeVisit.get("id")}/fulfillments/${this.fulfillment.id}`;

    mockFindRecord("route-plan").returns({model: this.routePlan});
    mockFindRecord("route-visit").returns({model: this.routeVisit});
    mockFindRecord("fulfillment").returns({model: this.fulfillment});

    await page.visit({
      route_plan_id:this.routePlan.get("id"),
      route_visit_id:this.routeVisit.get("id"),
      fulfillment_id:this.fulfillment.get("id")
    });
  }
});

test("displays stock levels when present", function(assert) {
  assert.equal(page.stockLevels().count, 1);
});

test("navigates back to fulfillment", async function(assert) {
  await applicationPage.goBack();

  assert.equal(currentURL(), this.fulfilmentUrl);
});

test("navigates to fulfillment when clicked on Mark Tracked button", async function(assert) {
  await page.clickMarkTrackedButton();

  const trackingState = this.fulfillment.get("stock.stockLevels.firstObject.trackingState");
  assert.equal(trackingState, TrackingStates.TRACKED);

  assert.equal(currentURL(), this.fulfilmentUrl);
});

test("navigates to tracking stock level when clicked on stock level item,", async function(assert) {
  await page.stockLevels(0).clickItem();

  const item = this.fulfillment.get("stock.stockLevels.firstObject.item");
  const trackingStockLevelUrl = `${this.fulfilmentUrl}/tracking/${item.get("id")}`;

  assert.equal(currentURL(), trackingStockLevelUrl);
});
