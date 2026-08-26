'use client';

import * as React from 'react';

import {warnOnce} from '../../utils/warn';

import {composeItemProps} from './composeItemProps';
import type {ListFocusOwnerConnection} from './focusOwnerChannel';
import {LIST_FOCUS_OWNER_CHANNEL} from './focusOwnerChannel';
import type {ListFocusOwner, ListFocusOwnerInputProps} from './types';

interface OwnerState {
    listId?: string;
    activeDomId?: string;
}

const DISCONNECTED: OwnerState = {};

/**
 * The channel of the external owner of the list DOM focus.
 *
 * The keyboard machinery of the list (step "a") is one and the same in both
 * strategies — only step "b" changes: in `activedescendant` the core does not
 * move DOM focus but sets `aria-activedescendant` on the owner and scrolls the
 * active row into view. The focus owner (the input of a combobox, or the
 * trigger button of a select-only one) lives OUTSIDE the list root, so the
 * connection travels to it through this channel rather than through
 * `getItemProps`: the hook returns `getInputProps()` for the owner element —
 * the props are element-agnostic, an `<input>` and a `<button>` take the same
 * ones — and the object itself goes to the list as the `focusOwner` prop.
 *
 * ```tsx
 * const focusOwner = useListFocusOwner();
 * <TextInput controlProps={focusOwner.getInputProps({'aria-label': 'Filter'})} />
 * {open ? <List focusOwner={focusOwner} items={filtered} /> : null}
 * ```
 *
 * `aria-expanded` is derived from the list being connected: while no `<List>`
 * with this owner is mounted, the popup is closed. The channel is designed for
 * the mount/unmount model of a popup — a list left mounted and hidden with
 * styles is indistinguishable from an open one for the channel: the arrows
 * would keep moving the activity in an invisible popup and `aria-expanded`
 * would stay `true` (keepMounted is not supported). For non-popup patterns (a
 * permanently visible filterable list) `role`/`aria-expanded` are overridden
 * through the overrides of `getInputProps` — by the composition contract the
 * last value wins.
 *
 * One owner — one list: two lists mounted at the same time need two objects.
 */
export function useListFocusOwner(): ListFocusOwner {
    const [state, setState] = React.useState<OwnerState>(DISCONNECTED);
    // getInputProps reads the connection during the owner's render, while the
    // core updates it from its own layout effect — the ref holds a value that
    // is current even before the owner re-renders
    const stateRef = React.useRef(state);
    stateRef.current = state;
    // The handler is recreated by the core on every render: were it kept in
    // state, publishing it would loop on its own re-render
    const keyDownRef = React.useRef<ListFocusOwnerConnection['onKeyDown'] | null>(null);
    // A synchronous trace of the connected list (state lags by a commit) —
    // for the dev warning about two lists sharing one owner only
    const connectedListIdRef = React.useRef<string | undefined>(undefined);

    // The identity of the owner is stable: it is a dependency of the
    // publishing effect on the core's side
    const [owner] = React.useState<ListFocusOwner>(() => ({
        getInputProps(overrides) {
            const {listId, activeDomId} = stateRef.current;
            const baseProps = {
                role: 'combobox',
                'aria-expanded': listId !== undefined,
                'aria-controls': listId,
                'aria-activedescendant': activeDomId,
                onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
                    keyDownRef.current?.(event);
                },
            };
            return composeItemProps(baseProps, overrides) as ListFocusOwnerInputProps;
        },
        [LIST_FOCUS_OWNER_CHANNEL]: {
            connect({listId, activeDomId, onKeyDown}) {
                if (
                    process.env.NODE_ENV !== 'production' &&
                    connectedListIdRef.current !== undefined &&
                    connectedListIdRef.current !== listId
                ) {
                    warnOnce(
                        '[List] Two mounted lists share one `useListFocusOwner()` object. The channel connects a single list at a time — the last connected list wins, and the other one silently loses the keyboard and aria wiring. Create a separate owner per list.',
                    );
                }
                connectedListIdRef.current = listId;
                keyDownRef.current = onKeyDown;
                setState((prev) =>
                    prev.listId === listId && prev.activeDomId === activeDomId
                        ? prev
                        : {listId, activeDomId},
                );
            },
            disconnect() {
                connectedListIdRef.current = undefined;
                keyDownRef.current = null;
                setState((prev) => (prev === DISCONNECTED ? prev : DISCONNECTED));
            },
        },
    }));

    return owner;
}
