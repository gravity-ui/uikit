import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {LabelProps} from '../Label';
import {Label} from '../Label';

import {disabledCases, sizeCases, themeCases} from './cases';
import {LabelStories, TestLabelWithIcon} from './helpersPlaywright';

const qa = 'label';

test.describe('Label', {tag: '@Label'}, () => {
    test('render story: <Default>', async ({mount, expectScreenshot}) => {
        await mount(<LabelStories.Default />);

        await expectScreenshot();
    });

    test('render story: <Theme>', async ({mount, expectScreenshot}) => {
        await mount(<LabelStories.Theme />);

        await expectScreenshot();
    });

    test('render story: <Size>', async ({mount, expectScreenshot}) => {
        await mount(<LabelStories.Size />);

        await expectScreenshot();
    });

    test('render story: <Icon>', async ({mount, expectScreenshot}) => {
        await mount(<LabelStories.Icon />);

        await expectScreenshot();
    });

    test('render story: <Interactive>', async ({mount, expectScreenshot}) => {
        await mount(<LabelStories.Interactive />);

        await expectScreenshot();
    });

    test('render story: <LinkWrapper>', async ({mount, expectScreenshot}) => {
        await mount(<LabelStories.LinkWrapper />);

        await expectScreenshot();
    });

    test.skip('render story: <ShowcaseStory>', async ({mount, expectScreenshot}) => {
        await mount(<LabelStories.ShowcaseStory />);

        await expectScreenshot();
    });

    test('render story: <Value>', async ({mount, expectScreenshot}) => {
        await mount(<LabelStories.Value />);

        await expectScreenshot();
    });

    test('render story: <Copy>', async ({mount, expectScreenshot}) => {
        await mount(<LabelStories.Copy />);

        await expectScreenshot();
    });

    test('render story: <Close>', async ({mount, expectScreenshot}) => {
        await mount(<LabelStories.Close />);

        await expectScreenshot();
    });

    test('render story: <Width>', async ({mount, expectScreenshot}) => {
        await mount(<LabelStories.Width />);

        await expectScreenshot();
    });

    const defaultProps: LabelProps = {
        children: 'Label',
        qa,
        type: 'default',
    };

    smokeTest('', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<LabelProps>(defaultProps, {
            theme: themeCases,
            size: sizeCases,
            disabled: disabledCases,
        });

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <Label {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({});
    });

    smokeTest('with custom icon', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<LabelProps>(defaultProps, {
            theme: themeCases,
            size: sizeCases,
            disabled: disabledCases,
        });

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TestLabelWithIcon {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({});
    });

    smokeTest('with copy', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<LabelProps>(
            {
                ...defaultProps,
                type: 'copy',
                copyText: 'Copy text',
                onCopy: () => {},
            },
            {
                theme: themeCases,
                size: sizeCases,
                disabled: disabledCases,
            },
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <Label {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({});
    });

    smokeTest('with close', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<LabelProps>(
            {
                ...defaultProps,
                type: 'close',
                onCloseClick: () => {},
            },
            {
                theme: themeCases,
                size: sizeCases,
                disabled: disabledCases,
            },
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <Label {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({});
    });

    smokeTest('with info', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<LabelProps>(
            {
                ...defaultProps,
                type: 'info',
            },
            {
                theme: themeCases,
                size: sizeCases,
                disabled: disabledCases,
            },
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <Label {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({});
    });

    smokeTest('with gradient loading', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<LabelProps>(
            {...defaultProps, loading: true},
            {
                theme: themeCases,
                size: sizeCases,
                disabled: disabledCases,
            },
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <Label {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({});
    });
});
