import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import {
  make,
  manualSetup
} from "ember-data-factory-guy";

moduleForComponent("headers/fulfillment-info", "Integration | Component | headers/fulfillment info", {
  integration: true,

  beforeEach: function () {
    manualSetup(this.container);
  }
});

test("it renders", function(assert) {
  const fulfillment = make("fulfillment", "withOrder");

  const firstLine = fulfillment.get("order.location.company.name");
  const secondLine = `${fulfillment.get("order.location.code")} - ${fulfillment.get("order.location.name")}`;

  this.set("fulfillment", fulfillment);
  this.render(hbs`{{headers/fulfillment-info model=fulfillment}}`);

  assert.equal(this.$(".companyName").text().trim(), firstLine);
  assert.equal(this.$(".locationCode").text().trim(), secondLine);
});
