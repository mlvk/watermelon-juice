import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { currency } from 'watermelon-juice/helpers/currency';

moduleForComponent("rows/total-row", "Integration | Component | rows/total row", {
  integration: true
});

test("it shows information when present", function(assert) {
  const name = "item name",
        total = 90;

  this.set("name", name);
  this.set("total", total);
  this.render(hbs`{{rows/total-row
                    name=name
                    total=total}}`);

  assert.equal($(".name").text(), name);
  assert.equal($(".total").text(), currency([total]));
});
