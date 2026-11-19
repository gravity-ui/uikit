import {expect, test} from '~playwright/core';

import {Select} from '../Select';

const OPTIONS = [{value: 'apple', content: 'Apple'}];

test.describe('Select trigger name', {tag: '@Select'}, () => {
    test('label names the combobox and stays out of its value', async ({mount, page}) => {
        await mount(<Select label="Fruit:" value={['apple']} options={OPTIONS} />);

        await expect(page.getByRole('combobox')).toMatchAriaSnapshot('- combobox "Fruit:": Apple');
    });

    test('aria-label and label both name the combobox', async ({mount, page}) => {
        await mount(
            <Select aria-label="Fruit" label="Fruit:" value={['apple']} options={OPTIONS} />,
        );

        await expect(page.getByRole('combobox')).toMatchAriaSnapshot(
            '- combobox "Fruit Fruit:": Apple',
        );
    });

    test('placeholder is not a name', async ({mount, page}) => {
        await mount(<Select placeholder="Pick a fruit" options={OPTIONS} />);

        await expect(page.getByRole('combobox')).toMatchAriaSnapshot('- combobox: Pick a fruit');
    });
});
