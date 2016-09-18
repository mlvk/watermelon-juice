import Ember from "ember";
import { test } from "qunit";
import moduleForAcceptance from "watermelon-juice/tests/helpers/module-for-acceptance";
import { authenticateSession } from "watermelon-juice/tests/helpers/ember-simple-auth";
import loginPage from "watermelon-juice/tests/pages/login";
import routePlansPage from "watermelon-juice/tests/pages/route-plans/index";

import {
  mockFindAll
} from "ember-data-factory-guy";

const successfulResponse = {"id":1,"token":"admin_token","first_name":"Tony","last_name":"Starks","email":"admin@wutang.com","role":"driver"};
const unauthorizedResponse = {"error":"Invalid email or password."};
const failedResponse = {"error":"Could not connect to the server."};

moduleForAcceptance("Acceptance | login");

test("redirects to landing when already logged in", async function(assert) {
  authenticateSession(this.application);

  mockFindAll("route-plan");

  await loginPage.visit();

  assert.equal(currentURL(), "/route-plans");
});

test("redirects to login when not authenticated", async function(assert) {
  await routePlansPage.visit();

  assert.equal(currentURL(), "/login");
});

test("successful login redirects to to default landing area", async function(assert) {
  Ember.$.mockjax({ url: `/users/sign_in`, responseText:successfulResponse , type: "POST" });

  mockFindAll("route-plan");

  await loginPage.visit();
  await loginPage.clickSubmit();

  assert.equal(currentURL(), "/route-plans");
});

test("displays errors when unauthorized", async function(assert) {
  Ember.$.mockjax({ url: `/users/sign_in`, responseText:unauthorizedResponse, status:401, type: "POST"});

  mockFindAll("route-plan");

  await loginPage.visit();
  await loginPage.clickSubmit();

  assert.equal(currentURL(), "/login");
  assert.equal(loginPage.errorMessage, unauthorizedResponse.error);
});

test("displays errors when failed with 500", async function(assert) {
  Ember.$.mockjax({ url: `/users/sign_in`, responseText:failedResponse, status:500, type: "POST"});

  mockFindAll("route-plan");

  await loginPage.visit();
  await loginPage.clickSubmit();

  assert.equal(currentURL(), "/login");
  assert.equal(loginPage.errorMessage, failedResponse.error);
});
