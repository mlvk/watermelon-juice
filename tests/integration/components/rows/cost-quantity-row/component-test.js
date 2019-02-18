import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { currency } from 'watermelon-juice/helpers/currency';
import $ from 'jquery';

moduleForComponent("rows/cost-quantity-row", "Integration | Component | rows/cost quantity row", {
  integration: true
});

test("it shows information when present", function(assert) {
  const name = "item name",
        code = "code1",
        quantity = 20,
        unitPrice = 10,
        total = quantity * unitPrice,
        model = {
          item: {
            name,
            code
          },
          quantity, unitPrice, total
        };

  this.set("model", model);

  this.render(hbs`{{rows/cost-quantity-row model=model}}`);

  assert.equal($(".name").text(), name);
  assert.equal($(".unitPriceContainer").text(), currency([unitPrice]));
  assert.equal($(".quantity").text(), quantity);
  assert.equal($(".total").text(), currency([total]));
});
