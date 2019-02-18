import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { currency } from 'watermelon-juice/helpers/currency';
import $ from 'jquery';

moduleForComponent("rows/total-row", "Integration | Component | rows/total row", {
  integration: true
});

test("it shows information when present", function(assert) {
  const label = "item label",
        value = 90;

  this.set("label", label);
  this.set("value", value);
  this.render(hbs`{{rows/total-row
                    label=label
                    value=value}}`);

  assert.equal($(".label").text(), label);
  assert.equal($(".value").text(), currency([value]));
});
