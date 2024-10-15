import React from 'react';

import {test} from '~playwright/core';

import {Select} from '../index';
import type {SelectOption} from '../index';

test.describe('Select', {tag: '@Select'}, () => {
    test('control-with-parent-flex-basis-0', async ({mount, expectScreenshot}) => {
        const options: SelectOption[] = [{value: '1', content: 'Value 1'}];
        await mount(
            <div style={{display: 'flex'}}>
                <div style={{flex: '0 0'}}>
                    <Select value={['1']} options={options} />
                </div>
            </div>,
        );
        await expectScreenshot();
    });
});
