import PO from 'watermelon-juice/tests/page-object';

const {
  visitable,
  clickable,
  fillable
} = PO;

export default PO.create({
  visit: visitable('/route-plans/:route_plan_id/route-visits/:route_visit_id/fulfillments/:fulfillment_id/tracking/:item_id/'),

  incrementStarting: clickable(".staring .increase"),
  decrementStarting: clickable(".staring .decrease"),

  incrementReturns: clickable(".returns .increase"),
  decrementReturns: clickable(".returns .decrease"),

  setStarting: fillable(".starting input"),
  setReturns: fillable(".returns input")
});
