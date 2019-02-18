import PO from 'ember-cli-page-object';

const { clickable } = PO;
export default PO.create({
  goBack: clickable('.debug_navs_nav-bar .back')
});
