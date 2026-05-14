import * as React from 'react';

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

    describe('when rendered inside an iframe (window !== window.parent)', () => {
        let parentFocusInListeners: Array<(e: FocusEvent) => void>;

        const triggerParentFocusIn = () => {
            parentFocusInListeners.forEach((fn) => fn(new FocusEvent('focusin')));
        };

        // In a real browser, when focus crosses document boundaries (iframe → parent window),
        // the iframe's activeElement becomes body BEFORE focusout fires with relatedTarget=null.
        // JSDOM doesn't implement cross-document focus, so we simulate it manually.
        const simulateCrossDocumentBlur = (element: HTMLElement) => {
            const spy = jest.spyOn(document, 'activeElement', 'get').mockReturnValue(document.body);
            element.dispatchEvent(new FocusEvent('focusout', {relatedTarget: null, bubbles: true}));
            spy.mockRestore();
        };

        beforeEach(() => {
            parentFocusInListeners = [];
            const mockParent = {
                addEventListener: (_type: string, fn: EventListenerOrEventListenerObject) => {
                    parentFocusInListeners.push(fn as (e: FocusEvent) => void);
                },
                removeEventListener: (_type: string, fn: EventListenerOrEventListenerObject) => {
                    const idx = parentFocusInListeners.indexOf(fn as (e: FocusEvent) => void);
                    if (idx >= 0) parentFocusInListeners.splice(idx, 1);
                },
            };
            Object.defineProperty(window, 'parent', {
                configurable: true,
                get: () => mockParent,
            });
        });

        afterEach(() => {
            Object.defineProperty(window, 'parent', {
                configurable: true,
                get: () => window,
            });
        });

        it('should handle focus and blur events normally when focus stays in same window', async () => {
            const user = userEvent.setup();
            const events: any[] = [];
            const Component = () => {
                const {focusWithinProps} = useFocusWithin({
                    onFocusWithin: (e) => events.push({type: e.type, target: e.target}),
                    onBlurWithin: (e) => events.push({type: e.type, target: e.target}),
                    onFocusWithinChange: (isFocused) =>
                        events.push({type: 'focuschange', isFocused}),
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

        it('should defer onBlurWithin when focus moves cross-document to a parent-window portal', () => {
            jest.useFakeTimers();
            const onBlurWithin = jest.fn();

            // Represents the popup container rendered in the parent window (e.g. document.body of
            // the parent frame), as if useFocusWithin is used inside an iframe and the popup is
            // portalled to the parent document.
            const parentWindowContainer = document.createElement('div');
            document.body.appendChild(parentWindowContainer);

            const Component = () => {
                const [open, setOpen] = React.useState(false);
                const {focusWithinProps} = useFocusWithin({onBlurWithin});
                return (
                    <div {...focusWithinProps}>
                        <button data-qa="trigger" onClick={() => setOpen(true)} />
                        {open &&
                            ReactDom.createPortal(
                                <input data-qa="popup-input" />,
                                parentWindowContainer,
                            )}
                    </div>
                );
            };

            render(<Component />);
            const trigger = screen.getByTestId('trigger');

            act(() => {
                trigger.focus();
            });
            act(() => {
                trigger.click(); // open popup in "parent window"
            });

            // Moving focus cross-document fires focusout with relatedTarget=null on the
            // iframe element; activeElement switches to body before the event fires.
            act(() => {
                simulateCrossDocumentBlur(trigger);
            });

            // Not fired yet — deferred until the setTimeout resolves
            expect(onBlurWithin).not.toHaveBeenCalled();

            act(() => {
                jest.runAllTimers();
            });

            expect(onBlurWithin).toHaveBeenCalledTimes(1);

            document.body.removeChild(parentWindowContainer);
            jest.useRealTimers();
        });

        it('should cancel deferred blur and fire exactly once when parent-window focusin fires', () => {
            jest.useFakeTimers();
            const onBlurWithin = jest.fn();

            const parentWindowContainer = document.createElement('div');
            document.body.appendChild(parentWindowContainer);

            const Component = () => {
                const [open, setOpen] = React.useState(false);
                const {focusWithinProps} = useFocusWithin({onBlurWithin});
                return (
                    <div {...focusWithinProps}>
                        <button data-qa="trigger" onClick={() => setOpen(true)} />
                        {open &&
                            ReactDom.createPortal(
                                <input data-qa="popup-input" />,
                                parentWindowContainer,
                            )}
                    </div>
                );
            };

            render(<Component />);
            const trigger = screen.getByTestId('trigger');

            act(() => {
                trigger.focus();
            });
            act(() => {
                trigger.click();
            });

            // Cross-document focusout starts the deferred blur
            act(() => {
                trigger.dispatchEvent(
                    new FocusEvent('focusout', {relatedTarget: null, bubbles: true}),
                );
            });

            expect(onBlurWithin).not.toHaveBeenCalled();

            // The popup input in the parent window gets focus → window.parent fires focusin
            act(() => {
                triggerParentFocusIn();
            });

            // Deferred timer was cancelled; blur fires once via handleParentFocusIn
            expect(onBlurWithin).toHaveBeenCalledTimes(1);

            act(() => {
                jest.runAllTimers();
            });

            // No second call from the cancelled timer
            expect(onBlurWithin).toHaveBeenCalledTimes(1);

            document.body.removeChild(parentWindowContainer);
            jest.useRealTimers();
        });
    });
});
