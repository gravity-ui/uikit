import * as React from 'react';

import * as tabbable from 'tabbable';

import {fireEvent} from '../../../../../test-utils/utils';
import {List} from '../List';
import type {ListItemContext, ListItemViewStateProps, ListProps} from '../types';
import {useListFocusOwner} from '../useListFocusOwner';

export const FRUITS = ['Apple', 'Banana', 'Cherry', 'Melon'];

export interface Project {
    id: string;
    name: string;
    disabled?: boolean;
}

export const PROJECTS: Project[] = [
    {id: 'p1', name: 'Alpha'},
    {id: 'p2', name: 'Beta', disabled: true},
    {id: 'p3', name: 'Gamma'},
];

export const GROUPS = [
    {id: 'recent', label: 'Recent', children: [{id: 'r1', label: 'First'}]},
    {
        id: 'all',
        label: 'All',
        children: [
            {id: 'a1', label: 'Second'},
            {id: 'a2', label: 'Third'},
        ],
    },
];

const realFocusable = tabbable.focusable;
const realTabbable = tabbable.tabbable;

/** jsdom has no layout: without this focusable()/tabbable() see every element as hidden */
export function mockTabbableDisplayCheck() {
    let focusableSpy: jest.SpyInstance;
    let tabbableSpy: jest.SpyInstance;

    beforeAll(() => {
        focusableSpy = jest
            .spyOn(tabbable, 'focusable')
            .mockImplementation((container, options) =>
                realFocusable(container, {...options, displayCheck: 'none'}),
            );
        tabbableSpy = jest
            .spyOn(tabbable, 'tabbable')
            .mockImplementation((container, options) =>
                realTabbable(container, {...options, displayCheck: 'none'}),
            );
    });

    afterAll(() => {
        focusableSpy.mockRestore();
        tabbableSpy.mockRestore();
    });
}

/** jsdom has no layout: the sizes tanstack reads through offsetHeight/offsetWidth (a row wrapper answers for its row) */
export function mockLayout({
    viewport,
    row,
    section = row,
}: {
    viewport: number;
    row: number;
    section?: number;
}) {
    let offsetHeightSpy: jest.SpyInstance;
    let offsetWidthSpy: jest.SpyInstance;

    beforeEach(() => {
        offsetHeightSpy = jest
            .spyOn(HTMLElement.prototype, 'offsetHeight', 'get')
            .mockImplementation(function (this: HTMLElement) {
                const role = this.getAttribute('role');
                if (role === 'listbox' || role === 'grid') {
                    return viewport;
                }
                const inner = this.hasAttribute('data-index') ? this.firstElementChild : null;
                return inner?.getAttribute('role') === 'presentation' ? section : row;
            });
        offsetWidthSpy = jest
            .spyOn(HTMLElement.prototype, 'offsetWidth', 'get')
            .mockReturnValue(300);
    });

    afterEach(() => {
        offsetHeightSpy.mockRestore();
        offsetWidthSpy.mockRestore();
    });
}

/** jsdom does not scroll: scrollTop is set directly and the event is fired by hand */
export function scrollTo(element: HTMLElement, top: number) {
    Object.defineProperty(element, 'scrollTop', {configurable: true, writable: true, value: top});
    fireEvent.scroll(element);
}

/** Captures ctx.state and getItemViewProps() of every rendered row */
export function createTracker() {
    const states = new Map<string, ListItemContext<string>['state']>();
    const view = new Map<string, ListItemViewStateProps>();
    const renderItem: ListProps<string>['renderItem'] = (ctx, helpers) => {
        states.set(ctx.id, ctx.state);
        view.set(ctx.id, helpers.getItemViewProps());
        return (
            <List.ItemView {...helpers.getItemProps()} {...helpers.getItemViewProps()}>
                {ctx.content}
            </List.ItemView>
        );
    };
    return {states, view, renderItem};
}

/** An external focus owner: an input outside the list root (a mini combobox) */
export function ComboboxHarness({
    open = true,
    ...listProps
}: {open?: boolean; items: readonly string[]} & Partial<ListProps<string>>) {
    const focusOwner = useListFocusOwner();
    return (
        <React.Fragment>
            <input {...focusOwner.getInputProps({'aria-label': 'Filter'})} />
            {open ? <List aria-label="Options" {...listProps} focusOwner={focusOwner} /> : null}
        </React.Fragment>
    );
}
