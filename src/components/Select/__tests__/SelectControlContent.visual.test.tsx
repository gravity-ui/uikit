import {expect} from '@playwright/experimental-ct-react';

import {test} from '~playwright/core';

import {EmptySelect, TallSelectedOption} from './controlHelpersPlaywright';

// The clipping of the selected option and the height of the wrapper are a matter of layout,
// so they are tested in the browser: no screenshots, the test reads where the boxes are.

const CONTROL_HEIGHT = {s: 24, m: 28, l: 36, xl: 44} as const;

test.describe('Select control content', {tag: '@Select'}, () => {
    for (const size of ['s', 'm', 'l', 'xl'] as const) {
        test(`a selected option taller than the inner area is not clipped, size ${size}`, async ({
            mount,
            page,
        }) => {
            await mount(<TallSelectedOption size={size} />);

            const boxes = await page.getByRole('group').evaluate((control) => {
                const rect = (element: Element) => {
                    const box = element.getBoundingClientRect();
                    return {top: box.top, bottom: box.bottom, height: box.height};
                };
                const root = control.parentElement;
                const label = control.querySelector('[data-qa="tall-selected-option"]');
                if (!root || !label) {
                    throw new Error('The select is not rendered');
                }
                // Every ancestor up to the control that clips its content: the visible area
                // of the label is the intersection of their boxes
                const clips: ReturnType<typeof rect>[] = [];
                for (
                    let element = label.parentElement;
                    element && element !== control;
                    element = element.parentElement
                ) {
                    if (getComputedStyle(element).overflow !== 'visible') {
                        clips.push(rect(element));
                    }
                }
                return {root: rect(root), control: rect(control), label: rect(label), clips};
            });

            expect(boxes.control.height).toBe(CONTROL_HEIGHT[size]);
            expect(boxes.root.height).toBe(CONTROL_HEIGHT[size]);
            expect(boxes.clips.length).toBeGreaterThan(0);
            for (const clip of boxes.clips) {
                expect(boxes.label.top).toBeGreaterThanOrEqual(clip.top - 0.5);
                expect(boxes.label.bottom).toBeLessThanOrEqual(clip.bottom + 0.5);
            }
        });

        test(`an empty control does not stretch its wrapper, size ${size}`, async ({
            mount,
            page,
        }) => {
            await mount(<EmptySelect size={size} />);

            const heights = await page.getByRole('group').evaluate((control) => ({
                control: control.getBoundingClientRect().height,
                root: control.parentElement?.getBoundingClientRect().height,
            }));

            expect(heights.control).toBe(CONTROL_HEIGHT[size]);
            // Chromium makes the wrapper of an empty control 1px taller in s
            expect(heights.root).toBeLessThanOrEqual(CONTROL_HEIGHT[size] + 1);
        });
    }
});
