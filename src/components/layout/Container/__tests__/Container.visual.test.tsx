import {expect, test} from '~playwright/core';

import {DEFAULT_LAYOUT_THEME} from '../../constants';
import {Container} from '../Container';

import {ContainerStories} from './stories';

test.describe('Container', {tag: '@Container'}, () => {
    const RESERVE_SPACING_PX = 5;

    Object.entries(DEFAULT_LAYOUT_THEME.breakpoints).forEach(
        ([breakpointName, breakpointWidthPx]) => {
            test(
                `smoke render story <Default> - ${breakpointName}`,
                {tag: ['@smoke']},
                async ({mount, expectScreenshot, page}) => {
                    const props = {
                        rowGap: {m: 'spacing-1'},
                        size: 'l',
                    } as const;

                    const size = page.viewportSize();
                    if (size) {
                        await page.setViewportSize({
                            width: Math.max(breakpointWidthPx, 320) + RESERVE_SPACING_PX,
                            height: size.height,
                        });
                    }

                    await mount(<ContainerStories.Default {...props} />, {width: 'auto'});

                    await expectScreenshot({
                        themes: ['light'],
                    });
                },
            );
        },
    );
});

test('size caps content width excluding gutters and borders and fits a smaller parent', async ({
    mount,
}) => {
    const component = await mount(
        <div data-qa="sized-parent" style={{width: 1200}}>
            <Container qa="sized-container" size="l" gutters={20} borderWidth={2}>
                Content
            </Container>
        </div>,
    );
    const container = component.locator('[data-qa="sized-container"]');
    await expect(container).toHaveCSS('box-sizing', 'content-box');
    await expect(container).toHaveCSS('width', '1080px');
    await expect(container).toHaveCSS('padding-inline-start', '20px');
    await expect(container).toHaveCSS('border-inline-start-width', '2px');
    const parentBox = await component.locator('[data-qa="sized-parent"]').boundingBox();
    const containerBox = await container.boundingBox();
    if (!parentBox || !containerBox) {
        throw new Error('Container and parent must have bounding boxes');
    }
    expect(containerBox.width).toBe(1124);
    expect(containerBox.x - parentBox.x).toBeCloseTo(38, 1);
    await component.update(
        <div data-qa="sized-parent" style={{width: 320}}>
            <Container qa="sized-container" size="l" gutters={20} borderWidth={2}>
                Content
            </Container>
        </div>,
    );
    await expect(container).toHaveCSS('width', '276px');
    expect((await container.boundingBox())?.width).toBe(320);
});
