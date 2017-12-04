import { renderComponent , expect } from '../test_helper';
import Transactions from '../../src/components/transactions';

describe('Transactions' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(Transactions);
  });

  it('renders successfully', () => {
    expect(component).to.exist;
  });

});
