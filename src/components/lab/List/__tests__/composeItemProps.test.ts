import type * as React from 'react';

import {composeItemProps} from '../composeItemProps';

type Props = React.HTMLAttributes<HTMLElement> & {ref?: React.Ref<HTMLElement>};

// Контракт композиции props из getItemProps (§4.4 плана): на него опираются
// слои виртуализации (style/ref) и dnd (props/ref) — менять только аддитивно
describe('composeItemProps', () => {
    it('returns base props untouched without overrides', () => {
        const base: Props = {role: 'option', tabIndex: 0};
        expect(composeItemProps(base)).toBe(base);
    });

    it('chains on*-handlers: override is called after base', () => {
        const calls: string[] = [];
        const base: Props = {
            onClick: () => {
                calls.push('base');
            },
        };
        const composed = composeItemProps(base, {
            onClick: () => {
                calls.push('override');
            },
        });

        composed.onClick?.({} as React.MouseEvent<HTMLElement>);

        expect(calls).toEqual(['base', 'override']);
    });

    it('keeps base handler when override does not define one', () => {
        const baseHandler = jest.fn();
        const base: Props = {onClick: baseHandler};
        const composed = composeItemProps(base, {tabIndex: -1});

        composed.onClick?.({} as React.MouseEvent<HTMLElement>);

        expect(baseHandler).toHaveBeenCalledTimes(1);
    });

    it('concatenates className', () => {
        expect(composeItemProps({className: 'base'}, {className: 'override'}).className).toBe(
            'base override',
        );
    });

    it('forks ref: both refs receive the node', () => {
        const baseRef = jest.fn();
        const overrideRefObject: React.MutableRefObject<HTMLElement | null> = {current: null};
        const base: Props = {ref: baseRef, role: 'option'};
        const composed = composeItemProps(base, {ref: overrideRefObject});

        const node = document.createElement('div');
        (composed.ref as React.RefCallback<HTMLElement>)(node);

        expect(baseRef).toHaveBeenCalledWith(node);
        expect(overrideRefObject.current).toBe(node);
    });

    it('keeps the only ref when the other side has none', () => {
        const overrideRef = jest.fn();
        const base: Props = {role: 'option'};
        const composed = composeItemProps(base, {ref: overrideRef});

        expect(composed.ref).toBe(overrideRef);
    });

    it('ignores keys with an explicit undefined value in overrides', () => {
        const baseRef = jest.fn();
        const base: Props = {ref: baseRef, id: 'base', style: {top: 1}, tabIndex: 0};
        const composed = composeItemProps(base, {
            ref: undefined,
            id: undefined,
            style: undefined,
            tabIndex: undefined,
        });

        expect(composed.ref).toBe(baseRef);
        expect(composed.id).toBe('base');
        expect(composed.style).toEqual({top: 1});
        expect(composed.tabIndex).toBe(0);
    });

    it('uses the provided forkRef to compose refs', () => {
        const baseRef = jest.fn();
        const overrideRef = jest.fn();
        const forked = jest.fn();
        const forkRef = jest.fn(() => forked);
        const base: Props = {ref: baseRef};

        const composed = composeItemProps(base, {ref: overrideRef}, {forkRef});

        expect(forkRef).toHaveBeenCalledWith(baseRef, overrideRef);
        expect(composed.ref).toBe(forked);
    });

    it('shallow-merges style: override keys win, base keys are preserved', () => {
        const base: Props = {style: {position: 'absolute', top: 8, color: 'red'}};
        const composed = composeItemProps(base, {style: {color: 'blue'}});

        expect(composed.style).toEqual({position: 'absolute', top: 8, color: 'blue'});
    });

    it('keeps override style as is when base has none', () => {
        const base: Props = {role: 'option'};
        const composed = composeItemProps(base, {style: {top: 4}});

        expect(composed.style).toEqual({top: 4});
    });

    it('last one wins for plain attributes', () => {
        const base: Props = {tabIndex: 0, id: 'base'};
        const composed = composeItemProps(base, {tabIndex: -1});

        expect(composed.tabIndex).toBe(-1);
        expect(composed.id).toBe('base');
    });
});
