import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';

import {smokeTest, test} from '~playwright/core';

import type {LoaderProps} from '../Loader';
import {Loader} from '../Loader';

import {sizeCases} from './cases';

test.describe('Loader', {tag: '@Loader'}, () => {
    const defaultProps: LoaderProps = {};

    smokeTest('', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios(defaultProps, {
            size: sizeCases,
        });

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <Loader {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({});
    });
});
