import { lt, alias } from '@ember/object/computed';
import Model from "ember-data/model";
import attr from "ember-data/attr";
import { belongsTo } from "ember-data/relationships";
import { computed } from '@ember/object';

export default Model.extend({
  quantity:   attr("number", { defaultValue: 0 }),
  unitPrice:  attr("number", { defaultValue: 0 }),

  order:      belongsTo("order"),
  item:       belongsTo("item"),

  empty:      lt("quantity", 1),
  name:       alias("item.name"),

  total: computed("quantity", "unitPrice", function() {
    const quantity = this.get("quantity");
    const unitPrice = this.get("unitPrice");
    return quantity * unitPrice;
  })
});
