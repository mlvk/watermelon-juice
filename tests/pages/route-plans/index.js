import PO from 'ember-cli-page-object';

const { visitable, clickable, collection } = PO;

export default PO.create({
  visit: visitable('/route-plans'),

  routePlans: collection({
    itemScope: '.debug_rows_route-plan-list-row',

    item: {
      click: clickable()
    }
  })
});
