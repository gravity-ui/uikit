import {expect} from '@playwright/experimental-ct-react';
import type {Page} from '@playwright/test';

import {test} from '~playwright/core';

import {EntryTestList} from './entryHelpersPlaywright';

// Where Tab enters a virtualized list depends on the rows it keeps mounted, so it is tested in the
// browser: no screenshots, the tests read the focus and the active row.

const readState = (page: Page) =>
    page.getByRole('listbox').evaluate((root) => {
        const focused = document.activeElement;
        const rootRect = root.getBoundingClientRect();
        const rect = focused?.getBoundingClientRect();
        return {
            focused:
                focused && root.contains(focused) && focused.getAttribute('role') === 'option'
                    ? focused.textContent
                    : null,
            active: root.querySelector('[data-active]')?.textContent ?? null,
            inRoot: Boolean(
                rect && rect.top >= rootRect.top - 1 && rect.bottom <= rootRect.bottom + 1,
            ),
        };
    });

async function expectEnteredAt(page: Page, id: string) {
    await expect.poll(() => readState(page)).toEqual({focused: id, active: id, inRoot: true});
}

async function tabIn(page: Page) {
    await page.getByRole('button', {name: 'Before'}).focus();
    await page.keyboard.press('Tab');
}

async function shiftTabIn(page: Page) {
    await page.getByRole('button', {name: 'After'}).focus();
    await page.keyboard.press('Shift+Tab');
}

test.describe('List: Tab enters at the selection', {tag: '@List'}, () => {
    test('single: at the selected row, and the arrows go on from it', async ({mount, page}) => {
        await mount(<EntryTestList selectionMode="single" selectedIds={['Item 40']} />);

        await tabIn(page);
        await expectEnteredAt(page, 'Item 40');

        await page.keyboard.press('ArrowDown');
        await expectEnteredAt(page, 'Item 41');
    });

    test('multiple: Tab at the first selected row', async ({mount, page}) => {
        await mount(
            <EntryTestList
                selectionMode="multiple"
                selectedIds={['Item 70', 'Item 10', 'Item 40']}
            />,
        );

        await tabIn(page);

        await expectEnteredAt(page, 'Item 10');
    });

    test('multiple: Shift+Tab at the last selected row', async ({mount, page}) => {
        await mount(
            <EntryTestList
                selectionMode="multiple"
                selectedIds={['Item 70', 'Item 10', 'Item 40']}
            />,
        );

        await shiftTabIn(page);

        await expectEnteredAt(page, 'Item 70');
    });

    test('nothing selected: Tab at the first row; an active row is entered as is', async ({
        mount,
        page,
    }) => {
        await mount(<EntryTestList selectionMode="multiple" />);

        await tabIn(page);
        await expectEnteredAt(page, 'Item 1');

        await page.keyboard.press('Tab');
        await page.keyboard.press('Shift+Tab');
        // The list has an active row now: it is entered there
        await expectEnteredAt(page, 'Item 1');
    });

    test('nothing selected: Shift+Tab at the last row', async ({mount, page}) => {
        await mount(<EntryTestList selectionMode="multiple" />);

        await shiftTabIn(page);

        await expectEnteredAt(page, 'Item 100');
    });

    test('virtualized: at a selected row far outside the window', async ({mount, page}) => {
        await mount(<EntryTestList selectionMode="single" selectedIds={['Item 90']} virtualized />);

        await tabIn(page);

        await expectEnteredAt(page, 'Item 90');
    });

    test('virtualized: Shift+Tab at the last selected row', async ({mount, page}) => {
        await mount(
            <EntryTestList
                selectionMode="multiple"
                selectedIds={['Item 10', 'Item 90']}
                virtualized
            />,
        );

        await shiftTabIn(page);

        await expectEnteredAt(page, 'Item 90');
    });

    test('a disabled selected row is skipped', async ({mount, page}) => {
        await mount(
            <EntryTestList
                selectionMode="multiple"
                selectedIds={['Item 30', 'Item 60']}
                disabledIds={['Item 30']}
            />,
        );

        await tabIn(page);

        await expectEnteredAt(page, 'Item 60');
    });

    test('only a disabled row selected: at the first row', async ({mount, page}) => {
        await mount(
            <EntryTestList
                selectionMode="single"
                selectedIds={['Item 30']}
                disabledIds={['Item 1', 'Item 30']}
            />,
        );

        await tabIn(page);

        await expectEnteredAt(page, 'Item 2');
    });

    test('a row focused by the code after another key keeps the focus', async ({mount, page}) => {
        await mount(
            <EntryTestList
                selectionMode="multiple"
                selectedIds={['Item 10', 'Item 40', 'Item 70']}
            />,
        );
        await page.getByRole('button', {name: 'After'}).focus();
        await page.keyboard.press('Escape');

        await page.getByRole('option', {name: 'Item 5', exact: true}).focus();

        await expectEnteredAt(page, 'Item 5');
    });
});
