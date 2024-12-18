import React from 'react';

import {test} from '~playwright/core';

import {FlexStories} from './stories';

test.describe('Flex', {tag: '@Flex'}, () => {
    test('render story <Default>', async ({mount, expectScreenshot}) => {
        const props = {
            alignItems: 'center',
            justifyContent: 'center',
        } as const;

        await mount(<FlexStories.Default {...props} />);

        await expectScreenshot();
    });

    test('render story <FlexGap>', async ({mount, expectScreenshot}) => {
        const props = {
            gap: {s: '1', m: '6'},
        } as const;

        await mount(<FlexStories.FlexGap {...props} />);

        await expectScreenshot();
    });

    test('render story <GapAndRowGap>', async ({mount, expectScreenshot}) => {
        const props = {
            gap: {s: '1', m: '6'},
            gapRow: {s: '6', m: '1'},
        } as const;

        await mount(<FlexStories.GapAndRowGap {...props} />);

        await expectScreenshot();
    });

    test('render story <ChildrenWithBgColor>', async ({mount, expectScreenshot}) => {
        await mount(<FlexStories.ChildrenWithBgColor />);

        await expectScreenshot();
    });

    test('render story <WithNullChildren>', async ({mount, expectScreenshot}) => {
        await mount(<FlexStories.WithNullChildren />);

        await expectScreenshot();
    });
});
