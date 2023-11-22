import React from 'react';

import {expect} from '@playwright/experimental-ct-react';

import {TextInput} from '../TextInput';

import {test} from '~playwright/core';

test.describe('Text Input', () => {
    test('fill the input with text', async ({mount}) => {
        const component = await mount(<TextInput />);

        await component.getByRole('textbox').fill('example value');

        await expect(component).toHaveScreenshot();
    });

    test('checking the clear button when pressed', async ({mount}) => {
        const component = await mount(<TextInput hasClear />);

        await component.getByRole('textbox').fill('example value');

        await component.getByRole('button').click();

        await expect(component).toHaveScreenshot();
    });
});
