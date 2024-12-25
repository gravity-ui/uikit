import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {act, render, renderHook, screen} from '../../../test-utils/utils';

import {useControlledState} from './useControlledState';

describe('useControlledState', function () {
    it('can handle default setValue behavior, wont invoke onChange for the same value twice in a row', () => {
        const onChangeSpy = jest.fn();
        const {result} = renderHook(() =>
            useControlledState(undefined, 'defaultValue', onChangeSpy),
        );
        let [value, setValue] = result.current;
        expect(value).toBe('defaultValue');
        expect(onChangeSpy).not.toHaveBeenCalled();
        act(() => setValue('newValue'));
        [value, setValue] = result.current;
        expect(value).toBe('newValue');
        expect(onChangeSpy).toHaveBeenLastCalledWith('newValue');

        act(() => setValue('newValue2'));
        [value, setValue] = result.current;
        expect(value).toBe('newValue2');
        expect(onChangeSpy).toHaveBeenLastCalledWith('newValue2');

        onChangeSpy.mockClear();

        act(() => setValue('newValue2'));
        [value, setValue] = result.current;
        expect(value).toBe('newValue2');
        expect(onChangeSpy).not.toHaveBeenCalled();

        // it should call onChange with a new but not immediately previously run value
        act(() => setValue('newValue'));
        [value, setValue] = result.current;
        expect(value).toBe('newValue');
        expect(onChangeSpy).toHaveBeenLastCalledWith('newValue');
    });

    it('using NaN will only trigger onChange once', () => {
        const onChangeSpy = jest.fn();
        const {result} = renderHook(() =>
            useControlledState<number | null>(undefined, null, onChangeSpy),
        );
        let [value, setValue] = result.current;
        expect(value).toBeNull();
        expect(onChangeSpy).not.toHaveBeenCalled();
        act(() => setValue(NaN));
        [value, setValue] = result.current;
        expect(value).toBe(NaN);
        expect(onChangeSpy).toHaveBeenCalledTimes(1);
        expect(onChangeSpy).toHaveBeenLastCalledWith(NaN);

        act(() => setValue(NaN));
        [value, setValue] = result.current;
        expect(value).toBe(NaN);
        expect(onChangeSpy).toHaveBeenCalledTimes(1);
    });

    it('does not trigger too many renders', async () => {
        const renderSpy = jest.fn();

        const TestComponent = (props: any) => {
            const [state, setState] = useControlledState(
                props.value,
                props.defaultValue,
                props.onChange,
            );
            React.useEffect(() => renderSpy(), [state]);
            return <button onClick={() => setState(state + 1)} data-qa={state} />;
        };

        const TestComponentWrapper = (props: any) => {
            const [state, setState] = React.useState(props.defaultValue);
            return <TestComponent onChange={(value: any) => setState(value)} value={state} />;
        };

        render(<TestComponentWrapper defaultValue={5} />);
        const button = screen.getByRole('button');
        screen.getByTestId('5');
        expect(renderSpy).toHaveBeenCalledTimes(1);
        await userEvent.click(button);
        screen.getByTestId('6');
        expect(renderSpy).toHaveBeenCalledTimes(2);
    });

    it('can handle controlled setValue behavior', () => {
        const onChangeSpy = jest.fn();
        const {result} = renderHook(() =>
            useControlledState('controlledValue', 'defaultValue', onChangeSpy),
        );
        let [value, setValue] = result.current;
        expect(value).toBe('controlledValue');
        expect(onChangeSpy).not.toHaveBeenCalled();

        act(() => setValue('newValue'));
        [value, setValue] = result.current;
        expect(value).toBe('controlledValue');
        expect(onChangeSpy).toHaveBeenLastCalledWith('newValue');

        onChangeSpy.mockClear();

        act(() => setValue('controlledValue'));
        [value, setValue] = result.current;
        expect(value).toBe('controlledValue');
        expect(onChangeSpy).not.toHaveBeenCalled();
    });

    it('will console error if the programmer tries to switch from controlled to uncontrolled', () => {
        const onChangeSpy = jest.fn();
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        const {result, rerender} = renderHook(
            ({value, defaultValue, onChange}) => useControlledState(value, defaultValue, onChange),
            {
                initialProps: {
                    value: 'controlledValue',
                    defaultValue: 'defaultValue',
                    onChange: onChangeSpy,
                },
            },
        );
        const [value] = result.current;
        expect(value).toBe('controlledValue');
        expect(onChangeSpy).not.toHaveBeenCalled();
        // @ts-expect-error
        rerender({value: undefined, defaultValue: 'defaultValue', onChange: onChangeSpy});
        expect(consoleErrorSpy).toHaveBeenLastCalledWith(
            '[useControlledState] A component changed from controlled to uncontrolled.',
        );
    });

    it('will console error if the programmer tries to switch from uncontrolled to controlled', () => {
        const onChangeSpy = jest.fn();
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        const {result, rerender} = renderHook(
            ({value, defaultValue, onChange}) => useControlledState(value, defaultValue, onChange),
            {
                initialProps: {
                    value: undefined,
                    defaultValue: 'defaultValue',
                    onChange: onChangeSpy,
                },
            },
        );
        const [value] = result.current;
        expect(value).toBe('defaultValue');
        expect(onChangeSpy).not.toHaveBeenCalled();
        // @ts-expect-error
        rerender({value: 'controlledValue', defaultValue: 'defaultValue', onChange: onChangeSpy});
        expect(consoleErrorSpy).toHaveBeenLastCalledWith(
            '[useControlledState] A component changed from uncontrolled to controlled.',
        );
    });

    it('should work with suspense when controlled', async () => {
        const AsyncChild = React.lazy(() => new Promise(() => {}));
        function Test(props: any) {
            const [value, setValue] = React.useState(1);
            const [showChild, setShowChild] = React.useState(false);

            return (
                <React.Fragment>
                    <TransitionButton
                        onClick={() => {
                            setValue(3);
                            setShowChild(true);
                        }}
                    />
                    <Child
                        value={value}
                        onChange={(v: any) => {
                            setValue(v);
                            props.onChange(v);
                        }}
                    />
                    {showChild && <AsyncChild />}
                </React.Fragment>
            );
        }

        function Child(props: any) {
            const [value, setValue] = useControlledState(
                props.value,
                props.defaultValue,
                props.onChange,
            );
            return (
                <button data-qa="value" onClick={() => setValue(value + 1)}>
                    {value}
                </button>
            );
        }

        function TransitionButton({onClick}: any) {
            const [isPending, startTransition] = React.useTransition();
            return (
                <button
                    data-qa="show"
                    onClick={() => {
                        startTransition(() => {
                            onClick();
                        });
                    }}
                >
                    {isPending ? 'Loading' : 'Show'}
                </button>
            );
        }

        const onChange = jest.fn();
        render(<Test onChange={onChange} />);
        const value = screen.getByTestId('value');
        const show = screen.getByTestId('show');

        expect(value).toHaveTextContent('1');
        await userEvent.click(value);

        // Clicking the button should update the value as normal.
        expect(value).toHaveTextContent('2');
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenLastCalledWith(2);

        // Clicking the show button starts a transition. The new value of 3
        // will be thrown away by React since the component suspended.
        expect(show).toHaveTextContent('Show');
        await userEvent.click(show);
        expect(show).toHaveTextContent('Loading');
        expect(value).toHaveTextContent('2');

        // Since the previous render was thrown away, the current value shown
        // to the user is still 2. Clicking the button should bump it to 3 again.
        await userEvent.click(value);
        expect(value).toHaveTextContent('3');
        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange).toHaveBeenLastCalledWith(3);
    });

    it('should work with suspense when uncontrolled', async () => {
        let resolve: any;
        const AsyncChild = React.lazy(
            () =>
                new Promise((r) => {
                    resolve = r;
                }),
        );
        function Test(props: any) {
            const [value, setValue] = useControlledState<number>(undefined, 1, props.onChange);
            const [showChild, setShowChild] = React.useState(false);
            const [isPending, startTransition] = React.useTransition();

            return (
                <React.Fragment>
                    <button
                        data-qa="value"
                        onClick={() => {
                            startTransition(() => {
                                setValue(value + 1);
                                setShowChild(true);
                            });
                        }}
                    >
                        {value}
                        {isPending ? ' (Loading)' : ''}
                    </button>
                    {showChild && <AsyncChild />}
                </React.Fragment>
            );
        }

        function LoadedComponent() {
            return <div>Hello</div>;
        }

        const onChange = jest.fn();
        render(<Test onChange={onChange} />);
        const value = screen.getByTestId('value');

        expect(value).toHaveTextContent('1');
        await userEvent.click(value);

        // React aborts the render, so the value stays at 1.
        expect(value).toHaveTextContent('1 (Loading)');
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenLastCalledWith(2);

        // Attempting to change the value will be aborted again.
        await userEvent.click(value);
        expect(value).toHaveTextContent('1 (Loading)');
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenLastCalledWith(2);

        // Now resolve the suspended component.
        // Value should now update to the latest one.
        resolve!({default: LoadedComponent});
        await act(() => Promise.resolve());
        expect(value).toHaveTextContent('2');

        // Now incrementing works again.
        await userEvent.click(value);
        expect(value).toHaveTextContent('3');
        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange).toHaveBeenLastCalledWith(3);
    });
});
