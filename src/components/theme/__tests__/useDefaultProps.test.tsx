import * as React from 'react';

import {render, renderHook, screen} from '../../../../test-utils/utils';
import {PrivateDefaultPropsProvider} from '../PrivateDefaultPropsProvider';
import {ThemeProvider} from '../ThemeProvider';
import {useDefaultProps} from '../useDefaultProps';

function makeWrapper(value: React.ComponentProps<typeof PrivateDefaultPropsProvider>['value']) {
    return function Wrapper({children}: {children: React.ReactNode}) {
        return <PrivateDefaultPropsProvider value={value}>{children}</PrivateDefaultPropsProvider>;
    };
}

describe('useDefaultProps', () => {
    describe('without a provider', () => {
        it('returns props unchanged when no provider is present', () => {
            const props = {view: 'normal' as const, size: 'm' as const};
            const {result} = renderHook(() => useDefaultProps('Button', props));
            expect(result.current).toBe(props);
        });
    });

    describe('with a provider but no defaults for the component', () => {
        it('returns props unchanged when provider has no entry for the component', () => {
            const props = {view: 'normal' as const};
            const {result} = renderHook(() => useDefaultProps('Button', props), {
                wrapper: makeWrapper({TextInput: {size: 'l'}}),
            });
            expect(result.current).toBe(props);
        });

        it('returns props unchanged when provider value is empty', () => {
            const props = {size: 'm' as const};
            const {result} = renderHook(() => useDefaultProps('TextInput', props), {
                wrapper: makeWrapper({}),
            });
            expect(result.current).toBe(props);
        });
    });

    describe('prop merging priority', () => {
        it('applies context defaults when component receives no props', () => {
            const {result} = renderHook(() => useDefaultProps('Button', {}), {
                wrapper: makeWrapper({Button: {view: 'outlined', size: 'l'}}),
            });
            expect(result.current).toEqual({view: 'outlined', size: 'l'});
        });

        it('user props override context defaults', () => {
            const {result} = renderHook(
                () => useDefaultProps('Button', {view: 'normal', size: 'm'}),
                {wrapper: makeWrapper({Button: {view: 'outlined', size: 'l'}})},
            );
            expect(result.current).toEqual({view: 'normal', size: 'm'});
        });

        it('only overridden props win — unset props use context defaults', () => {
            const {result} = renderHook(() => useDefaultProps('Button', {size: 'm'}), {
                wrapper: makeWrapper({Button: {view: 'outlined', size: 'l'}}),
            });
            expect(result.current).toEqual({view: 'outlined', size: 'm'});
        });

        it('does not leak defaults from one component to another', () => {
            const props = {size: 'm' as const};
            const {result} = renderHook(() => useDefaultProps('TextInput', props), {
                wrapper: makeWrapper({Button: {view: 'outlined'}}),
            });
            expect(result.current).toBe(props);
        });
    });

    describe('event handler merging', () => {
        it('chains context default handler with user handler', () => {
            const defaultHandler = jest.fn();
            const userHandler = jest.fn();

            const {result} = renderHook(() => useDefaultProps('Button', {onClick: userHandler}), {
                // @ts-expect-error
                wrapper: makeWrapper({Button: {onClick: defaultHandler}}),
            });

            (result.current as {onClick: () => void}).onClick();

            expect(defaultHandler).toHaveBeenCalledTimes(1);
            expect(userHandler).toHaveBeenCalledTimes(1);
        });

        it('calls only the user handler when no default handler is set', () => {
            const userHandler = jest.fn();

            const {result} = renderHook(() => useDefaultProps('Button', {onClick: userHandler}), {
                wrapper: makeWrapper({Button: {size: 'l'}}),
            });

            (result.current as {onClick: () => void}).onClick();

            expect(userHandler).toHaveBeenCalledTimes(1);
        });
    });

    describe('className merging', () => {
        it('concatenates className from context defaults and user props', () => {
            const {result} = renderHook(() => useDefaultProps('Button', {className: 'user'}), {
                wrapper: makeWrapper({Button: {className: 'default'}}),
            });
            expect((result.current as {className: string}).className).toBe('default user');
        });

        it('uses only context className when user does not pass className', () => {
            const {result} = renderHook(() => useDefaultProps('Button', {}), {
                wrapper: makeWrapper({Button: {className: 'default'}}),
            });
            expect((result.current as {className: string}).className).toBe('default');
        });
    });
});

// ---------------------------------------------------------------------------
// ThemeProvider integration
// ---------------------------------------------------------------------------

describe('ThemeProvider defaultProps', () => {
    function Consumer({name, props}: {name: Parameters<typeof useDefaultProps>[0]; props: object}) {
        const merged = useDefaultProps(name, props);
        return <output>{JSON.stringify(merged)}</output>;
    }

    it('passes defaultProps through to useDefaultProps', () => {
        render(
            <ThemeProvider defaultProps={{Button: {view: 'outlined', size: 'l'}}}>
                <Consumer name="Button" props={{size: 'm'}} />
            </ThemeProvider>,
        );
        expect(JSON.parse(screen.getByRole('status').textContent ?? '{}')).toEqual({
            view: 'outlined',
            size: 'm',
        });
    });

    it('does not affect components with no entry in defaultProps', () => {
        render(
            <ThemeProvider defaultProps={{Button: {view: 'outlined'}}}>
                <Consumer name="TextInput" props={{size: 's'}} />
            </ThemeProvider>,
        );
        expect(JSON.parse(screen.getByRole('status').textContent ?? '{}')).toEqual({size: 's'});
    });

    it('works correctly when defaultProps is omitted', () => {
        render(
            <ThemeProvider>
                <Consumer name="Button" props={{view: 'normal'}} />
            </ThemeProvider>,
        );
        expect(JSON.parse(screen.getByRole('status').textContent ?? '{}')).toEqual({
            view: 'normal',
        });
    });

    it('inner ThemeProvider defaultProps override outer', () => {
        render(
            <ThemeProvider defaultProps={{Button: {view: 'outlined', size: 'l'}}}>
                <ThemeProvider defaultProps={{Button: {view: 'action'}}}>
                    <Consumer name="Button" props={{}} />
                </ThemeProvider>
            </ThemeProvider>,
        );
        // Inner ThemeProvider provides a fresh context — its value completely replaces the outer
        expect(JSON.parse(screen.getByRole('status').textContent ?? '{}')).toEqual({
            view: 'action',
        });
    });
});
