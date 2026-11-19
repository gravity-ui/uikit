import type * as React from 'react';

/** Module-private key: the public ListFocusOwner exposes getInputProps only */
export const LIST_FOCUS_OWNER_CHANNEL: unique symbol = Symbol('gravity-ui/list-focus-owner');

export interface ListFocusOwnerConnection {
    /** The owner's `aria-controls` */
    listId: string;
    /** The owner's `aria-activedescendant` */
    activeDomId?: string;
    onKeyDown(event: React.KeyboardEvent<HTMLElement>): void;
}

/**
 * The core channel: publishing the connection and disconnecting on unmount
 * @internal
 */
export interface ListFocusOwnerChannel {
    connect(connection: ListFocusOwnerConnection): void;
    disconnect(): void;
}
