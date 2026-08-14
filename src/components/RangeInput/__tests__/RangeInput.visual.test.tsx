import {expect} from '@playwright/experimental-ct-react';

import {test} from '~playwright/core';

import {Slider} from '../../Slider';
import {ThemeProvider} from '../../theme';
import {RangeInput} from '../RangeInput';
import type {RangeInputSize} from '../RangeInput';

const geometryCases: Array<{
    size: RangeInputSize;
    rootHeight: number;
    inputHeight: number;
    railCenter: number;
    handleTop: number;
    handleSize: number;
    trackSize: number;
    markTop: number;
    markBottom: number;
    trackStartInset: number;
}> = [
    {
        size: 's',
        rootHeight: 44,
        inputHeight: 24,
        railCenter: 23.5,
        handleTop: 19,
        handleSize: 9,
        trackSize: 2,
        markTop: 28,
        markBottom: 44,
        trackStartInset: 3.5,
    },
    {
        size: 'm',
        rootHeight: 48,
        inputHeight: 28,
        railCenter: 27,
        handleTop: 21.5,
        handleSize: 11,
        trackSize: 3,
        markTop: 32,
        markBottom: 48,
        trackStartInset: 4,
    },
    {
        size: 'l',
        rootHeight: 56,
        inputHeight: 36,
        railCenter: 35,
        handleTop: 29,
        handleSize: 12,
        trackSize: 4,
        markTop: 40,
        markBottom: 56,
        trackStartInset: 6,
    },
    {
        size: 'xl',
        rootHeight: 70,
        inputHeight: 44,
        railCenter: 43,
        handleTop: 37,
        handleSize: 12,
        trackSize: 4,
        markTop: 50,
        markBottom: 70,
        trackStartInset: 7,
    },
];

