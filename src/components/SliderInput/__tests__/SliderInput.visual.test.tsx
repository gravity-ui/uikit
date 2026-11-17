import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';
import {test as componentTest, expect} from '@playwright/experimental-ct-react';

import {test} from '~playwright/core';

import {Slider} from '../../Slider';
import {ThemeProvider} from '../../theme';
import {SliderInput} from '../SliderInput';
import type {SliderInputProps, SliderInputSize} from '../SliderInput';

// CT imports browser fixtures separately from Node-side case data.
import * as cases from './cases';
import {ControlledSliderInputWithSynchronousBlur, SliderInputWithEmptyMarks} from './cases';

const geometryCases: Array<{
    size: SliderInputSize;
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

test.describe('SliderInput', {tag: '@SliderInput'}, () => {
    test('smoke', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const {
            disabledCases,
            labelCases,
            marksCases,
            noteCases,
            sizeCases,
            stepCases,
            validationStateCases,
        } = cases;
        const defaultProps: SliderInputProps = {
            value: 40,
            min: 0,
            max: 100,
            onUpdate: () => {},
            'aria-label': 'Slider input',
        };

        const smokeScenarios = createSmokeScenarios(defaultProps, {
            size: sizeCases,
            disabled: disabledCases,
            validationState: validationStateCases,
            marks: marksCases,
            step: stepCases,
            label: labelCases,
            note: noteCases,
        });

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div style={{width: 300, paddingBottom: 20}}>
                            <SliderInput {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    test('smoke with error', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const {marksCases, sizeCases} = cases;
        const smokeScenarios = createSmokeScenarios<SliderInputProps>(
            {
                value: 40,
                min: 0,
                max: 100,
                onUpdate: () => {},
                'aria-label': 'Slider input',
                validationState: 'invalid',
                errorMessage: 'Error message',
            },
            {
                size: sizeCases,
                marks: marksCases,
            },
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div style={{width: 300, paddingBottom: 20}}>
                            <SliderInput {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    for (const state of ['disabled', 'invalid'] as const) {
        test(`renders the ${state} slider like a standalone Slider`, async ({mount, page}) => {
            const stateProps =
                state === 'disabled'
                    ? ({disabled: true} as const)
                    : ({validationState: 'invalid'} as const);
            const component = await mount(
                <div style={{display: 'grid', gap: 32, width: 340}}>
                    <div data-qa="slider-input">
                        <SliderInput
                            {...stateProps}
                            defaultValue={50}
                            marks={[0, 50, 100]}
                            aria-label={`SliderInput ${state}`}
                        />
                    </div>
                    <div data-qa="slider">
                        <Slider
                            {...stateProps}
                            value={50}
                            marks={[0, 50, 100]}
                            aria-label={`Slider ${state}`}
                        />
                    </div>
                </div>,
            );

            const readSliderStyles = (rootQa: string) => {
                const root = component.getByTestId(rootQa);
                return Promise.all([
                    root
                        .locator('.g-base-slider__rail')
                        .evaluate((element) => getComputedStyle(element).backgroundColor),
                    root
                        .locator('.g-base-slider__track')
                        .evaluate((element) => getComputedStyle(element).visibility),
                    root
                        .locator('.rc-slider-dot')
                        .nth(1)
                        .evaluate((element) => getComputedStyle(element).display),
                ]);
            };

            const [sliderInputStyles, sliderStyles] = await Promise.all([
                readSliderStyles('slider-input'),
                readSliderStyles('slider'),
            ]);

            expect(sliderInputStyles).toEqual(sliderStyles);

            const handleBackground = await component
                .getByTestId('slider-input')
                .locator('.g-base-slider__handle')
                .evaluate((element) => getComputedStyle(element).backgroundColor);
            expect(handleBackground).not.toBe('rgba(0, 0, 0, 0)');
            if (state === 'disabled') {
                const handle = component
                    .getByTestId('slider-input')
                    .locator('.g-base-slider__handle');
                await handle.hover();
                await page.mouse.down();
                expect(
                    await handle.evaluate((element) => getComputedStyle(element).boxShadow),
                ).toBe('none');
                await page.mouse.up();
            }
        });
    }

    test('matches the Figma geometry in every size', async ({mount}) => {
        const component = await mount(
            <div>
                {geometryCases.map(({size}) => (
                    <div key={size} style={{width: 340}}>
                        <SliderInput
                            qa={`slider-input-${size}`}
                            size={size}
                            value={50}
                            marks={[0, 25, 50, 75, 100]}
                            aria-label={`${size} slider input`}
                        />
                    </div>
                ))}
            </div>,
        );

        for (const expected of geometryCases) {
            const root = component.getByTestId(`slider-input-${expected.size}`);
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
                throw new Error(`Failed to measure SliderInput size ${expected.size}`);
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
                                <SliderInput
                                    qa={`slider-input-track-${direction}-${size}`}
                                    size={size}
                                    value={7}
                                    marks={[0, 100]}
                                    aria-label={`${direction} ${size} slider input`}
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
                        `slider-input-track-${direction}-${expected.size}`,
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
                            `Failed to measure ${direction} SliderInput size ${expected.size}`,
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

    test('keeps every rail state inside the input corners in LTR and RTL', async ({mount}) => {
        const directions = ['ltr', 'rtl'] as const;
        const states = ['normal', 'invalid', 'disabled'] as const;
        const component = await mount(
            <div>
                {states.map((state) => (
                    <div key={state}>
                        {directions.map((direction) => (
                            <ThemeProvider key={direction} direction={direction} scoped>
                                {geometryCases.map(({size}) => (
                                    <div key={size} style={{width: 340}}>
                                        <SliderInput
                                            qa={`rail-${state}-${direction}-${size}`}
                                            size={size}
                                            defaultValue={50}
                                            disabled={state === 'disabled'}
                                            validationState={
                                                state === 'invalid' ? 'invalid' : undefined
                                            }
                                            aria-label={`${state} ${direction} ${size}`}
                                        />
                                    </div>
                                ))}
                            </ThemeProvider>
                        ))}
                    </div>
                ))}
            </div>,
        );

        for (const state of states) {
            for (const direction of directions) {
                for (const expected of geometryCases) {
                    const root = component.getByTestId(
                        `rail-${state}-${direction}-${expected.size}`,
                    );
                    const [inputBox, railBox] = await Promise.all([
                        root.locator('.g-text-input__content').boundingBox(),
                        root.locator('.g-base-slider__rail').boundingBox(),
                    ]);
                    if (!inputBox || !railBox) {
                        throw new Error(`Failed to measure ${state} ${direction} ${expected.size}`);
                    }

                    expect(railBox.x - inputBox.x).toBe(expected.trackStartInset);
                    expect(inputBox.x + inputBox.width - railBox.x - railBox.width).toBe(
                        expected.trackStartInset,
                    );
                    expect(railBox.height).toBe(expected.trackSize);
                    expect(railBox.y + railBox.height / 2 - inputBox.y).toBe(expected.railCenter);
                }
            }
        }
    });

    test('keeps a fixed domain handle at the input edge in every size and direction', async ({
        mount,
    }) => {
        const directions = ['ltr', 'rtl'] as const;
        const component = await mount(
            <form>
                {directions.map((direction) => (
                    <ThemeProvider key={direction} direction={direction} scoped>
                        {geometryCases.map(({size}) => (
                            <div key={size} style={{width: 340}}>
                                <SliderInput
                                    qa={`fixed-${direction}-${size}`}
                                    name={`fixed-${direction}-${size}`}
                                    size={size}
                                    min={42}
                                    max={42}
                                    aria-label={`${direction} ${size} fixed value`}
                                />
                            </div>
                        ))}
                    </ThemeProvider>
                ))}
            </form>,
        );

        for (const direction of directions) {
            for (const expected of geometryCases) {
                const root = component.getByTestId(`fixed-${direction}-${expected.size}`);
                const handle = root.getByRole('slider');
                const [inputBox, handleBox] = await Promise.all([
                    root.locator('.g-text-input__content').boundingBox(),
                    handle.boundingBox(),
                ]);
                if (!inputBox || !handleBox) {
                    throw new Error(`Failed to measure fixed ${direction} ${expected.size}`);
                }

                const edgeOffset =
                    direction === 'ltr'
                        ? handleBox.x - inputBox.x
                        : inputBox.x + inputBox.width - handleBox.x - handleBox.width;
                expect(edgeOffset).toBe(0);
                expect(handleBox.y - inputBox.y).toBe(expected.handleTop);
                expect(handleBox.width).toBe(expected.handleSize);
                expect(handleBox.height).toBe(expected.handleSize);
                await expect(handle).toHaveAttribute('aria-disabled', 'true');
                await expect(handle).toHaveAttribute('aria-valuenow', '42');
                await expect(root.getByRole('spinbutton')).toBeEnabled();
            }
        }

        const formData = await component
            .locator('form')
            .evaluate((element) => Array.from(new FormData(element as HTMLFormElement).entries()));
        expect(formData).toEqual(
            directions.flatMap((direction) =>
                geometryCases.map(({size}) => [`fixed-${direction}-${size}`, '42']),
            ),
        );
    });

    test('submits one canonical value on Enter and restores it on native reset', async ({
        mount,
    }) => {
        const component = await mount(
            <form>
                <SliderInput name="amount" defaultValue={35} step={5} aria-label="Amount" />
                <button type="submit">Submit</button>
            </form>,
        );
        const form = component.locator('form');
        const input = component.getByRole('spinbutton');
        await form.evaluate((element) => {
            const nativeForm = element as HTMLFormElement;
            nativeForm.addEventListener('submit', (event) => {
                event.preventDefault();
                nativeForm.dataset.submitted = JSON.stringify(
                    Array.from(new FormData(nativeForm).entries()),
                );
            });
        });

        await input.fill('49');
        await input.press('Enter');
        await expect(input).toHaveValue('50');
        await expect(form).toHaveAttribute('data-submitted', JSON.stringify([['amount', '50']]));

        await input.fill('-');
        await form.evaluate((element) => (element as HTMLFormElement).reset());
        await expect(input).toHaveValue('35');
        await expect(component.getByRole('slider')).toHaveAttribute('aria-valuenow', '35');
        expect(
            await form.evaluate((element) =>
                Array.from(new FormData(element as HTMLFormElement).entries()),
            ),
        ).toEqual([['amount', '35']]);
    });

    // The base mount keeps the same component tree when updating the form prop.
    componentTest('rebinds native reset when the form owner changes', async ({mount}) => {
        const renderForms = (owner: string) => (
            <div>
                <form id="first-form" />
                <form id="second-form" />
                <SliderInput
                    name="amount"
                    form={owner}
                    defaultValue={35}
                    step={5}
                    aria-label="Amount"
                />
            </div>
        );
        const component = await mount(renderForms('first-form'));
        const input = component.getByRole('spinbutton');
        await input.fill('60');
        await component.update(renderForms('second-form'));
        await expect(input).toHaveValue('60');
        expect(
            await component
                .locator('#first-form')
                .evaluate((element) =>
                    Array.from(new FormData(element as HTMLFormElement).entries()),
                ),
        ).toEqual([]);
        const secondForm = component.locator('#second-form');
        await secondForm.evaluate((element) => {
            const nativeForm = element as HTMLFormElement;
            nativeForm.addEventListener('submit', (event) => {
                event.preventDefault();
                nativeForm.dataset.submitted = JSON.stringify(
                    Array.from(new FormData(nativeForm).entries()),
                );
            });
        });
        await input.fill('69');
        await input.press('Enter');
        await expect(secondForm).toHaveAttribute(
            'data-submitted',
            JSON.stringify([['amount', '70']]),
        );

        await component
            .locator('#first-form')
            .evaluate((element) => (element as HTMLFormElement).reset());
        await expect(input).toHaveValue('70');
        await component
            .locator('#second-form')
            .evaluate((element) => (element as HTMLFormElement).reset());
        await expect(input).toHaveValue('35');
        await expect(component.getByRole('slider')).toHaveAttribute('aria-valuenow', '35');
    });

    test('keeps marks selectable when their formatter returns an empty string', async ({mount}) => {
        const component = await mount(
            <SliderInputWithEmptyMarks
                min={0}
                max={100}
                marks={[20, 60]}
                step={null}
                defaultValue={20}
                aria-label="Amount"
            />,
        );
        const input = component.getByRole('spinbutton');
        const handle = component.getByRole('slider');
        await expect(input).toHaveValue('20');
        await expect(handle).toHaveAttribute('aria-valuenow', '20');
        await expect(component.locator('.rc-slider-mark-text')).toHaveCount(2);

        await handle.press('ArrowRight');
        await expect(input).toHaveValue('60');
        await expect(handle).toHaveAttribute('aria-valuenow', '60');
        await handle.press('ArrowLeft');
        await expect(input).toHaveValue('20');
        await input.fill('59');
        await input.press('Enter');
        await expect(input).toHaveValue('60');
        await expect(handle).toHaveAttribute('aria-valuenow', '60');
    });

    test('completes a rail drag once after starting with a focused handle', async ({
        mount,
        page,
    }) => {
        const updates: number[] = [];
        const completions: number[] = [];
        const component = await mount(
            <div style={{width: 340}}>
                <SliderInput
                    defaultValue={50}
                    onUpdate={(value) => updates.push(value)}
                    onUpdateComplete={(value) => completions.push(value)}
                    aria-label="Amount"
                />
            </div>,
        );
        await component.getByRole('slider').focus();
        const rail = await component.locator('.g-base-slider__rail').boundingBox();
        if (!rail) {
            throw new Error('Failed to measure the rail');
        }

        await page.mouse.move(rail.x + rail.width / 4, rail.y + rail.height / 2);
        await page.mouse.down();
        await expect.poll(() => updates.length).toBeGreaterThan(0);
        expect(completions).toEqual([]);
        await page.mouse.move(rail.x + rail.width * 0.8, rail.y + rail.height / 2);
        await page.mouse.up();

        await expect.poll(() => completions.length).toBe(1);
        await expect(component.getByRole('spinbutton')).toHaveValue(String(completions[0]));
        await expect(component.getByRole('slider')).toHaveAttribute(
            'aria-valuenow',
            String(completions[0]),
        );
        expect(completions[0]).toBe(updates.at(-1));
    });

    test('completes the controlled value when onKeyDown synchronously blurs the input', async ({
        mount,
    }) => {
        const updates: number[] = [];
        const completions: number[] = [];
        const component = await mount(
            <ControlledSliderInputWithSynchronousBlur
                defaultValue={35}
                onUpdate={(value) => updates.push(value)}
                onUpdateComplete={(value) => completions.push(value)}
                aria-label="Amount"
            />,
        );
        const input = component.getByRole('spinbutton');
        await input.press('ArrowUp');
        await expect(input).not.toBeFocused();
        await expect(input).toHaveValue('36');
        await expect(component.getByRole('slider')).toHaveAttribute('aria-valuenow', '36');
        await expect.poll(() => updates).toEqual([36]);
        await expect.poll(() => completions).toEqual([36]);
    });

    test('keeps the danger border and focus outline in the invalid state', async ({mount}) => {
        const component = await mount(
            <div style={{width: 340}}>
                <SliderInput
                    defaultValue={50}
                    validationState="invalid"
                    aria-label="Invalid slider input"
                />
            </div>,
        );
        const input = component.getByRole('spinbutton');
        const content = component.locator('.g-text-input__content');

        const readContentStyles = () =>
            content.evaluate((element) => {
                const styles = getComputedStyle(element);
                return {
                    borderColor: styles.borderColor,
                    outline: `${styles.outlineStyle} ${styles.outlineWidth}`,
                };
            });

        const resting = await readContentStyles();
        await content.hover();
        const hovered = await readContentStyles();
        await input.focus();
        const focused = await readContentStyles();

        expect(hovered.borderColor).toBe(resting.borderColor);
        expect(focused.borderColor).toBe(resting.borderColor);
        expect(focused.outline).toBe('solid 2px');
    });

    for (const {name, validationState} of focusCases) {
        test(`uses the Slider ${name} handle shadow on keyboard focus`, async ({mount, page}) => {
            const component = await mount(
                <div style={{display: 'grid', gap: 32, width: 340}}>
                    <SliderInput
                        defaultValue={50}
                        validationState={validationState}
                        aria-label={`SliderInput ${name}`}
                    />
                    <Slider
                        value={50}
                        validationState={validationState}
                        aria-label={`Slider ${name}`}
                    />
                </div>,
            );
            const input = component.getByRole('spinbutton', {name: `SliderInput ${name}`});
            const sliderInputHandle = component.getByRole('slider', {
                name: `SliderInput ${name}`,
            });
            const sliderHandle = component.getByRole('slider', {name: `Slider ${name}`});

            await input.focus();
            await page.keyboard.press('Tab');
            await expect(sliderInputHandle).toBeFocused();

            const sliderInputShadow = await sliderInputHandle.evaluate(
                (element) => getComputedStyle(element).boxShadow,
            );
            await sliderHandle.focus();
            const sliderShadow = await sliderHandle.evaluate(
                (element) => getComputedStyle(element).boxShadow,
            );

            expect(sliderInputShadow).toBe(sliderShadow);
            expect(sliderInputShadow).toMatch(/0px 0px 0px 3px$/);
            expect(sliderInputShadow).not.toContain('rgba(0, 0, 0, 0)');

            await sliderInputHandle.hover();
            await page.mouse.down();
            const sliderInputActiveShadow = await sliderInputHandle.evaluate(
                (element) => getComputedStyle(element).boxShadow,
            );
            await page.mouse.up();
            await sliderHandle.hover();
            await page.mouse.down();
            const sliderActiveShadow = await sliderHandle.evaluate(
                (element) => getComputedStyle(element).boxShadow,
            );
            await page.mouse.up();

            expect(sliderInputActiveShadow).toBe(sliderActiveShadow);
            expect(sliderInputActiveShadow).toMatch(/0px 0px 0px 4px$/);
            expect(sliderInputActiveShadow).not.toContain('rgba(0, 0, 0, 0)');
        });
    }
});
