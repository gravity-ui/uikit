import userEvent from '@testing-library/user-event';

import {render, screen} from '../../../../test-utils/utils';
import {MobileProvider} from '../../mobile';

import {ControlledSelect, renderControl, setup} from './utils';

describe('Select label', () => {
    test('names the combobox', () => {
        setup({label: 'Fruit:'});

        screen.getByRole('combobox', {name: 'Fruit:'});
    });

    test('adds to aria-label', () => {
        setup({label: 'Fruit:', 'aria-label': 'Fruit'});

        screen.getByRole('combobox', {name: 'Fruit Fruit:'});
    });

    test('follows the own aria-labelledby', () => {
        render(
            <div>
                <span id="fruit-caption">Fruit</span>
                <ControlledSelect label="Fruit:" aria-labelledby="fruit-caption" />
            </div>,
        );

        screen.getByRole('combobox', {name: 'Fruit Fruit:'});
    });

    test('leaves the own props as they are without a label', () => {
        setup({'aria-label': 'Fruit'});

        const combobox = screen.getByRole('combobox', {name: 'Fruit'});
        expect(combobox).not.toHaveAttribute('aria-labelledby');
    });

    test.each([
        {name: 'popup', mobile: false},
        {name: 'sheet', mobile: true},
    ])('names the list of the $name by the same references', async ({mobile}) => {
        render(
            <MobileProvider mobile={mobile}>
                <span id="fruit-caption">Fruit</span>
                <ControlledSelect label="Fruit:" aria-labelledby="fruit-caption" />
            </MobileProvider>,
        );

        await userEvent.click(screen.getByRole('combobox', {name: 'Fruit Fruit:'}));

        screen.getByRole('listbox', {name: 'Fruit Fruit:'});
    });

    test('does not name a custom control', () => {
        setup({label: 'Fruit:', renderControl});

        expect(screen.getByRole('combobox')).not.toHaveAttribute('aria-labelledby');
    });
});
