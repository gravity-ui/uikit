import type * as React from 'react';

import {expect, test} from '~playwright/core';

import type {Toast} from '../Toast/Toast';
import type {ToastAction} from '../types';

import {ToastWithEmptyFooter} from './ToastWithEmptyFooter';
import {ToastWithInlinePopup} from './ToastWithInlinePopup';
import {ToastStories} from './helpersPlaywright';

const wrapperOptions = {
    width: 312,
};

function getToastActions({
    contrastButton = true,
    firstLabel = 'Action',
}: {
    contrastButton?: boolean;
    firstLabel?: string;
} = {}): ToastAction[] {
    return [
        {onClick() {}, label: firstLabel, view: contrastButton ? 'contrast-light' : 'normal'},
        {onClick() {}, label: 'Something More', view: 'outlined'},
    ];
}

const simpleToastProps: React.ComponentProps<typeof Toast> = {
    actions: getToastActions(),
    removeCallback: () => {},
    name: 'simple-toast',
    isClosable: true,
    title: 'Do some actions',
    content: 'We address you some concerns regarding your last actions in UI',
};

test.describe('Toast', {tag: '@Toaster'}, () => {
    test('render story: <ToastPlayground> (normal)', async ({mount, expectScreenshot}) => {
        await mount(
            <ToastStories.ToastPlayground
                {...simpleToastProps}
                actions={getToastActions({contrastButton: false})}
                theme="normal"
            />,
            wrapperOptions,
        );

        await expectScreenshot();
    });

    test('render story: <ToastPlayground> (info)', async ({mount, expectScreenshot}) => {
        await mount(
            <ToastStories.ToastPlayground {...simpleToastProps} theme="info" />,
            wrapperOptions,
        );

        await expectScreenshot();
    });

    test('render story: <ToastPlayground> (success)', async ({mount, expectScreenshot}) => {
        await mount(
            <ToastStories.ToastPlayground {...simpleToastProps} theme="success" />,
            wrapperOptions,
        );

        await expectScreenshot();
    });

    test('render story: <ToastPlayground> (warning)', async ({mount, expectScreenshot}) => {
        await mount(
            <ToastStories.ToastPlayground {...simpleToastProps} theme="warning" />,
            wrapperOptions,
        );

        await expectScreenshot();
    });

    test('render story: <ToastPlayground> (danger)', async ({mount, expectScreenshot}) => {
        await mount(
            <ToastStories.ToastPlayground {...simpleToastProps} theme="danger" />,
            wrapperOptions,
        );

        await expectScreenshot();
    });

    test('render story: <ToastPlayground> (utility)', async ({mount, expectScreenshot}) => {
        await mount(
            <ToastStories.ToastPlayground {...simpleToastProps} theme="utility" />,
            wrapperOptions,
        );

        await expectScreenshot();
    });

    test('actions wrap', async ({mount, expectScreenshot}) => {
        const actions = getToastActions({
            firstLabel: 'Really long button text that cause buttons to wrap',
        });

        await mount(
            <ToastStories.ToastPlayground
                {...simpleToastProps}
                actions={actions}
                theme="utility"
            />,
            wrapperOptions,
        );

        await expectScreenshot();
    });

    test('inline-popup remains visible outside the toast', async ({
        mount,
        page,
        expectScreenshot,
    }) => {
        await mount(<ToastWithInlinePopup />);

        const popup = page.locator('[data-toast]').getByTestId('inline-popup');
        await expect(popup).toBeVisible();
        await expect
            .poll(() =>
                popup.evaluate((element) => {
                    const toast = element.closest('[data-toast]');
                    return Boolean(
                        toast &&
                        element.getBoundingClientRect().top > toast.getBoundingClientRect().bottom,
                    );
                }),
            )
            .toBe(true);
        await popup.getByRole('button', {name: 'Inline popup action'}).click({trial: true});

        await expectScreenshot();
    });
    for (const {theme, direction} of [
        {theme: 'light', direction: 'ltr'},
        {theme: 'dark', direction: 'rtl'},
    ] as const) {
        for (const width of [320, 768, 1024, 1440]) {
            test(`footer follows the actions at width ${width} in ${theme} ${direction}`, async ({
                mount,
                page,
            }) => {
                await page.setViewportSize({width, height: 800});
                await page.emulateMedia({colorScheme: theme});
                await mount(
                    <div dir={direction}>
                        <ToastStories.WithFooter
                            {...simpleToastProps}
                            actions={getToastActions({firstLabel: 'A longer primary action'})}
                        />
                    </div>,
                    wrapperOptions,
                );

                const toast = page.locator('[data-toast]');
                const footer = page.getByRole('group', {name: 'Additional information'});
                await expect(footer).toBeVisible();
                await expect(page.locator('body')).toHaveClass(new RegExp(`g-root_theme_${theme}`));
                await expect(footer).toHaveCSS('direction', direction);
                const footerSlot = toast.locator('.g-toast__footer');
                await expect(footerSlot).toHaveCSS('border-top-width', '0px');
                await expect(footerSlot).toHaveCSS('padding', '0px');
                const footerBox = await footerSlot.boundingBox();
                const firstActionBox = await page
                    .getByRole('button', {name: 'A longer primary action'})
                    .boundingBox();
                const actionBox = await page
                    .getByRole('button', {name: 'Something More'})
                    .boundingBox();

                if (direction === 'ltr') {
                    expect(footerBox!.x).toBeCloseTo(firstActionBox!.x);
                } else {
                    expect(footerBox!.x + footerBox!.width).toBeCloseTo(
                        firstActionBox!.x + firstActionBox!.width,
                    );
                }
                expect(footerBox!.y).toBeGreaterThanOrEqual(actionBox!.y + actionBox!.height);

                await page.getByRole('button', {name: 'Something More'}).focus();
                await page.keyboard.press('Tab');
                await expect(page.getByRole('button', {name: 'Dismiss'})).toBeFocused();
                await page.keyboard.press('Enter');
                await expect(toast).not.toBeVisible();
            });
        }
    }

    for (const {padding, top, bottom, left} of [
        {padding: '16px', top: 16, bottom: 16, left: 16},
        {padding: '8px 24px', top: 8, bottom: 8, left: 24},
        {padding: '4px 12px 20px 28px', top: 4, bottom: 20, left: 28},
    ]) {
        test(`preserves body padding ${padding} with an empty footer`, async ({mount, page}) => {
            await mount(
                <ToastWithEmptyFooter padding={padding} title="Do some actions" />,
                wrapperOptions,
            );

            const heading = page.getByRole('heading', {name: simpleToastProps.title});
            await expect(heading).toBeVisible();
            const headingBox = await heading.boundingBox();
            const toastBox = await page.locator('[data-toast]').boundingBox();

            expect(headingBox!.x - toastBox!.x).toBeCloseTo(left);
            expect(headingBox!.y - toastBox!.y).toBeCloseTo(top);
            expect(toastBox!.y + toastBox!.height - headingBox!.y - headingBox!.height).toBeCloseTo(
                bottom,
            );
        });
    }
});
