import {expect} from '@playwright/experimental-ct-react';

import {test} from '~playwright/core';

import {Portal} from '../../Portal';
import {ThemeProvider} from '../ThemeProvider';

test('scoped themes and portals preserve local colors and direction', async ({mount, page}) => {
    await mount(
        <div>
            <span data-qa="outer">outer</span>
            <ThemeProvider theme="dark" direction="rtl" scoped={false}>
                <span data-qa="scoped">scoped</span>
                <Portal>
                    <span data-qa="portal">portal</span>
                </Portal>
                <Portal disablePortal>
                    <span data-qa="inline">inline</span>
                </Portal>
                <ThemeProvider theme="light" direction="ltr">
                    <Portal>
                        <span data-qa="nested">nested</span>
                    </Portal>
                </ThemeProvider>
            </ThemeProvider>
        </div>,
    );

    const background = (qa: string) =>
        page
            .getByTestId(qa)
            .evaluate((element) =>
                getComputedStyle(element).getPropertyValue('--g-color-base-background'),
            );
    const outer = await background('outer');
    const scoped = await background('scoped');
    expect(scoped).not.toBe(outer);
    expect(await background('portal')).toBe(scoped);
    expect(await background('inline')).toBe(scoped);
    expect(await background('nested')).toBe(outer);
    await expect(page.getByTestId('portal')).toHaveCSS('direction', 'rtl');
    await expect(page.getByTestId('inline')).toHaveCSS('direction', 'rtl');
    await expect(page.getByTestId('nested')).toHaveCSS('direction', 'ltr');
});
