import {expect} from '@playwright/experimental-ct-react';

import {test} from '~playwright/core';

import {RangeInput} from '../RangeInput';
import type {RangeInputSize} from '../RangeInput';

const geometryCases: Array<{
    size: RangeInputSize;
    rootHeight: number;
    inputHeight: number;
    railCenter: number;
    handleTop: number;
    handleSize: number;
    markTop: number;
    markBottom: number;
}> = [
    {
        size: 's',
        rootHeight: 44,
        inputHeight: 24,
        railCenter: 23.5,
        handleTop: 19,
        handleSize: 9,
        markTop: 28,
        markBottom: 44,
    },
    {
        size: 'm',
        rootHeight: 48,
        inputHeight: 28,
        railCenter: 27,
        handleTop: 21.5,
        handleSize: 11,
        markTop: 32,
        markBottom: 48,
    },
    {
        size: 'l',
        rootHeight: 56,
        inputHeight: 36,
        railCenter: 35,
        handleTop: 29,
        handleSize: 12,
        markTop: 40,
        markBottom: 56,
    },
    {
        size: 'xl',
        rootHeight: 70,
        inputHeight: 44,
        railCenter: 43,
        handleTop: 37,
        handleSize: 12,
        markTop: 50,
        markBottom: 70,
    },
];

test.describe('RangeInput', {tag: '@RangeInput'}, () => {
    test('matches the Figma geometry in every size', async ({mount}) => {
        const component = await mount(
            <div>
                {geometryCases.map(({size}) => (
                    <div key={size} style={{width: 340}}>
                        <RangeInput
                            qa={`range-input-${size}`}
                            size={size}
                            value={50}
                            marks={[0, 100]}
                            aria-label={`${size} range input`}
                        />
                    </div>
                ))}
            </div>,
        );

        for (const expected of geometryCases) {
            const root = component.getByTestId(`range-input-${expected.size}`);
            const input = root.locator('.g-text-input__content');
            const rail = root.locator('.g-base-slider__rail');
            const handle = root.locator('.g-base-slider__handle');
            const firstMark = root.locator('.rc-slider-mark-text').first();
            const lastMark = root.locator('.rc-slider-mark-text').last();

            const [rootBox, inputBox, railBox, handleBox, firstMarkBox, lastMarkBox] =
                await Promise.all([
                    root.boundingBox(),
                    input.boundingBox(),
                    rail.boundingBox(),
                    handle.boundingBox(),
                    firstMark.boundingBox(),
                    lastMark.boundingBox(),
                ]);

            if (!rootBox || !inputBox || !railBox || !handleBox || !firstMarkBox || !lastMarkBox) {
                throw new Error(`Failed to measure RangeInput size ${expected.size}`);
            }

            expect(rootBox.height).toBe(expected.rootHeight);
            expect(inputBox.height).toBe(expected.inputHeight);
            expect(railBox.y + railBox.height / 2 - rootBox.y).toBe(expected.railCenter);
            expect(handleBox.y - rootBox.y).toBe(expected.handleTop);
            expect(handleBox.width).toBe(expected.handleSize);
            expect(handleBox.height).toBe(expected.handleSize);

            for (const markBox of [firstMarkBox, lastMarkBox]) {
                expect(markBox.y - rootBox.y).toBe(expected.markTop);
                expect(markBox.y + markBox.height - rootBox.y).toBe(expected.markBottom);
            }
        }
    });
});
