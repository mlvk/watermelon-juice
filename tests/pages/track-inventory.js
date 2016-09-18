import PO from "watermelon-juice/tests/page-object";

const {
  visitable,
  collection,
  clickable,
  value
} = PO;

const index = PO.create({
  visit: visitable("/route-plans/:route_plan_id/route-visits/:route_visit_id/fulfillments/:fulfillment_id/tracking"),

  clickMarkTrackedButton: clickable(".markTracked"),

  stockLevels: collection({
    itemScope: ".debug_rows_completeable-label-row",

    item: {
      clickItem: clickable()
    }
  })
});

const item = PO.create({
  visit: visitable("/route-plans/:route_plan_id/route-visits/:route_visit_id/fulfillments/:fulfillment_id/tracking/:item_id"),

  clickMarkTrackedButton: clickable(".markTracked"),

  totalStarting: {
    value: value(".starting input"),
    increase: clickable(".starting .increase"),
    decrease: clickable(".starting .decrease")
  },

  returns: {
    value: value(".returns input"),
    increase: clickable(".returns .increase"),
    decrease: clickable(".returns .decrease")
  }
});

export {
  index,
  item
}
