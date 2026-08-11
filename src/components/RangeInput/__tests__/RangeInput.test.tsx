import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {fireEvent, render, screen} from '../../../../test-utils/utils';
import {RangeInput} from '../RangeInput';

describe('RangeInput', () => {
    const getInput = () => screen.getByRole('spinbutton');
    const getSlider = () => screen.getByRole('slider');

    const pressArrowRight = () => {
        const slider = getSlider();
        fireEvent.keyDown(slider, {key: 'ArrowRight', code: 'ArrowRight', keyCode: 39});
        fireEvent.keyUp(slider, {key: 'ArrowRight', code: 'ArrowRight', keyCode: 39});
    };

    it('normalizes the default value and shows it in both controls', () => {
        render(<RangeInput min={10} max={20} defaultValue={-5} />);

        expect(getInput()).toHaveValue('10');
        expect(getSlider()).toHaveAttribute('aria-valuemin', '10');
        expect(getSlider()).toHaveAttribute('aria-valuemax', '20');
        expect(getSlider()).toHaveAttribute('aria-valuenow', '10');
    });

    it('does not change a controlled value until the value prop changes', () => {
        const handleUpdate = jest.fn();
        const {rerender} = render(<RangeInput value={20} onUpdate={handleUpdate} />);

        fireEvent.change(getInput(), {target: {value: '35'}});

        expect(handleUpdate).toHaveBeenCalledWith(35);
        expect(getInput()).toHaveValue('20');
        expect(getSlider()).toHaveAttribute('aria-valuenow', '20');

        rerender(<RangeInput value={35} onUpdate={handleUpdate} />);

        expect(getInput()).toHaveValue('35');
        expect(getSlider()).toHaveAttribute('aria-valuenow', '35');
    });

    it('keeps the slider synchronized with uncontrolled input changes', () => {
        const handleUpdate = jest.fn();
        render(<RangeInput defaultValue={20} onUpdate={handleUpdate} />);

        fireEvent.change(getInput(), {target: {value: '35'}});

        expect(handleUpdate).toHaveBeenLastCalledWith(35);
        expect(getInput()).toHaveValue('35');
        expect(getSlider()).toHaveAttribute('aria-valuenow', '35');
    });

    it('does not publish a value that is only approximately aligned to the step', () => {
        const handleUpdate = jest.fn();
        render(<RangeInput defaultValue={0} step={1} onUpdate={handleUpdate} />);

        fireEvent.change(getInput(), {target: {value: '0.00000000001'}});

        expect(handleUpdate).not.toHaveBeenCalled();
        expect(getInput()).toHaveValue('0.00000000001');
        expect(getSlider()).toHaveAttribute('aria-valuenow', '0');
    });

    it('keeps small decimal steps canonical across both controls and form data', () => {
        render(
            <form aria-label="Example form">
                <RangeInput
                    name="amount"
                    min={0}
                    max={0.00001}
                    step={0.000001}
                    marks={0}
                    defaultValue={0}
                />
            </form>,
        );

        fireEvent.keyDown(getInput(), {key: 'ArrowUp', code: 'ArrowUp', keyCode: 38});

        expect(getInput()).toHaveValue('0.000001');
        expect(getSlider()).toHaveAttribute('aria-valuenow', '0.000001');
        expect(
            new FormData(screen.getByRole<HTMLFormElement>('form', {name: 'Example form'})).get(
                'amount',
            ),
        ).toBe('0.000001');
    });

    it('normalizes scientific-notation steps consistently with Slider', () => {
        render(
            <form aria-label="Example form">
                <RangeInput
                    name="amount"
                    min={0}
                    max={0.000001}
                    step={0.0000001}
                    marks={0}
                    defaultValue={0.0000001}
                />
            </form>,
        );

        expect(getInput()).toHaveValue('0');
        expect(getSlider()).toHaveAttribute('aria-valuenow', '0');
        expect(
            new FormData(screen.getByRole<HTMLFormElement>('form', {name: 'Example form'})).get(
                'amount',
            ),
        ).toBe('0');
    });

    it('resolves a tie between a mark and a step like Slider', () => {
        const handleUpdate = jest.fn();
        const handleUpdateComplete = jest.fn();
        render(
            <RangeInput
                min={0}
                max={10}
                step={2}
                marks={[1]}
                defaultValue={0}
                onUpdate={handleUpdate}
                onUpdateComplete={handleUpdateComplete}
            />,
        );

        fireEvent.change(getInput(), {target: {value: '1.5'}});
        fireEvent.blur(getInput());

        expect(handleUpdate).toHaveBeenLastCalledWith(2);
        expect(handleUpdateComplete).toHaveBeenLastCalledWith(2);
        expect(getInput()).toHaveValue('2');
        expect(getSlider()).toHaveAttribute('aria-valuenow', '2');
    });

    it('normalizes an uncontrolled value when the allowed domain changes', () => {
        const handleUpdate = jest.fn();
        const {rerender} = render(
            <RangeInput
                defaultValue={50}
                min={0}
                max={100}
                step={null}
                marks={[0, 50, 100]}
                onUpdate={handleUpdate}
            />,
        );

        rerender(
            <RangeInput
                defaultValue={50}
                min={0}
                max={60}
                step={null}
                marks={[0, 30, 60]}
                onUpdate={handleUpdate}
            />,
        );

        expect(getInput()).toHaveValue('60');
        expect(getSlider()).toHaveAttribute('aria-valuenow', '60');
        expect(handleUpdate).not.toHaveBeenCalled();
    });

    it('keeps the input synchronized and completes a keyboard slider update', () => {
        const handleUpdate = jest.fn();
        const handleUpdateComplete = jest.fn();
        render(
            <RangeInput
                defaultValue={20}
                step={5}
                onUpdate={handleUpdate}
                onUpdateComplete={handleUpdateComplete}
            />,
        );

        pressArrowRight();

        expect(handleUpdate).toHaveBeenLastCalledWith(25);
        expect(handleUpdateComplete).toHaveBeenLastCalledWith(25);
        expect(getInput()).toHaveValue('25');
        expect(getSlider()).toHaveAttribute('aria-valuenow', '25');
    });

    it('uses marks and endpoints as the only values when step is null', () => {
        render(<RangeInput min={0} max={100} defaultValue={0} marks={[20, 60]} step={null} />);

        pressArrowRight();

        expect(getInput()).toHaveValue('20');
        expect(getSlider()).toHaveAttribute('aria-valuenow', '20');
    });

    it('moves the input to the next allowed value with ArrowUp', () => {
        const handleUpdate = jest.fn();
        const handleUpdateComplete = jest.fn();
        render(
            <RangeInput
                defaultValue={20}
                step={5}
                onUpdate={handleUpdate}
                onUpdateComplete={handleUpdateComplete}
            />,
        );

        fireEvent.keyDown(getInput(), {key: 'ArrowUp', code: 'ArrowUp', keyCode: 38});

        expect(handleUpdate).toHaveBeenLastCalledWith(25);
        expect(handleUpdateComplete).toHaveBeenLastCalledWith(25);
        expect(getInput()).toHaveValue('25');
    });

    it('submits one canonical value without naming the visible input', async () => {
        const submittedEntries: Array<[string, FormDataEntryValue]> = [];
        const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
            event.preventDefault();
            submittedEntries.push(...new FormData(event.currentTarget).entries());
        };
        render(
            <form onSubmit={handleSubmit}>
                <RangeInput name="amount" defaultValue={35} />
                <button type="submit">Submit</button>
            </form>,
        );

        expect(getInput()).not.toHaveAttribute('name');

        await userEvent.click(screen.getByRole('button', {name: 'Submit'}));

        expect(submittedEntries).toEqual([['amount', '35']]);
    });

    it('restores the visible draft on native form reset', async () => {
        render(
            <form>
                <RangeInput name="amount" defaultValue={20} step={5} />
                <button type="reset">Reset</button>
            </form>,
        );

        fireEvent.change(getInput(), {target: {value: '22'}});
        expect(getInput()).toHaveValue('22');

        await userEvent.click(screen.getByRole('button', {name: 'Reset'}));

        expect(getInput()).toHaveValue('20');
    });

    it('keeps a native reset canonical after the allowed domain changes', async () => {
        const handleUpdate = jest.fn();
        const handleUpdateComplete = jest.fn();
        const {rerender} = render(
            <form>
                <RangeInput
                    name="amount"
                    defaultValue={50}
                    onUpdate={handleUpdate}
                    onUpdateComplete={handleUpdateComplete}
                />
                <button type="reset">Reset</button>
            </form>,
        );

        rerender(
            <form>
                <RangeInput
                    name="amount"
                    defaultValue={50}
                    max={60}
                    step={null}
                    marks={[0, 30, 60]}
                    onUpdate={handleUpdate}
                    onUpdateComplete={handleUpdateComplete}
                />
                <button type="reset">Reset</button>
            </form>,
        );
        handleUpdate.mockClear();
        handleUpdateComplete.mockClear();

        await userEvent.click(screen.getByRole('button', {name: 'Reset'}));

        expect(handleUpdate).not.toHaveBeenCalled();
        expect(handleUpdateComplete).toHaveBeenLastCalledWith(60);
        expect(getInput()).toHaveValue('60');
        expect(getSlider()).toHaveAttribute('aria-valuenow', '60');
    });

    it('reports focus only when focus enters or leaves the whole control', async () => {
        const user = userEvent.setup();
        const handleFocus = jest.fn();
        const handleBlur = jest.fn();
        render(
            <React.Fragment>
                <RangeInput onFocus={handleFocus} onBlur={handleBlur} />
                <button type="button">Outside</button>
            </React.Fragment>,
        );

        await user.click(getInput());
        expect(handleFocus).toHaveBeenCalledTimes(1);
        expect(handleBlur).not.toHaveBeenCalled();

        await user.click(getSlider());
        expect(handleFocus).toHaveBeenCalledTimes(1);
        expect(handleBlur).not.toHaveBeenCalled();

        await user.click(screen.getByRole('button', {name: 'Outside'}));
        expect(handleFocus).toHaveBeenCalledTimes(1);
        expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('forwards refs to the root and the visible input', () => {
        const rootRef = React.createRef<HTMLDivElement>();
        const controlRef = React.createRef<HTMLInputElement>();

        render(<RangeInput ref={rootRef} controlRef={controlRef} />);

        expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
        expect(controlRef.current).toBe(getInput());
    });

    it('renders the shared error message after the slider', () => {
        render(
            <RangeInput validationState="invalid" errorMessage="Invalid value" defaultValue={50} />,
        );

        const errorMessage = screen.getByText('Invalid value');
        const errorPosition = getSlider().compareDocumentPosition(errorMessage);

        expect(errorPosition).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    });
});
