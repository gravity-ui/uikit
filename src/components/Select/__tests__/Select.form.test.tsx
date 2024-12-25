/* eslint-disable testing-library/no-node-access */
import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {render, screen, within} from '../../../../test-utils/utils';
import {Select} from '../Select';

describe('Select form', () => {
    it('should submit empty option by default', async () => {
        let value;
        const onSubmit = jest.fn((e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            value = formData.getAll('select');
        });
        render(
            <form data-qa="form" onSubmit={onSubmit}>
                <Select name="select" label="Test">
                    <Select.Option value="one">One</Select.Option>
                    <Select.Option value="two">Two</Select.Option>
                    <Select.Option value="three">Three</Select.Option>
                </Select>
                <button type="submit" data-qa="submit">
                    submit
                </button>
            </form>,
        );
        await userEvent.click(screen.getByTestId('submit'));
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(value).toEqual(['']);
    });

    it('should submit default option', async () => {
        let value;
        const onSubmit = jest.fn((e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            value = formData.getAll('select');
        });
        render(
            <form data-qa="form" onSubmit={onSubmit}>
                <Select defaultValue={['one']} name="select">
                    <Select.Option value="one">One</Select.Option>
                    <Select.Option value="two">Two</Select.Option>
                    <Select.Option value="three">Three</Select.Option>
                </Select>
                <button type="submit" data-qa="submit">
                    submit
                </button>
            </form>,
        );
        await userEvent.click(screen.getByTestId('submit'));
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(value).toEqual(['one']);
    });

    it('should submit multiple option', async () => {
        let value;
        const onSubmit = jest.fn((e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            value = formData.getAll('select');
        });
        render(
            <form data-qa="form" onSubmit={onSubmit}>
                <Select defaultValue={['one', 'three']} name="select" multiple>
                    <Select.Option value="one">One</Select.Option>
                    <Select.Option value="two">Two</Select.Option>
                    <Select.Option value="three">Three</Select.Option>
                </Select>
                <button type="submit" data-qa="submit">
                    submit
                </button>
            </form>,
        );
        await userEvent.click(screen.getByTestId('submit'));
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(value).toEqual(['one', 'three']);
    });

    it('supports form reset', async () => {
        function Test() {
            const [value, setValue] = React.useState(['one']);
            return (
                <form>
                    <Select name="select" value={value} onUpdate={setValue} qa="select">
                        <Select.Option value="one">One</Select.Option>
                        <Select.Option value="two">Two</Select.Option>
                        <Select.Option value="three">Three</Select.Option>
                    </Select>
                    <input type="reset" data-qa="reset" />
                </form>
            );
        }

        render(<Test />);
        const select = screen.getByTestId('select');
        let inputs = document.querySelectorAll('[name=select]');
        expect(inputs.length).toBe(1);
        expect(inputs[0]).toHaveValue('one');

        await userEvent.click(select);

        const listbox = screen.getByRole('listbox');
        const items = within(listbox).getAllByRole('option');
        expect(items.length).toBe(3);

        await userEvent.click(items[1]);
        inputs = document.querySelectorAll('[name=select]');
        expect(inputs.length).toBe(1);
        expect(inputs[0]).toHaveValue('two');

        const button = screen.getByTestId('reset');
        await userEvent.click(button);
        inputs = document.querySelectorAll('[name=select]');
        expect(inputs.length).toBe(1);
        expect(inputs[0]).toHaveValue('one');
    });
});
