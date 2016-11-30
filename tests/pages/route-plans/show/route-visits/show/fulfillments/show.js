import PO from 'watermelon-juice/tests/page-object';

const {
  visitable,
  isVisible,
  notHasClass
} = PO;

export default PO.create({
  visit: visitable('/route-plans/:route_plan_id/route-visits/:route_visit_id/fulfillments/:fulfillment_id/'),

  trackInventoryIsVisible: isVisible('.trackInventory'),
  canSubmitRouteVisit: notHasClass('disabled', '.submitRouteVisit')
});
