import PO from 'watermelon-juice/tests/page-object';

const { visitable, collection, clickable } = PO;
export default PO.create({
  visit: visitable('/route-plans/:route_plan_id'),

  routeVisits: collection({
    itemScope: '.debug_rows_route-visit-list-row',

    item: {
      click: clickable()
    }
  })
});
