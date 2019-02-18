import EmberObject from '@ember/object';
import ClickableMixin from 'watermelon-juice/mixins/clickable';
import { module, test } from 'qunit';

module('Unit | Mixin | clickable');

// Replace this with your real tests.
test('it works', function(assert) {
  let ClickableObject = EmberObject.extend(ClickableMixin);
  let subject = ClickableObject.create();
  assert.ok(subject);
});
