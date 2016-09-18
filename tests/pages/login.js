import PO from 'watermelon-juice/tests/page-object';

const { visitable, clickable, text } = PO;

export default PO.create({
  visit: visitable('/login'),
  clickSubmit: clickable(".submit"),
  errorMessage: text(".error")
});
