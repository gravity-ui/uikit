import React from 'react';

import {withTableSelection} from '../hoc';

import {HOCWithTableSelection} from './helpersPlaywright';

import {test} from '~playwright/core';

test.describe('Table.withTableSelection', () => {
    test('render story: <Default>', async ({mount, expectScreenshot}) => {
        await mount(<HOCWithTableSelection />);

        await expectScreenshot();
    });

    test('render story: <With selection>', async ({mount, expectScreenshot}) => {
        const root = await mount(<HOCWithTableSelection />);
        const fisrtRowCheckbox = root.getByTestId(withTableSelection.getCheckboxQa('0'));

        await fisrtRowCheckbox.click();

        await expectScreenshot();
    });

    test('render story: <With selection all>', async ({mount, expectScreenshot}) => {
        const root = await mount(<HOCWithTableSelection />);
        const fisrtRowCheckbox = root.getByTestId(withTableSelection.headerCheckboxQa);

        await fisrtRowCheckbox.click();

        await expectScreenshot();
    });
});
