import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import {Box} from '../../layout';
import type {OverlayProps} from '../Overlay';
import {Overlay} from '../Overlay';

import {backgroundCases, visibleCases} from './cases';

test.describe('Overlay', {tag: '@Overlay'}, () => {
    test('smoke', async ({mount, expectScreenshot}) => {
        const defaultProps: OverlayProps = {
            visible: true,
        };

        const smokeScenarios = createSmokeScenarios<OverlayProps>(defaultProps, {
            visible: visibleCases,
            background: backgroundCases,
        });

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <Box position="relative">
                            <div>Example of overlay</div>
                            <Overlay {...props}>
                                <div>Loader</div>
                            </Overlay>
                        </Box>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot();
    });
});
