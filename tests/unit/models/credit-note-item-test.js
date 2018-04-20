import { moduleForModel, test } from 'ember-qunit';

moduleForModel('credit-note-item', 'Unit | Model | credit note item', {
  // Specify the other units that are required for this test.
  needs: ['model:credit-note', 'model:item']
});

test('totals correctly', function(assert) {
  let model = this.subject({unitPrice: 3.445, quantity: 2});
  
  assert.equal(model.get('total'), 6.9);
  assert.ok(!!model);
});
