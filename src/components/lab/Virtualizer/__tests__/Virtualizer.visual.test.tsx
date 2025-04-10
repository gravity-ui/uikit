import {test} from '~playwright/core';

import {Virtualizer} from '../Virtualizer';

test.describe('Virtualizer', {tag: '@Virtualizer'}, () => {
    test('visible virtualizer', async ({mount, expectScreenshot}) => {
        await mount(
            <Virtualizer
                data-qa="visible-virtualizer"
                count={3}
                getItemSize={() => 30}
                getItemKey={(index) => `item-${index}`}
                renderRow={(item) => <div>Item {item.index}</div>}
                style={{height: '100px', width: '200px', border: '1px solid blue'}}
            />,
        );

        await expectScreenshot();
    });

    test('hidden virtualizer', async ({mount, expectScreenshot}) => {
        await mount(
            <Virtualizer
                data-qa="hidden-virtualizer"
                hidden
                count={3}
                getItemSize={() => 30}
                getItemKey={(index) => `item-${index}`}
                renderRow={(item) => <div>Item {item.index}</div>}
                style={{height: '100px', width: '200px', border: '1px solid blue'}}
            />,
        );

        await expectScreenshot();
    });
});
