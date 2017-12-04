import { renderComponent, expect } from '../test_helper';
import Credits from '../../src/components/addCredits';

describe('Credits', () => {
    let component;

    beforeEach(() => {
        component = renderComponent(Credits);
    });

    it('renders successfully', () => {
        expect(component).to.exist;
    });

    it('has the correct class', () => {
        expect(component).to.have.class('credit-Box');
    });

    it('has the correct element', () => {
        expect(component.find('form')).to.exist;
    });

    describe('Transactions inputs', () => {
        beforeEach(() => {
            component.find('input').simulate('change', 'debitfrom');
        });

        it('shows the value in input box', () => {
            expect(component.find('input')).to.have.value('on');
        });

    });

});