import { gt, alias } from '@ember/object/computed';
import Model from "ember-data/model";
import attr from "ember-data/attr";
import { belongsTo } from "ember-data/relationships";
import { computed } from '@ember/object';
import { round } from 'watermelon-juice/utils/math';

export default Model.extend({
  quantity:     attr("number", {defaultValue: 0}),
  unitPrice:    attr("number", {defaultValue: 0}),
  description:  attr("string"),

  creditNote:   belongsTo("credit-note"),
  item:         belongsTo("item"),

  hasCredit:    gt("total", 0),
  name:         alias("item.name"),

  roundedUnitPrice: computed("unitPrice", function() {
    const unitPrice = this.get("unitPrice");
    return round(unitPrice);
  }),

  total: computed("quantity", "roundedUnitPrice", function() {
    const quantity = this.get("quantity");
    const roundedUnitPrice = this.get("roundedUnitPrice");
    return quantity * roundedUnitPrice;
  })
});
