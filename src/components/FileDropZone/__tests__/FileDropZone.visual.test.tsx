import {test} from '~playwright/core';

import {FileDropZoneStories} from './helpersPlaywright';

test.describe('FileDropZone', {tag: '@FileDropZone'}, () => {
    test('render story: <Default>', async ({mount, expectScreenshot}) => {
        await mount(<FileDropZoneStories.Default />);

        await expectScreenshot();
    });

    test('render story: <CustomTexts>', async ({mount, expectScreenshot}) => {
        await mount(<FileDropZoneStories.CustomTexts />);

        await expectScreenshot();
    });

    test('render story: <Disabled>', async ({mount, expectScreenshot}) => {
        await mount(<FileDropZoneStories.Disabled />);

        await expectScreenshot();
    });

    test('render story: <Errors>', async ({mount, expectScreenshot}) => {
        await mount(<FileDropZoneStories.Errors />);

        await expectScreenshot();
    });

    test('render story: <Icons>', async ({mount, expectScreenshot}) => {
        await mount(<FileDropZoneStories.Icons />);

        await expectScreenshot();
    });

    test('render story: <CustomLayout>', async ({mount, expectScreenshot}) => {
        await mount(<FileDropZoneStories.CustomLayout />);

        await expectScreenshot();
    });
});
