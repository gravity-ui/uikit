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
 * External owner of the list DOM focus (a combobox input or a select-only trigger): the owner
 * takes `getInputProps()`, the list takes the object as `focusOwner`. `aria-expanded` = a list
 * is connected; one owner per list; a hidden-but-mounted list is not supported (see README
 * "useListFocusOwner")
 */
export function useListFocusOwner(): ListFocusOwner {
    const [state, setState] = React.useState<OwnerState>(DISCONNECTED);
    // The owner object is created once — getInputProps sees the current state through the ref
    const stateRef = React.useRef(state);
    stateRef.current = state;
    // Recreated by the core every render: kept in state, publishing it would loop
    const keyDownRef = React.useRef<ListFocusOwnerConnection['onKeyDown'] | null>(null);
    // Synchronous trace of the connected list (state lags by a commit) — for the dev warning only
    const connectedListIdRef = React.useRef<string | undefined>(undefined);

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
