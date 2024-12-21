import userEvent from '@testing-library/user-event';
import ReactDom from 'react-dom';

import {act, render, screen, waitFor} from '../../../test-utils/utils';

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
                    <button {...focusWithinProps} data-qa="btn-1" />
                    <button data-qa="btn-2" />
                </div>
            );
        };

        render(<Component />);

        const button = screen.getByTestId('btn-1');

        await user.tab();
        expect(button).toHaveFocus();

        await user.tab();
        expect(screen.getByTestId('btn-2')).toHaveFocus();

        expect(events).toEqual([
            {type: 'focus', target: button},
            {type: 'focuschange', isFocused: true},
            {type: 'blur', target: button},
            {type: 'focuschange', isFocused: false},
        ]);
    });

    it('should handle focus events on children', async () => {
        const events: any[] = [];
        const Component = () => {
            const {focusWithinProps} = useFocusWithin({
                onFocusWithin: (e) => events.push({type: e.type, target: e.target}),
                onBlurWithin: (e) => events.push({type: e.type, target: e.target}),
                onFocusWithinChange: (isFocused) => events.push({type: 'focuschange', isFocused}),
            });

            return (
                <div {...focusWithinProps} tabIndex={-1} data-qa="component">
                    <button />
                </div>
            );
        };

        render(<Component />);

        const el = screen.getByTestId('component');
        const child = screen.getByRole('button');

        act(() => {
            child.focus();
        });

        el.focus();
        child.focus();

        act(() => {
            child.blur();
        });

        expect(events).toEqual([
            {type: 'focus', target: child},
            {type: 'focuschange', isFocused: true},
            {type: 'blur', target: child},
            {type: 'focuschange', isFocused: false},
        ]);
    });

    it('should handle focus events on children within portal', async () => {
        const events: any[] = [];
        const Component = () => {
            const {focusWithinProps} = useFocusWithin({
                onFocusWithin: (e) => events.push({type: e.type, target: e.target}),
                onBlurWithin: (e) => events.push({type: e.type, target: e.target}),
                onFocusWithinChange: (isFocused) => events.push({type: 'focuschange', isFocused}),
            });

            return (
                <div {...focusWithinProps} tabIndex={-1} data-qa="component">
                    {ReactDom.createPortal(<button />, document.body)}
                </div>
            );
        };

        render(<Component />);

        const el = screen.getByTestId('component');
        const child = screen.getByRole('button');

        act(() => {
            child.focus();
        });

        el.focus();
        child.focus();

        act(() => {
            child.blur();
        });

        expect(events).toEqual([
            {type: 'focus', target: child},
            {type: 'focuschange', isFocused: true},
            {type: 'blur', target: child},
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
                    <button data-qa="btn-1" />
                    <button disabled={props.disabled} data-qa="btn-2" />
                </div>
            );
        }

        const {rerender} = render(<Component />);

        await user.tab();
        expect(screen.getByTestId('btn-1')).toHaveFocus();
        await user.tab();
        expect(screen.getByTestId('btn-2')).toHaveFocus();

        expect(onFocus).toHaveBeenCalledTimes(1);
        expect(onBlur).not.toHaveBeenCalled();

        rerender(<Component disabled />);

        await waitFor(() => expect(onBlur).toHaveBeenCalledTimes(1));
        expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it('should not handle focus events if disabled', () => {
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

        act(() => {
            button.focus();
        });

        act(() => {
            button.blur();
        });

        expect(events).toEqual([]);
    });
});
