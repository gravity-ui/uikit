import React from 'react';

import {expect, test} from '@playwright/experimental-ct-react';

import {TextInputNote, TextInputWrapper} from './TextInputHelper';

test.describe('TextInput', () => {
    test.describe('without label prop', () => {
        test.describe('basic', () => {
            test('render input by default', async ({mount}) => {
                const component = await mount(<TextInputWrapper />);

                await expect(component).toHaveScreenshot();
            });
        });

        test('render error message with error prop', async ({mount}) => {
            const component = await mount(<TextInputWrapper error="Some Error" />);

            await expect(component).toHaveScreenshot();
        });

        test('render note container with note prop', async ({mount}) => {
            const component = await mount(<TextInputNote />);

            await expect(component).toHaveScreenshot();
        });

        test('check clear button visibility with hasClear prop', async ({mount}) => {
            const component = await mount(<TextInputWrapper qa="text" hasClear />);

            await expect(component).toHaveScreenshot();

            // eslint-disable-next-line testing-library/prefer-screen-queries
            await component.getByRole('textbox').fill('value');

            await expect(component).toHaveScreenshot();

            // eslint-disable-next-line testing-library/prefer-screen-queries
            await component.getByRole('button').click();

            await expect(component).toHaveScreenshot();
        });
    });

    test.describe('error', () => {
        test('render error message with error prop (if it is not an empty string)', async ({
            mount,
        }) => {
            const component = await mount(<TextInputWrapper error="Some Error" />);

            await expect(component).toHaveScreenshot();
        });

        test('render error message with errorMessage prop (if it is not an empty string)', async ({
            mount,
        }) => {
            const component = await mount(
                <TextInputWrapper errorMessage="Some Error with errorMessage prop" />,
            );

            await expect(component).toHaveScreenshot();
        });

        test('render error message with errorMessage prop and invalid state (if it is not an empty string)', async ({
            mount,
        }) => {
            const component = await mount(
                <TextInputWrapper
                    errorMessage="Some Error with errorMessage prop"
                    validationState="invalid"
                />,
            );

            await expect(component).toHaveScreenshot();
        });

        test('render error icon if tooltip option is selected for errorPlacement prop', async ({
            mount,
        }) => {
            const component = await mount(
                <TextInputWrapper
                    errorMessage="Some Error"
                    validationState="invalid"
                    errorPlacement="inside"
                />,
            );

            await expect(component).toHaveScreenshot();
        });

        test('do not show error message if error prop value is an empty string', async ({
            mount,
        }) => {
            const component = await mount(<TextInputWrapper error={''} />);

            await expect(component).toHaveScreenshot();
        });

        test('do not show error message if errorMessage prop value is an empty string', async ({
            mount,
        }) => {
            const component = await mount(<TextInputWrapper errorMessage={''} />);

            await expect(component).toHaveScreenshot();
        });

        test('do not show error icon if error prop is an empty string', async ({mount}) => {
            const component = await mount(<TextInputWrapper error={''} errorPlacement="inside" />);

            await expect(component).toHaveScreenshot();
        });

        test('do not show error icon if errorMessage prop is an empty string', async ({mount}) => {
            const component = await mount(
                <TextInputWrapper errorMessage={''} errorPlacement="inside" />,
            );

            await expect(component).toHaveScreenshot();
        });
    });

    test.describe('with label prop', () => {
        test.describe('basic', () => {
            test('render input with label', async ({mount}) => {
                const component = await mount(<TextInputWrapper label="Label:" />);

                await expect(component).toHaveScreenshot();
            });

            test('render described input with error message and note', async ({mount}) => {
                const errorText = 'Some error text';
                const noteText = 'Note text';
                const component = await mount(
                    <TextInputWrapper label="Label:" error={errorText} note={noteText} />,
                );

                await expect(component).toHaveScreenshot();
            });
        });
    });
});
