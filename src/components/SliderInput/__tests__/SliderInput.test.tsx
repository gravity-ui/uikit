import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {fireEvent, render, screen} from '../../../../test-utils/utils';
import {SliderInput} from '../SliderInput';

describe('SliderInput', () => {
    const getInput = () => screen.getByRole('spinbutton');
    const getSlider = () => screen.getByRole('slider');

    const pressArrowRight = () => {
        const slider = getSlider();
        fireEvent.keyDown(slider, {key: 'ArrowRight', code: 'ArrowRight', keyCode: 39});
        fireEvent.keyUp(slider, {key: 'ArrowRight', code: 'ArrowRight', keyCode: 39});
    };

    it('normalizes the default value and shows it in both controls', () => {
        render(<SliderInput min={10} max={20} defaultValue={-5} />);

        expect(getInput()).toHaveValue('10');
        expect(getSlider()).toHaveAttribute('aria-valuemin', '10');
        expect(getSlider()).toHaveAttribute('aria-valuemax', '20');
        expect(getSlider()).toHaveAttribute('aria-valuenow', '10');
    });

    it('does not change a controlled value until the value prop changes', () => {
        const handleUpdate = jest.fn();
        const {rerender} = render(<SliderInput value={20} onUpdate={handleUpdate} />);

        fireEvent.change(getInput(), {target: {value: '35'}});

        expect(handleUpdate).toHaveBeenCalledWith(35);
        expect(getInput()).toHaveValue('20');
        expect(getSlider()).toHaveAttribute('aria-valuenow', '20');

        rerender(<SliderInput value={35} onUpdate={handleUpdate} />);

        expect(getInput()).toHaveValue('35');
        expect(getSlider()).toHaveAttribute('aria-valuenow', '35');
    });

    it('keeps the slider synchronized with uncontrolled input changes', () => {
        const handleUpdate = jest.fn();
        const handleUpdateComplete = jest.fn((value) => {
            expect(getInput()).toHaveValue(String(value));
            expect(getSlider()).toHaveAttribute('aria-valuenow', String(value));
        });
        render(
            <SliderInput
                defaultValue={20}
                onUpdate={handleUpdate}
                onUpdateComplete={handleUpdateComplete}
            />,
        );

        fireEvent.change(getInput(), {target: {value: '35'}});

        expect(handleUpdate).toHaveBeenLastCalledWith(35);
        expect(getInput()).toHaveValue('35');
        expect(getSlider()).toHaveAttribute('aria-valuenow', '35');
        expect(handleUpdateComplete).not.toHaveBeenCalled();

        fireEvent.keyDown(getInput(), {key: 'Enter'});
        fireEvent.blur(getInput());

        expect(handleUpdate.mock.calls).toEqual([[35]]);
        expect(handleUpdateComplete.mock.calls).toEqual([[35]]);
    });

    it('keeps typed decimals in the draft and commits them', async () => {
        const user = userEvent.setup();
        const handleUpdate = jest.fn();
        render(
            <SliderInput min={0} max={1} step={0.01} defaultValue={0} onUpdate={handleUpdate} />,
        );

        const input = getInput();
        await user.clear(input);
        await user.type(input, '0.05');

        expect(input).toHaveValue('0.05');
        expect(handleUpdate).toHaveBeenLastCalledWith(0.05);
        expect(getSlider()).toHaveAttribute('aria-valuenow', '0.05');

        fireEvent.blur(input);

        expect(input).toHaveValue('0.05');
        expect(getSlider()).toHaveAttribute('aria-valuenow', '0.05');
    });

    it('keeps a draft with trailing decimal zeros in the controlled mode', async () => {
        const user = userEvent.setup();
        render(<SliderInput min={0} max={1} step={0.01} value={0} />);

        const input = getInput();
        await user.clear(input);
        await user.type(input, '0.0');

        expect(input).toHaveValue('0.0');
    });

    it('shows the same value in the input, the slider and the form data with marks={1}', () => {
        render(
            <form aria-label="Example form">
                <SliderInput
                    name="amount"
                    min={-0.13}
                    max={66.12}
                    step={null}
                    marks={1}
                    defaultValue={18.46}
                />
            </form>,
        );

        const formValue = new FormData(
            screen.getByRole<HTMLFormElement>('form', {name: 'Example form'}),
        ).get('amount');

        expect(formValue).not.toBeNull();
        expect(getInput()).toHaveValue(String(formValue));
        expect(getSlider()).toHaveAttribute('aria-valuenow', String(formValue));
    });

    it('does not call onUpdateComplete when the value has not changed', async () => {
        const user = userEvent.setup();
        const handleUpdateComplete = jest.fn();
        render(
            <React.Fragment>
                <SliderInput defaultValue={100} onUpdateComplete={handleUpdateComplete} />
                <button type="button">Outside</button>
            </React.Fragment>,
        );

        await user.click(getInput());
        fireEvent.keyDown(getInput(), {key: 'ArrowUp'});
        fireEvent.keyDown(getInput(), {key: 'End'});
        fireEvent.keyDown(getInput(), {key: 'Enter'});
        await user.click(screen.getByRole('button', {name: 'Outside'}));

        expect(handleUpdateComplete).not.toHaveBeenCalled();
    });

    it('steps from the typed draft with the arrow keys', () => {
        const handleUpdate = jest.fn();
        const handleUpdateComplete = jest.fn();
        render(
            <SliderInput
                min={0}
                max={100}
                step={10}
                defaultValue={0}
                onUpdate={handleUpdate}
                onUpdateComplete={handleUpdateComplete}
            />,
        );

        fireEvent.change(getInput(), {target: {value: '49'}});
        expect(handleUpdate).not.toHaveBeenCalled();
        fireEvent.keyDown(getInput(), {key: 'ArrowUp'});

        expect(handleUpdate).toHaveBeenLastCalledWith(50);
        expect(handleUpdateComplete).not.toHaveBeenCalled();
        expect(getInput()).toHaveValue('50');
        fireEvent.keyUp(getInput(), {key: 'ArrowUp'});
        expect(handleUpdateComplete.mock.calls).toEqual([[50]]);

        fireEvent.change(getInput(), {target: {value: '49'}});
        fireEvent.keyDown(getInput(), {key: 'ArrowDown'});

        expect(handleUpdate).toHaveBeenLastCalledWith(40);
        expect(getInput()).toHaveValue('40');
        expect(handleUpdateComplete.mock.calls).toEqual([[50]]);
        fireEvent.keyUp(getInput(), {key: 'ArrowDown'});
        expect(handleUpdateComplete.mock.calls).toEqual([[50], [40]]);
    });

    it('normalizes the draft without onUpdateComplete when a step lands on the committed value', () => {
        const handleUpdateComplete = jest.fn();
        render(
            <SliderInput
                min={0}
                max={100}
                step={10}
                defaultValue={50}
                onUpdateComplete={handleUpdateComplete}
            />,
        );

        fireEvent.change(getInput(), {target: {value: '49'}});
        fireEvent.keyDown(getInput(), {key: 'ArrowUp'});
        fireEvent.keyUp(getInput(), {key: 'ArrowUp'});

        expect(getInput()).toHaveValue('50');
        expect(handleUpdateComplete).not.toHaveBeenCalled();
    });

    it('exposes an uncommitted draft through aria-valuetext', () => {
        render(<SliderInput min={0} max={100} step={10} defaultValue={0} />);

        expect(getInput()).not.toHaveAttribute('aria-valuetext');

        fireEvent.change(getInput(), {target: {value: '49'}});

        expect(getInput()).toHaveAttribute('aria-valuetext', '49');
        expect(getInput()).toHaveAttribute('aria-valuenow', '0');

        fireEvent.keyDown(getInput(), {key: 'ArrowUp'});

        expect(getInput()).not.toHaveAttribute('aria-valuetext');
        expect(getInput()).toHaveAttribute('aria-valuenow', '50');
    });

    it('shares the note and error between both controls without repeating them on the group', () => {
        render(
            <SliderInput
                aria-describedby="external-description"
                note="Note text"
                validationState="invalid"
                errorMessage="Error text"
                defaultValue={50}
            />,
        );

        expect(screen.getByRole('group')).not.toHaveAttribute('aria-describedby');

        const ids = getInput().getAttribute('aria-describedby')?.split(' ') ?? [];
        expect(ids).toEqual(
            expect.arrayContaining([
                'external-description',
                screen.getByText('Note text').getAttribute('id'),
                screen.getByText('Error text').getAttribute('id'),
            ]),
        );
        expect(getSlider()).toHaveAttribute('aria-describedby', ids.join(' '));
        expect(getInput()).toHaveAttribute('aria-invalid', 'true');
        expect(getSlider()).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not publish a value that is only approximately aligned to the step', () => {
        const handleUpdate = jest.fn();
        render(<SliderInput defaultValue={0} step={1} onUpdate={handleUpdate} />);

        fireEvent.change(getInput(), {target: {value: '0.00000000001'}});

        expect(handleUpdate).not.toHaveBeenCalled();
        expect(getInput()).toHaveValue('0.00000000001');
        expect(getSlider()).toHaveAttribute('aria-valuenow', '0');
    });

    it('keeps small decimal steps canonical across both controls and form data', () => {
        render(
            <form aria-label="Example form">
                <SliderInput
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
                <SliderInput
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
            <SliderInput
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
            <SliderInput
                defaultValue={50}
                min={0}
                max={100}
                step={null}
                marks={[0, 50, 100]}
                onUpdate={handleUpdate}
            />,
        );

        rerender(
            <SliderInput
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
            <SliderInput
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

    it.each([undefined, () => ''])('keeps marks selectable with formatter %p', (markFormat) => {
        render(
            <SliderInput
                min={0}
                max={100}
                defaultValue={0}
                marks={[20, 60]}
                step={null}
                markFormat={markFormat}
            />,
        );

        pressArrowRight();

        expect(getInput()).toHaveValue('20');
        expect(getSlider()).toHaveAttribute('aria-valuenow', '20');
    });

    it('shares sorted unique finite in-domain marks and endpoints between both controls', () => {
        const markFormat = jest.fn(String);
        render(
            <SliderInput
                min={0}
                max={100}
                defaultValue={0}
                step={null}
                marks={[60, NaN, -10, 20, Infinity, 60, 110, -Infinity]}
                markFormat={markFormat}
            />,
        );

        for (const value of [20, 60, 100]) {
            fireEvent.keyDown(getInput(), {key: 'ArrowUp'});
            fireEvent.keyUp(getInput(), {key: 'ArrowUp'});
            expect(getInput()).toHaveValue(String(value));
            expect(getSlider()).toHaveAttribute('aria-valuenow', String(value));
        }
        for (const value of [60, 20, 0]) {
            fireEvent.keyDown(getSlider(), {key: 'ArrowLeft', code: 'ArrowLeft', keyCode: 37});
            fireEvent.keyUp(getSlider(), {key: 'ArrowLeft', code: 'ArrowLeft', keyCode: 37});
            expect(getInput()).toHaveValue(String(value));
            expect(getSlider()).toHaveAttribute('aria-valuenow', String(value));
        }
        expect([...new Set(markFormat.mock.calls.map(([value]) => value))]).toEqual([20, 60]);
    });

    it('moves the input to the next allowed value with ArrowUp', () => {
        const handleUpdate = jest.fn();
        const handleUpdateComplete = jest.fn();
        render(
            <SliderInput
                defaultValue={20}
                step={5}
                onUpdate={handleUpdate}
                onUpdateComplete={handleUpdateComplete}
            />,
        );

        fireEvent.keyDown(getInput(), {key: 'ArrowUp', code: 'ArrowUp', keyCode: 38});

        expect(handleUpdate).toHaveBeenLastCalledWith(25);
        expect(handleUpdateComplete).not.toHaveBeenCalled();
        expect(getInput()).toHaveValue('25');
        fireEvent.keyUp(getInput(), {key: 'ArrowUp', code: 'ArrowUp', keyCode: 38});
        expect(handleUpdateComplete.mock.calls).toEqual([[25]]);
    });

    it('submits one canonical value without naming the visible input', async () => {
        const submittedEntries: Array<[string, FormDataEntryValue]> = [];
        const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
            event.preventDefault();
            submittedEntries.push(...new FormData(event.currentTarget).entries());
        };
        render(
            <form onSubmit={handleSubmit}>
                <SliderInput name="amount" defaultValue={35} />
                <button type="submit">Submit</button>
            </form>,
        );

        expect(getInput()).toHaveAttribute('name', '');

        await userEvent.click(screen.getByRole('button', {name: 'Submit'}));

        expect(submittedEntries).toEqual([['amount', '35']]);
    });

    it('restores the visible draft on native form reset', async () => {
        const handleUpdate = jest.fn();
        const handleUpdateComplete = jest.fn();
        render(
            <form>
                <SliderInput
                    name="amount"
                    defaultValue={20}
                    step={5}
                    onUpdate={handleUpdate}
                    onUpdateComplete={handleUpdateComplete}
                />
                <button type="reset">Reset</button>
            </form>,
        );

        fireEvent.change(getInput(), {target: {value: '35'}});
        fireEvent.change(getInput(), {target: {value: '22'}});
        expect(getInput()).toHaveValue('22');

        await userEvent.click(screen.getByRole('button', {name: 'Reset'}));

        expect(getInput()).toHaveValue('20');
        expect(handleUpdate.mock.calls).toEqual([[35], [20]]);
        expect(handleUpdateComplete).not.toHaveBeenCalled();
        fireEvent.blur(getInput());
        expect(handleUpdateComplete).not.toHaveBeenCalled();
    });

    it('keeps a native reset canonical after the allowed domain changes', async () => {
        const handleUpdate = jest.fn();
        const handleUpdateComplete = jest.fn();
        const {rerender} = render(
            <form>
                <SliderInput
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
                <SliderInput
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
        expect(handleUpdateComplete).not.toHaveBeenCalled();
        expect(getInput()).toHaveValue('60');
        expect(getSlider()).toHaveAttribute('aria-valuenow', '60');

        fireEvent.change(getInput(), {target: {value: '30'}});
        await userEvent.click(screen.getByRole('button', {name: 'Reset'}));

        expect(handleUpdate.mock.calls).toEqual([[30], [60]]);
        expect(handleUpdateComplete).not.toHaveBeenCalled();
        expect(getInput()).toHaveValue('60');
    });

    it.each([
        {end: 'keyup', returnToStart: false},
        {end: 'blur', returnToStart: false},
        {end: 'keyup', returnToStart: true},
        {end: 'blur', returnToStart: true},
    ])(
        'completes repeated input keys on $end (return to start: $returnToStart)',
        ({end, returnToStart}) => {
            const handleUpdate = jest.fn();
            const handleUpdateComplete = jest.fn();
            render(
                <SliderInput
                    defaultValue={20}
                    step={5}
                    onUpdate={handleUpdate}
                    onUpdateComplete={handleUpdateComplete}
                />,
            );

            fireEvent.keyDown(getInput(), {key: 'ArrowUp'});
            const lastKey = returnToStart ? 'ArrowDown' : 'ArrowUp';
            fireEvent.keyDown(getInput(), {key: lastKey, repeat: !returnToStart});

            expect(handleUpdate.mock.calls).toEqual([[25], [returnToStart ? 20 : 30]]);
            expect(handleUpdateComplete).not.toHaveBeenCalled();
            if (end === 'blur') {
                fireEvent.blur(getInput());
            } else {
                fireEvent.keyUp(getInput(), {key: lastKey});
            }
            expect(handleUpdateComplete.mock.calls).toEqual(returnToStart ? [] : [[30]]);

            fireEvent.keyUp(getInput(), {key: lastKey});
            fireEvent.blur(getInput());
            expect(handleUpdateComplete.mock.calls).toEqual(returnToStart ? [] : [[30]]);
        },
    );

    it.each([
        {mode: 'accepted', nextValue: 35, completed: [[35]]},
        {mode: 'rejected', nextValue: 20, completed: []},
        {mode: 'replaced externally', nextValue: 60, completed: []},
    ])('completes only an accepted controlled edit: $mode', ({nextValue, completed}) => {
        const handleUpdate = jest.fn();
        const handleUpdateComplete = jest.fn();
        const props = {onUpdate: handleUpdate, onUpdateComplete: handleUpdateComplete};
        const {rerender} = render(<SliderInput {...props} value={20} />);

        fireEvent.change(getInput(), {target: {value: '35'}});
        expect(getInput()).toHaveValue('20');
        expect(handleUpdateComplete).not.toHaveBeenCalled();

        rerender(<SliderInput {...props} value={nextValue} />);
        expect(getInput()).toHaveValue(String(nextValue));
        expect(handleUpdateComplete).not.toHaveBeenCalled();
        fireEvent.keyDown(getInput(), {key: 'Enter'});
        fireEvent.blur(getInput());

        expect(handleUpdate.mock.calls).toEqual([[35]]);
        expect(handleUpdateComplete.mock.calls).toEqual(completed);
    });

    it.each([
        {mode: 'equivalent marks', marks: [100, 0, 0], step: 1, completed: [[50]]},
        {mode: 'changed marks', marks: [0, 25, 100], step: 1, completed: []},
        {mode: 'changed step', marks: [0, 100], step: 2, completed: []},
    ])('handles a pending edit after $mode', ({marks, step, completed}) => {
        const handleUpdate = jest.fn();
        const handleUpdateComplete = jest.fn();
        const props = {
            defaultValue: 20,
            onUpdate: handleUpdate,
            onUpdateComplete: handleUpdateComplete,
        };
        const {rerender} = render(<SliderInput {...props} marks={[0, 100]} step={1} />);

        fireEvent.change(getInput(), {target: {value: '50'}});
        rerender(<SliderInput {...props} marks={marks} step={step} />);

        expect(handleUpdateComplete).not.toHaveBeenCalled();
        fireEvent.blur(getInput());
        expect(handleUpdate.mock.calls).toEqual([[50]]);
        expect(handleUpdateComplete.mock.calls).toEqual(completed);
        expect(getInput()).toHaveValue('50');
    });

    it.each([1, 3])('filters rounded numeric marks outside a tiny domain (marks=%s)', (marks) => {
        const markFormat = jest.fn(String);
        render(
            <SliderInput
                min={0.001}
                max={0.002}
                defaultValue={0.001}
                step={null}
                marks={marks}
                markFormat={markFormat}
            />,
        );

        expect(markFormat).not.toHaveBeenCalledWith(0);
        pressArrowRight();
        expect(getInput()).toHaveValue('0.002');
        expect(getSlider()).toHaveAttribute('aria-valuenow', '0.002');
    });

    it('submits a fixed domain value while disabling only the slider', () => {
        render(
            <form aria-label="Example form">
                <SliderInput name="amount" min={5} max={5} defaultValue={0} />
            </form>,
        );

        expect(getInput()).toHaveValue('5');
        expect(getInput()).not.toBeDisabled();
        expect(getSlider()).toHaveAttribute('aria-disabled', 'true');
        expect([
            ...new FormData(screen.getByRole<HTMLFormElement>('form', {name: 'Example form'})),
        ]).toEqual([['amount', '5']]);
    });

    it.each([
        {controlled: false, callback: 'onKeyDown'},
        {controlled: true, callback: 'onKeyDown'},
        {controlled: false, callback: 'onChange'},
        {controlled: true, callback: 'onChange'},
        {controlled: false, callback: 'onUpdate'},
        {controlled: true, callback: 'onUpdate'},
    ])(
        'finishes a synchronous $callback blur (controlled: $controlled)',
        async ({controlled, callback}) => {
            const handleUpdate = jest.fn();
            const handleUpdateComplete = jest.fn();
            function Example() {
                const [value, setValue] = React.useState(10);
                return (
                    <SliderInput
                        value={controlled ? value : undefined}
                        defaultValue={10}
                        onUpdate={(nextValue) => {
                            handleUpdate(nextValue);
                            setValue(nextValue);
                            if (callback === 'onUpdate') {
                                getInput().blur();
                            }
                        }}
                        onUpdateComplete={handleUpdateComplete}
                        controlProps={{
                            onKeyDown:
                                callback === 'onKeyDown'
                                    ? (event) => event.currentTarget.blur()
                                    : undefined,
                            onChange:
                                callback === 'onChange'
                                    ? (event) => event.currentTarget.blur()
                                    : undefined,
                        }}
                    />
                );
            }
            render(<Example />);
            await userEvent.click(getInput());
            expect(handleUpdateComplete).not.toHaveBeenCalled();

            if (callback === 'onChange') {
                fireEvent.change(getInput(), {target: {value: '11'}});
            } else {
                fireEvent.keyDown(getInput(), {key: 'ArrowUp'});
            }

            expect(handleUpdate.mock.calls).toEqual([[11]]);
            expect(handleUpdateComplete.mock.calls).toEqual([[11]]);
            expect(getInput()).toHaveValue('11');
            fireEvent.keyUp(getInput(), {key: 'ArrowUp'});
            fireEvent.blur(getInput());
            expect(handleUpdateComplete.mock.calls).toEqual([[11]]);
        },
    );

    it('reports focus only when focus enters or leaves the whole control', async () => {
        const user = userEvent.setup();
        const handleFocus = jest.fn();
        const handleBlur = jest.fn();
        render(
            <React.Fragment>
                <SliderInput onFocus={handleFocus} onBlur={handleBlur} />
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

        render(<SliderInput ref={rootRef} controlRef={controlRef} />);

        expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
        expect(controlRef.current).toBe(getInput());
    });

    it('renders the shared error message after the slider', () => {
        render(
            <SliderInput
                validationState="invalid"
                errorMessage="Invalid value"
                defaultValue={50}
            />,
        );

        const errorMessage = screen.getByText('Invalid value');
        const errorPosition = getSlider().compareDocumentPosition(errorMessage);

        expect(errorPosition).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    });
});
