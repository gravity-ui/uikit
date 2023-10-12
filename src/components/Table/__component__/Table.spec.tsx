import React from 'react';

import {expect, test} from '@playwright/experimental-ct-react';

import {Table} from '../Table';

import {columns, data} from './utils';

test.describe('Table', () => {
    test('render table by default', async ({mount}) => {
        const component = await mount(<Table columns={columns} data={data} />);

        await expect(component).toHaveScreenshot();
    });

    test('render table by empty data', async ({mount}) => {
        const component = await mount(<Table columns={columns} data={[]} />);

        await expect(component).toHaveScreenshot();
    });

    test('render table with edge padding', async ({mount}) => {
        const component = await mount(<Table columns={columns} data={data} edgePadding={true} />);

        await expect(component).toHaveScreenshot();
    });

    test('render table with no data (custom)', async ({mount}) => {
        const emptyText = 'Custom no data message';
        const component = await mount(
            <Table columns={columns} data={[]} emptyMessage={emptyText} />,
        );

        await expect(component).toHaveScreenshot();
    });
});
