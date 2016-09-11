import { test } from "qunit";
import moduleForAcceptance from "watermelon-juice/tests/helpers/module-for-acceptance";
import { authenticateSession } from "watermelon-juice/tests/helpers/ember-simple-auth";
import indexPage from "watermelon-juice/tests/pages/route-plans/index";
import showPage from "watermelon-juice/tests/pages/route-plans/show";
import applicationPage from "watermelon-juice/tests/pages/application";

import {
  make,
  makeList,
  mockFind,
  mockFindAll
} from "ember-data-factory-guy";

moduleForAcceptance("Acceptance | route plans", {
  beforeEach() {
    authenticateSession(this.application);
  }
});

test("can view recent route plans", async function(assert) {
  mockFindAll("route-plan", 3);

  await indexPage.visit();

  assert.equal(indexPage.routePlans().count, 3);
});

test("can select a route plan", async function(assert) {
  const routePlan = make("route-plan");

  mockFind("route-plan").returns({model: routePlan});
  mockFindAll("route-plan").returns({models: [routePlan]});

  await indexPage
    .visit()
    .routePlans(0)
    .click();

  assert.equal(currentURL(), "/route-plans/1");
});

test("can view a route plans route visits", async function(assert) {
  const routePlan = make("route-plan");
  const routeVisits = makeList("route-visit", 3, {routePlan});
  mockFind("route-plan").returns({model: routePlan});

  await showPage.visit({route_plan_id:routePlan.get("id")});

  assert.equal(showPage.routeVisits().count, routeVisits.length);
});

test("when clicking a route visit with a single fulfillment, should navigate to route visit dashboard", async function(assert) {
  const routePlan = make("route-plan");
  const fulfillment = make("fulfillment");
  const routeVisit = make("route-visit", {routePlan, fulfillments: [fulfillment]});

  mockFind("route-plan").returns({model: routePlan});
  mockFind("route-visit").returns({model: routeVisit});
  mockFind("fulfillment").returns({model: routeVisit});

  await showPage.visit({route_plan_id:routePlan.get("id")})

  await showPage.routeVisits(0).click();

  const urlToMatch = `/route-plans/${routePlan.get("id")}/route-visits/${routeVisit.get("id")}/fulfillments/${fulfillment.get("id")}`;
  assert.equal(currentURL(), urlToMatch);
});

test("when clicking a route visit with a multiple fulfillments, should navigate to route visit fulfillments list", async function(assert) {
  const routePlan = make("route-plan");
  const fulfillments = makeList("fulfillment", 3);
  const routeVisit = make("route-visit", {routePlan, fulfillments});

  mockFind("route-plan").returns({model: routePlan});
  mockFind("route-visit").returns({model: routeVisit});

  await showPage.visit({route_plan_id:routePlan.get("id")});

  await showPage.routeVisits(0).click();

  const urlToMatch = `/route-plans/${routePlan.get("id")}/route-visits/${routeVisit.get("id")}`;
  assert.equal(currentURL(), urlToMatch);
});

test("can navigate back to route plan list", async function(assert) {
  mockFindAll("route-plan");
  mockFind("route-plan")

  await showPage.visit({route_plan_id:1});

  await applicationPage.goBack();

  assert.equal(currentURL(), "/route-plans");
});
