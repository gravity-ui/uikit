import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';

import {test} from '~playwright/core';

import type {ClipboardIconProps} from '../ClipboardIcon';
import {ClipboardIcon} from '../ClipboardIcon';

import {sizeCases, statusCases} from './cases';

test.describe('ClipboardIcon', {tag: '@ClipboardIcon'}, () => {
    test('smoke smoke', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const defaultProps: ClipboardIconProps = {
            status: 'success',
        };

        const smokeScenarios = createSmokeScenarios(defaultProps, {
            size: sizeCases,
            status: statusCases,
        });

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <ClipboardIcon {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });
});
