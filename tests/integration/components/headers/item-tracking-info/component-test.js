import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {
  make,
  manualSetup
} from 'ember-data-factory-guy';

moduleForComponent('headers/item-tracking-info', 'Integration | Component | headers/item tracking info', {
  integration: true,

  beforeEach: function () {
    manualSetup(this.container);
  }
});

test('it renders', function(assert) {
  const item = make("item");

  this.set("item", item);
  this.render(hbs`{{headers/item-tracking-info model=item}}`);

  assert.equal(this.$(".item").text().trim(), item.get("name"));
});
