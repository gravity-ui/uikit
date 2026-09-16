import * as React from 'react';

import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';

import {expect, test} from '~playwright/core';

import {Button} from '../Button';
import type {ButtonProps} from '../types';

import {
    disabledCases,
    loadingCases,
    pinsCases,
    selectedCases,
    sizeCases,
    viewsCases,
} from './cases';
import {ButtonStories, CustomIconSizeButton, ShrinkIconButton} from './helpersPlaywright';

test.describe('Button', {tag: '@Button'}, () => {
    test('render story: <Default>', async ({mount, expectScreenshot}) => {
        await mount(<ButtonStories.Default />);

        await expectScreenshot();
    });

    test('render story: <Selected>', async ({mount, expectScreenshot}) => {
        await mount(<ButtonStories.Selected />);

        await expectScreenshot();
    });

    test('render story: <Size>', async ({mount, expectScreenshot}) => {
        await mount(<ButtonStories.Size />);

        await expectScreenshot();
    });

    test('render story: <Icon>', async ({mount, expectScreenshot}) => {
        await mount(<ButtonStories.Icon />);

        await expectScreenshot();
    });

    test('render story: <View>', async ({mount, expectScreenshot}) => {
        await mount(<ButtonStories.View />);

        await expectScreenshot();
    });

    test('render story: <Disabled>', async ({mount, expectScreenshot}) => {
        await mount(<ButtonStories.Disabled />);

        await expectScreenshot();
    });

    test('render story: <Link>', async ({mount, expectScreenshot}) => {
        await mount(<ButtonStories.Link />);

        await expectScreenshot();
    });

    test('render story: <Loading>', async ({mount, expectScreenshot}) => {
        await mount(<ButtonStories.Loading />);

        await expectScreenshot();
    });

    test('render story: <Pin>', async ({mount, expectScreenshot}) => {
        await mount(<ButtonStories.Pin />);

        await expectScreenshot();
    });

    test('render story: <Width>', async ({mount, expectScreenshot}) => {
        await mount(<ButtonStories.Width />);

        await expectScreenshot();
    });

    test('render story: <InsideText>', async ({mount, expectScreenshot}) => {
        await mount(<ButtonStories.InsideText />);

        await expectScreenshot();
    });

    test('render custom Icon size', async ({mount, expectScreenshot}) => {
        await mount(<CustomIconSizeButton />);

        await expectScreenshot();
    });

    test('shrink icon button', async ({mount, expectScreenshot}) => {
        await mount(<ShrinkIconButton />, {width: 150});

        await expectScreenshot();
    });

    const qa = 'test-button';

    test('smoke', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<ButtonProps>(
            {
                children: 'Text',
                qa,
            },
            {
                size: sizeCases,
                selected: selectedCases,
                disabled: disabledCases,
                loading: loadingCases,
                view: viewsCases,
                pin: pinsCases,
            },
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <Button {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({});
    });

    createSmokeScenarios<ButtonProps>(
        {
            children: 'Text',
            qa,
        },
        {
            view: viewsCases,
            pin: pinsCases,
        },
    ).forEach(([title, props]) => {
        test(`smoke ${title}`, {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
            const root = await mount(<Button {...props} />);

            await root.getByTestId(qa).hover();

            await expectScreenshot({
                themes: ['light'],
            });
        });
    });

    test.describe('touch interactions', () => {
        test.use({hasTouch: true, isMobile: true});

        const textColor = 'rgb(10, 20, 30)';
        const hoverTextColor = 'rgb(40, 50, 60)';
        const style = {
            '--g-button-text-color': textColor,
            '--g-button-text-color-hover': hoverTextColor,
            transition: 'none',
        } as React.CSSProperties;

        test('does not apply hover colors after a tap', async ({mount, page}) => {
            const component = await mount(<Button style={style}>Action</Button>);
            const button = component.getByRole('button');

            expect(await page.evaluate(() => matchMedia('(hover: none)').matches)).toBe(true);
            await expect(button).toHaveCSS('color', textColor);

            await button.tap();

            await expect(button).toHaveCSS('color', textColor);
        });

        test('keeps expanded menu colors available', async ({mount}) => {
            const component = await mount(
                <Button style={style} aria-haspopup="menu" aria-expanded="true">
                    Menu
                </Button>,
            );

            await expect(component.getByRole('button')).toHaveCSS('color', hoverTextColor);
        });
    });
});
