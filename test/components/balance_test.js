import { renderComponent, expect } from '../test_helper';
import Balance from '../../src/components/balance';

describe('Balance', () => {
    let component;

    beforeEach(() => {
        component = renderComponent(Balance);
    });

    it('renders successfully', () => {
        expect(component).to.exist;
    });

    it('has the correct class', () => {
        expect(component).to.have.class('account-header');
    });

    it('has the refresh icon', () => {
        expect(component).to.contain('refresh icon');
    });
    
});