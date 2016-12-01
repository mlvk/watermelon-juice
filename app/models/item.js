import Ember from "ember";
import Model from "ember-data/model";
import attr from "ember-data/attr";
import { hasMany } from "ember-data/relationships";
import ItemTypes from "watermelon-juice/constants/item-types";

const {
  equal
} = Ember.computed;

export default Model.extend({
  name:             attr("string"),
  code:             attr("string"),
  description:      attr("string"),
  position:         attr("number"),
  tag:              attr("string", {defaultValue: ItemTypes.INGREDIENT}),

  itemDesires:      hasMany("item-desire"),
  itemPrices:       hasMany("item-price"),
  itemCreditRates:  hasMany("item-credit-rate"),
  orderItems:       hasMany("order-item"),
  stockLevels:      hasMany("stock-level"),
  creditNoteItems:  hasMany("credit-note-item"),

  isProduct:        equal("tag", ItemTypes.PRODUCT)
});
