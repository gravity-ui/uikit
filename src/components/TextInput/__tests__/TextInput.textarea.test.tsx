import React from 'react';

import {render, screen} from '@testing-library/react';

import {TextInput} from '../TextInput';

describe('TextInput textarea', () => {
    describe('without label prop', () => {
        describe('basic', () => {
            test('render textarea with multiline prop', () => {
                render(<TextInput multiline />);
                const input = screen.getByRole('textbox');

                expect(input).toBeVisible();
                expect(input.tagName.toLowerCase()).toBe('textarea');
            });
        });

        describe('autocomplete', () => {
            test('render no autocomplete attribute when no autoComplete, no id, no name props', () => {
                render(<TextInput multiline />);
                const input = screen.getByRole('textbox');

                expect(input.getAttribute('autocomplete')).toBeNull();
            });
        });
    });

    describe('with label prop', () => {
        describe('basic', () => {
            test('render textarea without label', () => {
                const {container} = render(<TextInput multiline label="Label:" />);

                // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
                const label = container.querySelector('.yc-text-input__label');

                expect(label).toBeNull();
                expect(screen.queryByText('Label:')).toBeNull();
            });
        });

        describe('autocomplete', () => {
            test('render no autocomplete attribute when no autoComplete, no id, no name props', () => {
                render(<TextInput multiline label="Label:" />);
                const input = screen.getByRole('textbox');

                expect(input.getAttribute('autocomplete')).toBeNull();
            });

            test('render no autocomplete attribute when no autoComplete prop, but id prop set', () => {
                render(<TextInput multiline id="yc-id" label="Label:" />);
                const input = screen.getByRole('textbox');

                expect(input.getAttribute('autocomplete')).toBeNull();
            });

            test('render no autocomplete attribute when no autoComplete prop, but name prop set', () => {
                render(<TextInput multiline name="yc-name" label="Label:" />);
                const input = screen.getByRole('textbox');

                expect(input.getAttribute('autocomplete')).toBeNull();
            });
        });
    });
});
