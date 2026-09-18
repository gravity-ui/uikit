import * as React from 'react';

import {render, renderHook, screen} from '../../../../test-utils/utils';
import {PasswordInput} from '../../controls/PasswordInput';
import {PasswordInputQa} from '../../controls/PasswordInput/constants';
import type {DefaultPropsProviderProps} from '../DefaultPropsProvider';
import {DefaultPropsProvider} from '../DefaultPropsProvider';
import {ThemeProvider} from '../ThemeProvider';
import {useDefaultProps} from '../useDefaultProps';

function makeWrapper(defaultProps: DefaultPropsProviderProps['defaultProps']) {
    return function Wrapper({children}: {children: React.ReactNode}) {
        return <DefaultPropsProvider defaultProps={defaultProps}>{children}</DefaultPropsProvider>;
    };
}

function Consumer({name, props}: {name: Parameters<typeof useDefaultProps>[0]; props: object}) {
    const merged = useDefaultProps(name, props);
    return <output title={name}>{JSON.stringify(merged)}</output>;
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

        it('use prop set to undefined does not override defaults', () => {
            const {result} = renderHook(
                () => useDefaultProps('Button', {view: undefined, size: 'm'}),
                {wrapper: makeWrapper({Button: {view: 'outlined', size: 'l'}})},
            );
            expect(result.current).toEqual({view: 'outlined', size: 'm'});
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
});

describe('DefaultPropsProvider', () => {
    it('passes inherited defaults through when defaultProps is omitted', () => {
        const wrapper = ({children}: {children: React.ReactNode}) => (
            <DefaultPropsProvider defaultProps={{Button: {view: 'outlined'}}}>
                <DefaultPropsProvider>{children}</DefaultPropsProvider>
            </DefaultPropsProvider>
        );
        const {result} = renderHook(() => useDefaultProps('Button', {}), {wrapper});

        expect(result.current).toEqual({view: 'outlined'});
    });

    it('merges nested providers by component and replaces defaults for the same component', () => {
        const wrapper = ({children}: {children: React.ReactNode}) => (
            <DefaultPropsProvider
                defaultProps={{Button: {view: 'outlined', size: 'l'}, Checkbox: {size: 'l'}}}
            >
                <DefaultPropsProvider defaultProps={{Button: {view: 'action'}}}>
                    {children}
                </DefaultPropsProvider>
            </DefaultPropsProvider>
        );
        const {result} = renderHook(
            () => ({
                button: useDefaultProps('Button', {}),
                checkbox: useDefaultProps('Checkbox', {}),
            }),
            {wrapper},
        );

        expect(result.current.button).toEqual({view: 'action'});
        expect(result.current.checkbox).toEqual({size: 'l'});
    });

    it('merges defaults when nested inside ThemeProvider', () => {
        render(
            <ThemeProvider
                defaultProps={{Button: {view: 'outlined', size: 'l'}, Checkbox: {size: 'l'}}}
            >
                <DefaultPropsProvider defaultProps={{Button: {view: 'action'}}}>
                    <Consumer name="Button" props={{}} />
                    <Consumer name="Checkbox" props={{}} />
                </DefaultPropsProvider>
            </ThemeProvider>,
        );

        expect(JSON.parse(screen.getByTitle('Button').textContent ?? '{}')).toEqual({
            view: 'action',
        });
        expect(JSON.parse(screen.getByTitle('Checkbox').textContent ?? '{}')).toEqual({
            size: 'l',
        });
    });

    it('merges defaults when wrapping ThemeProvider', () => {
        render(
            <DefaultPropsProvider
                defaultProps={{Button: {view: 'outlined', size: 'l'}, Checkbox: {size: 'l'}}}
            >
                <ThemeProvider defaultProps={{Button: {view: 'action'}}}>
                    <Consumer name="Button" props={{}} />
                    <Consumer name="Checkbox" props={{}} />
                </ThemeProvider>
            </DefaultPropsProvider>,
        );

        expect(JSON.parse(screen.getByTitle('Button').textContent ?? '{}')).toEqual({
            view: 'action',
        });
        expect(JSON.parse(screen.getByTitle('Checkbox').textContent ?? '{}')).toEqual({
            size: 'l',
        });
    });

    it('applies TextInput defaults consistently to PasswordInput and its action button', () => {
        render(
            <DefaultPropsProvider defaultProps={{TextInput: {size: 'l'}}}>
                <PasswordInput qa="password-input" />
            </DefaultPropsProvider>,
        );

        expect(screen.getByTestId('password-input')).toHaveClass('g-text-input_size_l');
        expect(screen.getByTestId(PasswordInputQa.revealButton)).toHaveClass('g-button_size_m');
    });
});

describe('ThemeProvider defaultProps', () => {
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

    it('inner ThemeProvider defaultProps correctly override outer', () => {
        render(
            <ThemeProvider
                defaultProps={{Button: {view: 'outlined', size: 'l'}, Checkbox: {size: 'l'}}}
            >
                <ThemeProvider defaultProps={{Button: {view: 'action'}}}>
                    <Consumer name="Button" props={{}} />
                    <Consumer name="Checkbox" props={{}} />
                </ThemeProvider>
            </ThemeProvider>,
        );
        // Inner ThemeProvider provides replaces props per component not the whole context
        expect(JSON.parse(screen.getByTitle('Button').textContent ?? '{}')).toEqual({
            view: 'action',
        });
        expect(JSON.parse(screen.getByTitle('Checkbox').textContent ?? '{}')).toEqual({
            size: 'l',
        });
    });
});
