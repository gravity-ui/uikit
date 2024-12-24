import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {ButtonProps} from '../Button';
import {Button} from '../Button';

import {
    disabledCases,
    loadingCases,
    pinsCases,
    selectedCases,
    sizeCases,
    viewsCases,
} from './cases';
import {ButtonStories, CustomIconSizeButton} from './helpersPlaywright';

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

    const qa = 'test-button';

    smokeTest('', async ({mount, expectScreenshot}) => {
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
        smokeTest(title, async ({mount, expectScreenshot}) => {
            const root = await mount(<Button {...props} />);

            await root.getByTestId(qa).hover();

            await expectScreenshot({
                themes: ['light'],
                nameSuffix: 'hovered',
            });
        });
    });
});
