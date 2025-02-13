import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {SegmentedRadioGroupProps} from '../SegmentedRadioGroup';
import {SegmentedRadioGroup} from '../SegmentedRadioGroup';
import type {SegmentedRadioGroupOptionProps} from '../SegmentedRadioGroupOption';

import {sizeCases, widthCases} from './cases';

test.describe('SegmentedRadioGroup', {tag: '@SegmentedRadioGroup'}, () => {
    const options: SegmentedRadioGroupOptionProps[] = [
        {value: 'Value 1', content: 'Value 1'},
        {value: 'Value 2', content: 'Value 2'},
        {value: 'Value 3', content: 'Value 3', disabled: true},
    ];

    const defaultProps: SegmentedRadioGroupProps = {
        value: 'Value 1',
        options,
    };

    smokeTest('', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios(defaultProps, {
            size: sizeCases,
            width: widthCases,
        });

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <SegmentedRadioGroup {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({});
    });

    smokeTest('disabled', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios(
            {
                ...defaultProps,
                disabled: true,
            },
            {},
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <SegmentedRadioGroup {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({});
    });
});
