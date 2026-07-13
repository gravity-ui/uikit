import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';

import {test} from '~playwright/core';

import type {TextProps} from '../Text';

import {colorCases, ellipsisCases, variantCases, whiteSpaceCases, wordBreakCases} from './cases';
import {TestText} from './helpersPlaywright';
import {TextStories} from './stories';

const longText =
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates asperiores accusamus est, ab rerum harum hic delectus fuga veniam! Hic, atque, quia sunt consectetur eius corrupti, expedita sapiente exercitationem aperiam quibusdam libero ipsa veritatis quisquam! Debitis eos unde, blanditiis ipsam adipisci, soluta incidunt architecto quidem, repellat commodi tempore! Enim assumenda nam esse laudantium sequi quaerat maiores, voluptatum quibusdam temporibus nulla perspiciatis! Corrupti error aliquid iure asperiores voluptate. Nisi temporibus nesciunt quasi animi, accusamus officia debitis voluptatum ratione ullam delectus, adipisci, repellendus vitae in amet sit magni iste impedit? Exercitationem rerum impedit sed earum iusto modi et officia aspernatur quibusdam? Fugit.';

test.describe('Text', {tag: '@Text'}, () => {
    test('smoke regular', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<TextProps>(
            {},
            {
                color: colorCases,
                variant: variantCases,
            },
        );

        await mount(
            <div style={{backgroundColor: '#F5F5F5'}}>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TestText {...props}>Text</TestText>
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    test('smoke long text', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<TextProps>(
            {},
            {
                ellipsis: ellipsisCases,
                whiteSpace: whiteSpaceCases,
                wordBreak: wordBreakCases,
            },
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div style={{width: 200}}>
                            <TestText {...props}>{longText}</TestText>
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    test(
        'smoke render story <Ellipsis />',
        {tag: ['@smoke']},
        async ({mount, expectScreenshot}) => {
            await mount(<TextStories.Ellipsis />);

            await expectScreenshot({
                themes: ['light'],
            });
        },
    );

    test(
        'smoke render story <WordBreak />',
        {tag: ['@smoke']},
        async ({mount, expectScreenshot}) => {
            await mount(<TextStories.WordBreak />);

            await expectScreenshot({
                themes: ['light'],
            });
        },
    );
});
