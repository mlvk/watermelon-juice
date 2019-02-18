import { notEmpty, and } from '@ember/object/computed';
import Model from "ember-data/model";
import attr from "ember-data/attr";

import { belongsTo } from "ember-data/relationships";

export default Model.extend({
  name:         attr("string"),
  signature:    attr("string"),
  signedAt:     attr("date"),

  fulfillment:  belongsTo("fulfillment"),

  hasSignature: notEmpty("signature"),
  hasSignedAt:  notEmpty("signedAt"),
  hasName:      notEmpty("name"),

  isValid:      and("hasSignature", "hasSignedAt", "hasName")
});
