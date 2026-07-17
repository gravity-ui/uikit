import * as React from 'react';

import userEvent from '@testing-library/user-event';
import ReactDom from 'react-dom';

import {render, screen, waitFor} from '../../../test-utils/utils';

import {useFocusWithin} from './useFocusWithin';

describe('useFocusWithin', () => {
    it('should handle focus events on the target itself', async () => {
        const user = userEvent.setup();

        const events: any[] = [];
        const Component = () => {
            const {focusWithinProps} = useFocusWithin({
                onFocusWithin: (e) => events.push({type: e.type, target: e.target}),
                onBlurWithin: (e) => events.push({type: e.type, target: e.target}),
                onFocusWithinChange: (isFocused) => events.push({type: 'focuschange', isFocused}),
            });

            return <button {...focusWithinProps} />;
        };

        render(<Component />);

        const button = screen.getByRole('button');

        await user.tab();
        expect(button).toHaveFocus();

        await user.tab();
        expect(button).not.toHaveFocus();

        expect(events).toEqual([
            {type: 'focus', target: button},
            {type: 'focuschange', isFocused: true},
            {type: 'blur', target: button},
            {type: 'focuschange', isFocused: false},
        ]);
    });

    it('should handle focus events on the target itself with click outside', async () => {
        const user = userEvent.setup();

        const events: any[] = [];
        const Component = () => {
            const {focusWithinProps} = useFocusWithin({
                onFocusWithin: (e) => events.push({type: e.type, target: e.target}),
                onBlurWithin: (e) => events.push({type: e.type, target: e.target}),
                onFocusWithinChange: (isFocused) => events.push({type: 'focuschange', isFocused}),
            });

            return <button {...focusWithinProps} />;
        };

        render(<Component />);

        const button = screen.getByRole('button');

        await user.tab();
        await user.click(document.body);

        expect(events).toEqual([
            {type: 'focus', target: button},
            {type: 'focuschange', isFocused: true},
            {type: 'blur', target: button},
            {type: 'focuschange', isFocused: false},
        ]);
    });

    it('should handle focus events on the target itself with focus next element', async () => {
        const user = userEvent.setup();

        const events: any[] = [];
        const Component = () => {
            const {focusWithinProps} = useFocusWithin({
                onFocusWithin: (e) => events.push({type: e.type, target: e.target}),
                onBlurWithin: (e) => events.push({type: e.type, target: e.target}),
                onFocusWithinChange: (isFocused) => events.push({type: 'focuschange', isFocused}),
            });

            return (
                <div>
                    <button {...focusWithinProps}>first</button>
                    <button>second</button>
                </div>
            );
        };

        render(<Component />);

        const button = screen.getByRole('button', {name: 'first'});

        await user.tab();
        expect(button).toHaveFocus();

        await user.tab();
        expect(screen.getByRole('button', {name: 'second'})).toHaveFocus();

        expect(events).toEqual([
            {type: 'focus', target: button},
            {type: 'focuschange', isFocused: true},
            {type: 'blur', target: button},
            {type: 'focuschange', isFocused: false},
        ]);
    });

    it('should handle focus events on children', async () => {
        const user = userEvent.setup();

        const events: any[] = [];
        const Component = () => {
            const {focusWithinProps} = useFocusWithin({
                onFocusWithin: (e) =>
                    events.push({type: e.type, target: e.target, currentTarget: e.currentTarget}),
                onBlurWithin: (e) => {
                    events.push({type: e.type, target: e.target, currentTarget: e.currentTarget});
                },
                onFocusWithinChange: (isFocused) => events.push({type: 'focuschange', isFocused}),
            });

            return (
                <div>
                    <div {...focusWithinProps} data-qa="container">
                        <button>first</button>
                        <button>second</button>
                    </div>
                    <button>outside</button>
                </div>
            );
        };

        render(<Component />);

        const container = screen.getByTestId('container');
        const firstButton = screen.getByRole('button', {name: 'first'});
        const secondButton = screen.getByRole('button', {name: 'second'});
        const outsideButton = screen.getByRole('button', {name: 'outside'});

        await user.tab();
        expect(firstButton).toHaveFocus();

        await user.tab();
        expect(secondButton).toHaveFocus();

        await user.tab();
        expect(outsideButton).toHaveFocus();

        expect(events).toEqual([
            {type: 'focus', target: firstButton, currentTarget: container},
            {type: 'focuschange', isFocused: true},
            {type: 'blur', target: secondButton, currentTarget: container},
            {type: 'focuschange', isFocused: false},
        ]);
    });

    it('should handle focus events on children within portal', async () => {
        const user = userEvent.setup();
        const events: any[] = [];
        const Component = () => {
            const {focusWithinProps} = useFocusWithin({
                onFocusWithin: (e) =>
                    events.push({type: e.type, target: e.target, currentTarget: e.currentTarget}),
                onBlurWithin: (e) => {
                    events.push({type: e.type, target: e.target, currentTarget: e.currentTarget});
                },
                onFocusWithinChange: (isFocused) => events.push({type: 'focuschange', isFocused}),
            });

            const [portal, setPortal] = React.useState<HTMLDivElement | null>(null);

            return (
                <div>
                    <div ref={setPortal} />
                    <div {...focusWithinProps} data-qa="container">
                        {portal
                            ? ReactDom.createPortal(
                                  <div>
                                      <button>first</button>
                                      <button>second</button>
                                  </div>,
                                  portal,
                              )
                            : null}
                    </div>
                    <button>outside</button>
                </div>
            );
        };

        render(<Component />);

        const container = screen.getByTestId('container');
        const firstButton = screen.getByRole('button', {name: 'first'});
        const secondButton = screen.getByRole('button', {name: 'second'});
        const outsideButton = screen.getByRole('button', {name: 'outside'});

        await user.tab();
        expect(firstButton).toHaveFocus();

        await user.tab();
        expect(secondButton).toHaveFocus();

        await user.tab();
        expect(outsideButton).toHaveFocus();

        expect(events).toEqual([
            {type: 'focus', target: firstButton, currentTarget: container},
            {type: 'focuschange', isFocused: true},
            {type: 'blur', target: secondButton, currentTarget: container},
            {type: 'focuschange', isFocused: false},
        ]);
    });

    it('should fire onBlur when a focused element is disabled', async () => {
        const user = userEvent.setup();
        const onFocus = jest.fn();
        const onBlur = jest.fn();

        function Component(props: {disabled?: boolean}) {
            const {focusWithinProps} = useFocusWithin({
                onFocusWithin: onFocus,
                onBlurWithin: onBlur,
            });
            return (
                <div {...focusWithinProps}>
                    <button>first</button>
                    <button disabled={props.disabled}>second</button>
                </div>
            );
        }

        const {rerender} = render(<Component />);

        await user.tab();
        expect(screen.getByRole('button', {name: 'first'})).toHaveFocus();
        await user.tab();
        expect(screen.getByRole('button', {name: 'second'})).toHaveFocus();

        expect(onFocus).toHaveBeenCalledTimes(1);
        expect(onBlur).not.toHaveBeenCalled();

        rerender(<Component disabled />);

        await waitFor(() => expect(onBlur).toHaveBeenCalledTimes(1));
        expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it('should not handle focus events if disabled', async () => {
        const user = userEvent.setup();

        const events: any[] = [];
        const Component = () => {
            const {focusWithinProps} = useFocusWithin({
                isDisabled: true,
                onFocusWithin: (e) => events.push({type: e.type, target: e.target}),
                onBlurWithin: (e) => events.push({type: e.type, target: e.target}),
                onFocusWithinChange: (isFocused) => events.push({type: 'focuschange', isFocused}),
            });

            return <button {...focusWithinProps} />;
        };

        render(<Component />);

        const button = screen.getByRole('button');

        await user.tab();
        expect(button).toHaveFocus();

        await user.tab();
        expect(button).not.toHaveFocus();

        expect(events).toEqual([]);
    });
});
