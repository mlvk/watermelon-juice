import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {
  make,
  manualSetup
} from 'ember-data-factory-guy';

moduleForComponent('headers/location-tracking-info', 'Integration | Component | headers/location tracking info', {
  integration: true,

  beforeEach: function () {
    manualSetup(this.container);
  }
});

test('it renders', function(assert) {
  const location = make("location");

  const firstLine = location.get("company.name");
  const secondLine = `${location.get("code")} - ${location.get("name")}`;

  this.set("location", location);
  this.render(hbs`{{headers/location-tracking-info model=location}}`);

  assert.equal(this.$(".company").text().trim(), firstLine);
  assert.equal(this.$(".location").text().trim(), secondLine);
});
