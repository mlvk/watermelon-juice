import Ember from "ember";
import Model from "ember-data/model";
import attr from "ember-data/attr";
import { belongsTo } from "ember-data/relationships";
import computed from "ember-computed-decorators";

const {
  alias,
  gt
} = Ember.computed;

export default Model.extend({
  quantity:     attr("number", {defaultValue: 0}),
  unitPrice:    attr("number", {defaultValue: 0}),
  description:  attr("string"),

  creditNote:   belongsTo("credit-note"),
  item:         belongsTo("item"),

  hasCredit:    gt("total", 0),
  name:         alias("item.name"),

  @computed("quantity", "unitPrice")
  total(quantity, unitPrice) {
    return quantity * unitPrice;
  }
});
