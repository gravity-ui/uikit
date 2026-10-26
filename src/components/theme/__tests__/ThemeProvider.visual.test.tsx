import {expect} from '@playwright/experimental-ct-react';

import {test} from '~playwright/core';

import {Portal} from '../../Portal';
import {Provider} from '../Provider';
import {ThemeProvider} from '../ThemeProvider';

for (const kind of ['ThemeProvider', 'Provider']) {
    test(`${kind} scopes and portals preserve local colors and direction`, async ({
        mount,
        page,
    }) => {
        const content = (
            <div>
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
            </div>
        );
        await mount(
            <div>
                <span data-qa="outer">outer</span>
                {kind === 'Provider' ? (
                    <Provider theme="dark" direction="rtl" scoped={false}>
                        {content}
                    </Provider>
                ) : (
                    <ThemeProvider theme="dark" direction="rtl" scoped={false}>
                        {content}
                    </ThemeProvider>
                )}
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
}

test('scoped Provider preserves MobileProvider body-class behavior', async ({mount, page}) => {
    const content = (
        <div>
            <span data-qa="mobile-region">mobile</span>
            <Portal>
                <span data-qa="mobile-portal">portal</span>
            </Portal>
        </div>
    );
    const component = await mount(<Provider mobile={false}>{content}</Provider>);
    await expect(page.locator('body')).not.toHaveClass(/g-root_mobile/);
    await component.update(<Provider mobile>{content}</Provider>);
    await expect(page.locator('body')).toHaveClass(/g-root_mobile/);
    await expect(page.getByTestId('mobile-region').locator('..').locator('..')).not.toHaveClass(
        /g-root_mobile/,
    );
    await expect(page.getByTestId('mobile-portal').locator('..')).not.toHaveClass(/g-root_mobile/);
    await component.update(<Provider mobile={false}>{content}</Provider>);
    await expect(page.locator('body')).not.toHaveClass(/g-root_mobile/);
});
