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

// ---------------------------------------------------------------------------
// ThemeProvider integration
// ---------------------------------------------------------------------------

describe('ThemeProvider defaultProps', () => {
    function Consumer({name, props}: {name: Parameters<typeof useDefaultProps>[0]; props: object}) {
        const merged = useDefaultProps(name, props);
        return <output title={name}>{JSON.stringify(merged)}</output>;
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
