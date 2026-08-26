import type * as React from 'react';

/**
 * The module-private key of the channel between `<List>` and
 * `useListFocusOwner()`. The symbol is not exported from the package: the
 * public `ListFocusOwner` type exposes `getInputProps` only, while the
 * internal connect/disconnect protocol is available to the core alone
 */
export const LIST_FOCUS_OWNER_CHANNEL: unique symbol = Symbol('gravity-ui/list-focus-owner');

/**
 * The connection the core publishes to the external focus owner.
 *  The channel is owned by `useListFocusOwner`, the core only publishes into it
 */
export interface ListFocusOwnerConnection {
    /** The DOM id of the list root — the target of the owner's `aria-controls` */
    listId: string;
    /** The DOM id of the active row — the value of the owner's `aria-activedescendant` */
    activeDomId?: string;
    /** The keyboard machinery of the list (step "a"): the owner hands its onKeyDown over to it */
    onKeyDown(event: React.KeyboardEvent<HTMLElement>): void;
}

/**
 * The core channel: publishing the connection and disconnecting on unmount
 * @internal
 */
export interface ListFocusOwnerChannel {
    connect(connection: ListFocusOwnerConnection): void;
    /** The list has unmounted — the popup is closed */
    disconnect(): void;
}
