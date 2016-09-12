import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {
  make,
  manualSetup
} from 'ember-data-factory-guy';

moduleForComponent('headers/fulfillment-review-info', 'Integration | Component | headers/fulfillment review info', {
  integration: true,

  beforeEach: function () {
    manualSetup(this.container);
  }
});

test('it renders', function(assert) {
  const fulfillment = make("fulfillment");

  const firstLine = fulfillment.get("order.location.company.name");
  const secondLine = `${fulfillment.get("order.location.code")} - ${fulfillment.get("order.location.name")}`;

  this.set("fulfillment", fulfillment);
  this.render(hbs`{{headers/fulfillment-review-info model=fulfillment}}`);

  assert.equal(this.$(".company").text().trim(), firstLine);
  assert.equal(this.$(".location").text().trim(), secondLine);
});
