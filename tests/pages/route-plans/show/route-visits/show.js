import PO from 'ember-cli-page-object';

const { visitable, clickable, collection } = PO;

export default PO.create({
  visit: visitable('/route-plans/:route_plan_id/route-visits/:route_visit_id/'),

  fulfillments: collection({
    itemScope: '.debug_rows_fulfillment-list-row',

    item: {
      click: clickable()
    }
  })
});
