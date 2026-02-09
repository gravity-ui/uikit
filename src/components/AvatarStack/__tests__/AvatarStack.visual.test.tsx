import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';

import {test} from '~playwright/core';

import {sizeCases} from '../../Button/__tests__/cases';
import type {AvatarStackProps} from '../types';

import {maxCases, overlapSizeCases} from './cases';
import {TestAvatarStack, TestAvatarStackWithCustomMore} from './helpersPlaywright';
import {AvatarStackStories} from './stories';

test.describe('AvatarStack', () => {
    test('render story <SingleItem>', async ({mount, expectScreenshot}) => {
        await mount(<AvatarStackStories.SingleItem randomAvatar={false} />);

        await expectScreenshot();
    });

    test('render story <MoreButton>', async ({mount, expectScreenshot}) => {
        await mount(<AvatarStackStories.MoreButton randomAvatar={false} />);

        await expectScreenshot();
    });

    test('render story <MoreButtonOmit>', async ({mount, expectScreenshot}) => {
        await mount(<AvatarStackStories.MoreButtonOmit randomAvatar={false} />);

        await expectScreenshot();
    });

    test('render story <Total>', async ({mount, expectScreenshot}) => {
        await mount(<AvatarStackStories.Total randomAvatar={false} />);

        await expectScreenshot();
    });

    const defaultProps: AvatarStackProps & {avatarCount?: number} = {};

    test('smoke', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios(defaultProps, {
            size: sizeCases,
            overlapSize: overlapSizeCases,
            max: maxCases,
            avatarCount: [1],
        });

        await mount(
            <div style={{width: 400}}>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TestAvatarStack {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    test('smoke with custom more', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios(defaultProps, {});

        await mount(
            <div style={{width: 400}}>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TestAvatarStackWithCustomMore {...props} />
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
