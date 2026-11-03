import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';

import {expect, test} from '~playwright/core';

import {TextInput} from '../../controls/TextInput';
import {Sheet} from '../Sheet';
import type {SheetProps} from '../Sheet';
import {DEFAULT_SHEET_QA} from '../__stories__/constants';
import {SheetQa} from '../constants';

import {hideTopBarCases, titleCases} from './cases';
import {QASheet} from './constants';
import {TestSheet} from './helpers';
import {SheetStories} from './helpersPlaywright';

// iPhone-like safe-area insets: sides wider than the 10px fallback, bottom > 0
const NOTCH_DEVICE_SAFE_AREA_INSETS = {top: 50, left: 44, right: 44, bottom: 34};

test.describe('Sheet', {tag: '@Sheet'}, () => {
    test('render story: <Default>', async ({page, mount, expectScreenshot}) => {
        await mount(<SheetStories.Default />);

        await page.getByRole('button').click();

        const sheetLocator = page.locator(`[data-qa=${DEFAULT_SHEET_QA}]`);

        await expect(sheetLocator).toBeVisible();

        await expectScreenshot({
            locator: sheetLocator,
            options: {animations: 'disabled'},
        });
    });

    test('safe-area: content padding on a device with a notch', async ({
        page,
        mount,
        expectScreenshot,
    }) => {
        await page.setViewportSize({width: 390, height: 844});

        // Set real env(safe-area-inset-*) via experimental CDP method
        const cdpSession = await page.context().newCDPSession(page);
        await cdpSession.send('Emulation.setSafeAreaInsetsOverride', {
            insets: NOTCH_DEVICE_SAFE_AREA_INSETS,
        });

        try {
            const root = await mount(<TestSheet />, {
                rootStyle: {
                    padding: 0,
                    width: '100%',
                    minHeight: '844px',
                },
            });

            await root.locator('button').click();
            await expect(page.locator(`[data-qa='${QASheet.content}']`)).toBeVisible();

            await expectScreenshot({
                themes: ['light'],
            });
        } finally {
            // The override survives page teardown and can affect the next test in this worker.
            await cdpSession.send('Emulation.setSafeAreaInsetsOverride', {
                insets: {top: 0, left: 0, right: 0, bottom: 0},
            });
        }
    });

    [
        {coefficient: undefined, height: 464, before: {top: 84, bottom: 844}},
        {coefficient: 0.5, height: 300, before: {top: 422, bottom: 844}},
    ].forEach(({coefficient, height, before}) => {
        test(`viewport resize: keeps the top edge and follows the new bottom at once, coefficient ${coefficient ?? 'default'}`, async ({
            page,
            mount,
        }) => {
            await page.setViewportSize({width: 390, height: 844});

            const root = await mount(
                <TestSheet alwaysFullHeight maxContentHeightCoefficient={coefficient} />,
                {rootStyle: {padding: 0, width: '100%', minHeight: '844px'}},
            );

            // Resizes are deferred until the open transition ends; listen before opening.
            await page.evaluate((veilQa) => {
                document.addEventListener('transitionend', (event) => {
                    if (
                        event.target instanceof Element &&
                        event.target.matches(`[data-qa="${veilQa}"]`)
                    ) {
                        document.body.dataset.sheetOpened = 'true';
                    }
                });
            }, SheetQa.VEIL);
            await root.locator('button').click();
            await expect(page.locator('body')).toHaveAttribute('data-sheet-opened', 'true');

            const sheetTop = page.getByTestId(SheetQa.TOP);
            const contentArea = page.getByTestId(SheetQa.CONTENT_AREA);
            const getEdges = async () => {
                const [top, content] = await Promise.all([
                    sheetTop.boundingBox(),
                    contentArea.boundingBox(),
                ]);

                return {
                    top: Math.round(top?.y ?? 0),
                    bottom: Math.round((content?.y ?? 0) + (content?.height ?? 0)),
                };
            };

            expect(await getEdges()).toEqual(before);

            await page.setViewportSize({width: 390, height});
            await page.evaluate(
                () => new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve))),
            );

            expect(await getEdges()).toEqual({top: 84, bottom: height});
        });
    });

    test('sticky title: keeps short content accessible as the visible area shrinks and grows', async ({
        page,
        mount,
    }) => {
        await page.setViewportSize({width: 390, height: 844});
        await mount(
            <Sheet defaultOpen stickyTitle title={<div style={{height: '400px'}}>Tall title</div>}>
                <div style={{height: '80px'}}>Short content</div>
            </Sheet>,
        );
        const title = page.getByTestId(SheetQa.TITLE);
        const contentArea = page.getByTestId(SheetQa.CONTENT_AREA);
        const content = page.getByText('Short content');
        const titlePosition = () => title.evaluate((element) => getComputedStyle(element).position);

        await expect.poll(titlePosition).toBe('sticky');
        await expect(content).toBeInViewport({ratio: 0.99});

        await page.setViewportSize({width: 390, height: 464});
        await expect.poll(titlePosition).toBe('static');
        await contentArea.evaluate((element) => {
            element.scrollTo({top: element.scrollHeight});
        });
        await expect(content).toBeInViewport({ratio: 0.99});
        expect(
            await content.evaluate((element) => {
                const rect = element.getBoundingClientRect();
                return element.contains(
                    document.elementFromPoint(
                        rect.left + rect.width / 2,
                        rect.top + rect.height / 2,
                    ),
                );
            }),
        ).toBe(true);

        await page.setViewportSize({width: 390, height: 844});
        await expect.poll(titlePosition).toBe('sticky');
        await expect(content).toBeInViewport({ratio: 0.99});

        await page.getByText('Tall title').evaluate((element) => {
            element.style.setProperty('height', '120px');
        });
        await expect(contentArea).toHaveCSS('scroll-padding-block-start', '120px');
        await expect(content).toBeInViewport({ratio: 0.99});
    });

    test('sticky title: keeps focused content visible when tabbing backwards', async ({
        page,
        mount,
    }) => {
        await page.setViewportSize({width: 390, height: 500});
        await mount(
            <Sheet
                defaultOpen
                alwaysFullHeight
                stickyTitle
                title={<div style={{height: 160}}>Title</div>}
            >
                {Array.from({length: 20}, (_, index) => (
                    <button key={index} style={{display: 'block', height: 40}}>
                        Action {index + 1}
                    </button>
                ))}
            </Sheet>,
        );
        const title = page.getByTestId(SheetQa.TITLE);
        const actions = page.getByRole('button', {name: /^Action /});
        await expect(title).toHaveCSS('position', 'sticky');
        await actions.last().focus();

        for (let index = 18; index >= 0; index--) {
            await page.keyboard.press('Shift+Tab');
            const action = actions.nth(index);
            await expect(action).toBeFocused();
            await expect
                .poll(async () => {
                    const titleBox = await title.boundingBox();
                    const actionBox = await action.boundingBox();
                    return titleBox && actionBox
                        ? Math.round(actionBox.y - titleBox.y - titleBox.height)
                        : -Infinity;
                })
                .toBeGreaterThanOrEqual(0);
        }
    });

    test('sticky title: covers input labels and receives clicks above scrolled content', async ({
        page,
        mount,
    }) => {
        await page.setViewportSize({width: 390, height: 500});
        await mount(
            <Sheet
                defaultOpen
                stickyTitle
                title={<button style={{height: 100, width: '100%'}}>Header action</button>}
            >
                <TextInput label="Content label" />
                <div style={{height: 1000}} />
            </Sheet>,
        );
        const headerAction = page.getByRole('button', {name: 'Header action'});
        const contentArea = page.getByTestId(SheetQa.CONTENT_AREA);
        await expect(page.getByTestId(SheetQa.TITLE)).toHaveCSS('position', 'sticky');
        await contentArea.evaluate((element) => {
            element.scrollTo({top: 80});
        });
        const point = await page.getByText('Content label').evaluate((element) => {
            const rect = element.getBoundingClientRect();
            return {x: rect.left + rect.width / 2, y: rect.top + rect.height / 2};
        });
        expect(
            await headerAction.evaluate(
                (element, {x, y}) => element.contains(document.elementFromPoint(x, y)),
                point,
            ),
        ).toBe(true);
        await page.mouse.click(point.x, point.y);
        await expect(headerAction).toBeFocused();
    });

    createSmokeScenarios<Partial<Omit<SheetProps, 'open' | 'defaultOpen' | 'onOpenChange'>>>(
        {},
        {
            hideTopBar: hideTopBarCases,
            title: titleCases,
        },
    ).forEach(([title, props]) => {
        test(`smoke ${title}`, {tag: ['@smoke']}, async ({mount, page, expectScreenshot}) => {
            await page.setViewportSize({width: 500, height: 500});

            const root = await mount(<TestSheet {...props} />, {
                rootStyle: {
                    padding: 0,
                    width: '100%',
                    minHeight: '500px',
                },
            });

            await root.locator('button').click();
            await expect(page.locator(`[data-qa='${QASheet.content}']`)).toBeVisible();

            await expectScreenshot({
                themes: ['light'],
            });
        });
    });
});
