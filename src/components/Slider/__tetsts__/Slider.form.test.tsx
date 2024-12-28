import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {fireEvent, render, screen} from '../../../../test-utils/utils';
import {Slider} from '../Slider';

describe('Slider form', () => {
    it('should submit empty option by default', async () => {
        let value;
        const onSubmit = jest.fn((e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            value = [...formData.entries()];
        });
        render(
            <form data-qa="form" onSubmit={onSubmit}>
                <Slider name="slider" />
                <button type="submit" data-qa="submit">
                    submit
                </button>
            </form>,
        );
        await userEvent.click(screen.getByTestId('submit'));
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(value).toEqual([['slider', '0']]);
    });

    it('should submit default option', async () => {
        let value;
        const onSubmit = jest.fn((e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            value = [...formData.entries()];
        });
        render(
            <form data-qa="form" onSubmit={onSubmit}>
                <Slider name="slider" defaultValue={5} />
                <button type="submit" data-qa="submit">
                    submit
                </button>
            </form>,
        );
        await userEvent.click(screen.getByTestId('submit'));
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(value).toEqual([['slider', '5']]);
    });

    it('should submit multiple option', async () => {
        let value;
        const onSubmit = jest.fn((e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            value = [...formData.entries()];
        });
        render(
            <form data-qa="form" onSubmit={onSubmit}>
                <Slider name="slider" defaultValue={[5, 10]} />
                <button type="submit" data-qa="submit">
                    submit
                </button>
            </form>,
        );
        await userEvent.click(screen.getByTestId('submit'));
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(value).toEqual([
            ['slider', '5'],
            ['slider', '10'],
        ]);
    });

    it('supports form reset', async () => {
        function Test() {
            const [value, setValue] = React.useState(5);
            return (
                <form data-qa="form">
                    <Slider name="slider" value={value} onUpdate={setValue} qa="slider" />
                    <input type="reset" data-qa="reset" />
                </form>
            );
        }

        render(<Test />);
        const form = screen.getByTestId('form');
        expect(form).toHaveFormValues({slider: '5'});

        const sliderHandle = screen.getAllByRole('slider')[0];
        fireEvent.keyDown(sliderHandle, {key: 'ArrowRight', keyCode: 39, code: 'ArrowRight'});
        fireEvent.keyDown(sliderHandle, {key: 'ArrowRight', keyCode: 39, code: 'ArrowRight'});

        expect(form).toHaveFormValues({slider: '7'});

        const button = screen.getByTestId('reset');
        await userEvent.click(button);
        expect(form).toHaveFormValues({slider: '5'});
    });

    it('supports form reset range value', async () => {
        function Test() {
            const [value, setValue] = React.useState<[number, number]>([5, 10]);
            return (
                <form data-qa="form">
                    <Slider name="slider" value={value} onUpdate={setValue} />
                    <input type="reset" data-qa="reset" />
                </form>
            );
        }

        render(<Test />);
        const form = screen.getByTestId('form');
        expect(form).toHaveFormValues({slider: ['5', '10']});

        const sliderHandle = screen.getAllByRole('slider')[1];
        fireEvent.keyDown(sliderHandle, {key: 'ArrowRight', keyCode: 39, code: 'ArrowRight'});
        fireEvent.keyDown(sliderHandle, {key: 'ArrowRight', keyCode: 39, code: 'ArrowRight'});

        expect(form).toHaveFormValues({slider: ['5', '12']});

        const button = screen.getByTestId('reset');
        await userEvent.click(button);
        expect(form).toHaveFormValues({slider: ['5', '10']});
    });
});