const focusCases: Array<{name: string; validationState?: 'invalid'}> = [
    {name: 'default'},
    {name: 'invalid', validationState: 'invalid'},
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
                            marks={[0, 25, 50, 75, 100]}
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
            const track = root.locator('.g-base-slider__track');
            const intermediateDot = root.locator('.rc-slider-dot').nth(1);
            const handle = root.locator('.g-base-slider__handle');
            const firstMark = root.locator('.rc-slider-mark-text').first();
            const lastMark = root.locator('.rc-slider-mark-text').last();

            const [
                rootBox,
                inputBox,
                railBox,
                trackBox,
                trackPaintSize,
                intermediateDotBox,
                handleBox,
                firstMarkBox,
                lastMarkBox,
            ] = await Promise.all([
                root.boundingBox(),
                input.boundingBox(),
                rail.boundingBox(),
                track.boundingBox(),
                track.evaluate((element) =>
                    Number.parseFloat(getComputedStyle(element, '::before').height),
                ),
                intermediateDot.boundingBox(),
                handle.boundingBox(),
                firstMark.boundingBox(),
                lastMark.boundingBox(),
            ]);

            if (
                !rootBox ||
                !inputBox ||
                !railBox ||
                !trackBox ||
                !intermediateDotBox ||
                !handleBox ||
                !firstMarkBox ||
                !lastMarkBox
            ) {
                throw new Error(`Failed to measure RangeInput size ${expected.size}`);
            }

            expect(rootBox.height).toBe(expected.rootHeight);
            expect(inputBox.height).toBe(expected.inputHeight);
            expect(railBox.y + railBox.height / 2 - rootBox.y).toBe(expected.railCenter);
            expect(railBox.height).toBe(expected.trackSize);
            expect(trackBox.height).toBe(expected.trackSize);
            expect(trackPaintSize).toBe(expected.trackSize);
            expect(intermediateDotBox.y + intermediateDotBox.height / 2 - rootBox.y).toBe(
                expected.railCenter,
            );
            expect(handleBox.y - rootBox.y).toBe(expected.handleTop);
            expect(handleBox.width).toBe(expected.handleSize);
            expect(handleBox.height).toBe(expected.handleSize);

            for (const markBox of [firstMarkBox, lastMarkBox]) {
                expect(markBox.y - rootBox.y).toBe(expected.markTop);
                expect(markBox.y + markBox.height - rootBox.y).toBe(expected.markBottom);
            }
        }
    });

    test('keeps the colored track inside the rounded input corners', async ({mount}) => {
        const directions = ['ltr', 'rtl'] as const;
        const component = await mount(
            <div>
                {directions.map((direction) => (
                    <ThemeProvider key={direction} direction={direction} scoped>
                        {geometryCases.map(({size}) => (
                            <div key={size} style={{width: 340}}>
                                <RangeInput
                                    qa={`range-input-track-${direction}-${size}`}
                                    size={size}
                                    value={7}
                                    marks={[0, 100]}
                                    aria-label={`${direction} ${size} range input`}
                                />
                            </div>
                        ))}
                    </ThemeProvider>
                ))}
            </div>,
        );

        await Promise.all(
            directions.flatMap((direction) =>
                geometryCases.map(async (expected) => {
                    const root = component.getByTestId(
                        `range-input-track-${direction}-${expected.size}`,
                    );
                    const input = root.locator('.g-text-input__content');
                    const track = root.locator('.g-base-slider__track');
                    const [inputBox, trackPaint] = await Promise.all([
                        input.boundingBox(),
                        track.evaluate((element, currentDirection) => {
                            const trackBox = element.getBoundingClientRect();
                            const trackElementStyles = getComputedStyle(element);
                            const trackStyles = getComputedStyle(element, '::before');
                            const isTransparentBackground = (color: string) =>
                                color === 'transparent' || color === 'rgba(0, 0, 0, 0)';
                            const edgeOffset = Number.parseFloat(trackStyles.insetInlineStart);
                            const pseudoEdge =
                                currentDirection === 'ltr'
                                    ? trackBox.left + edgeOffset
                                    : trackBox.right - edgeOffset;
                            const hasVisibleTrackBackground = !isTransparentBackground(
                                trackElementStyles.backgroundColor,
                            );

                            let edge = pseudoEdge;
                            if (hasVisibleTrackBackground) {
                                edge =
                                    currentDirection === 'ltr'
                                        ? Math.min(trackBox.left, pseudoEdge)
                                        : Math.max(trackBox.right, pseudoEdge);
                            }
                            const hasVisiblePseudoBackground = !isTransparentBackground(
                                trackStyles.backgroundColor,
                            );

                            return {
                                edge,
                                isPainted:
                                    hasVisiblePseudoBackground &&
                                    trackStyles.content !== 'none' &&
                                    trackStyles.display !== 'none' &&
                                    trackStyles.visibility === 'visible' &&
                                    Number.parseFloat(trackStyles.opacity) > 0 &&
                                    Number.parseFloat(trackStyles.height) > 0,
                            };
                        }, direction),
                    ]);

                    if (!inputBox) {
                        throw new Error(
                            `Failed to measure ${direction} RangeInput size ${expected.size}`,
                        );
                    }
                    const trackInset =
                        direction === 'ltr'
                            ? trackPaint.edge - inputBox.x
                            : inputBox.x + inputBox.width - trackPaint.edge;

                    expect(trackPaint.isPainted).toBe(true);
                    expect(trackInset).toBe(expected.trackStartInset);
                }),
            ),
        );
    });

    for (const {name, validationState} of focusCases) {
        test(`uses the Slider ${name} handle shadow on keyboard focus`, async ({mount, page}) => {
            const component = await mount(
                <div style={{display: 'grid', gap: 32, width: 340}}>
                    <RangeInput
                        defaultValue={50}
                        validationState={validationState}
                        aria-label={`RangeInput ${name}`}
                    />
                    <Slider
                        value={50}
                        validationState={validationState}
                        aria-label={`Slider ${name}`}
                    />
                </div>,
            );
            const input = component.getByRole('spinbutton', {name: `RangeInput ${name}`});
            const rangeInputHandle = component.getByRole('slider', {
                name: `RangeInput ${name}`,
            });
            const sliderHandle = component.getByRole('slider', {name: `Slider ${name}`});

            await input.focus();
            await page.keyboard.press('Tab');
            await expect(rangeInputHandle).toBeFocused();

            const rangeInputShadow = await rangeInputHandle.evaluate(
                (element) => getComputedStyle(element).boxShadow,
            );
            await sliderHandle.focus();
            const sliderShadow = await sliderHandle.evaluate(
                (element) => getComputedStyle(element).boxShadow,
            );

            expect(rangeInputShadow).toBe(sliderShadow);
            expect(rangeInputShadow).toMatch(/0px 0px 0px 3px$/);
            expect(rangeInputShadow).not.toContain('rgba(0, 0, 0, 0)');
        });
    }
});
