import React from 'react';

import {expect, test} from '@playwright/experimental-ct-react';

import {WrapperCard} from './WrapperCard';

test.describe('Card test component', () => {
    test('render card by default', async ({mount}) => {
        const component = await mount(<WrapperCard />);

        await expect(component).toHaveScreenshot();
    });

    test.describe('render with different themes', () => {
        test('danger', async ({mount}) => {
            const component = await mount(<WrapperCard theme="danger" />);

            await expect(component).toHaveScreenshot();
        });

        test('info', async ({mount}) => {
            const component = await mount(<WrapperCard theme="info" />);

            await expect(component).toHaveScreenshot();
        });

        test('normal', async ({mount}) => {
            const component = await mount(<WrapperCard theme="normal" />);

            await expect(component).toHaveScreenshot();
        });

        test('success', async ({mount}) => {
            const component = await mount(<WrapperCard theme="success" />);

            await expect(component).toHaveScreenshot();
        });

        test('positive', async ({mount}) => {
            const component = await mount(<WrapperCard theme="positive" />);

            await expect(component).toHaveScreenshot();
        });

        test('warning', async ({mount}) => {
            const component = await mount(<WrapperCard theme="warning" />);

            await expect(component).toHaveScreenshot();
        });
    });

    test.describe('render with different size', () => {
        test('m', async ({mount}) => {
            const component = await mount(<WrapperCard size="m" />);

            await expect(component).toHaveScreenshot();
        });

        test('l', async ({mount}) => {
            const component = await mount(<WrapperCard size="l" />);

            await expect(component).toHaveScreenshot();
        });
    });

    test.describe('render with different view', () => {
        test('outlined', async ({mount}) => {
            const component = await mount(<WrapperCard view="outlined" />);

            await expect(component).toHaveScreenshot();
        });

        test('clear', async ({mount}) => {
            const component = await mount(<WrapperCard view="clear" />);

            await expect(component).toHaveScreenshot();
        });

        test('filled', async ({mount}) => {
            const component = await mount(<WrapperCard view="filled" />);

            await expect(component).toHaveScreenshot();
        });

        test('raised', async ({mount}) => {
            const component = await mount(<WrapperCard view="raised" />);

            await expect(component).toHaveScreenshot();
        });
    });

    test('selected when selected=true prop is given', async ({mount}) => {
        const component = await mount(<WrapperCard selected={true} />);

        await expect(component).toHaveScreenshot();
    });

    test('not selected when selected=false prop is given', async ({mount}) => {
        const component = await mount(<WrapperCard selected={false} />);

        await expect(component).toHaveScreenshot();
    });

    test('disabled when disabled=true prop is given', async ({mount}) => {
        const component = await mount(<WrapperCard disabled={true} />);

        await expect(component).toHaveScreenshot();
    });

    test('not disabled when disabled=false prop is given', async ({mount}) => {
        const component = await mount(<WrapperCard disabled={false} />);

        await expect(component).toHaveScreenshot();
    });
});
