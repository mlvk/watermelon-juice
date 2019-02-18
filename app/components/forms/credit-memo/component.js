import Component from '@ember/component';
import { filterBy, gt } from '@ember/object/computed';
import { computed } from '@ember/object';
import moment from "moment";

export default Component.extend({
  classNames:         ["col", "stretch", "card-1"],
  classNameBindings:  ["shouldDisplay::hidden"],

  validCreditNoteItems: filterBy("model.creditNoteItems", "hasCredit", true),
  shouldDisplay:        gt("total", 0),

  date: computed("model.date", function(){
    const date = this.get("model.date");
    return moment(date, "YYYY-MM-DD").format("MM/DD/YYYY");
  }),

  total: computed("validCreditNoteItems.@each.{total}", function(){
    const creditNoteItems = this.get("validCreditNoteItems") || [];
    return creditNoteItems.reduce((acc, cur) => acc + cur.get("total"), 0);
  })
});
