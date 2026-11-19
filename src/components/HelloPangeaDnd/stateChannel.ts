/** Module-private key: the public state of useListHelloPangeaDnd exposes the handlers only */
export const LIST_HELLO_PANGEA_DND_STATE_CHANNEL: unique symbol = Symbol(
    'gravity-ui/list-hello-pangea-dnd-state',
);

/** What a ListHelloPangeaDnd given the state hands to it: its ids and its drop handling */
export interface ListHelloPangeaDndStateConnection {
    ids: readonly string[];
    onDrop: (fromId: string, toId: string, position: 'before' | 'after') => void;
}

/** @internal */
export interface ListHelloPangeaDndStateChannel {
    /** The wrapper connected before is replaced, and told about it in dev */
    connect(owner: object, connection: ListHelloPangeaDndStateConnection): void;
    /** Only the connection of this owner is dropped */
    disconnect(owner: object): void;
    /** Whether the hook got an `onDrop` of its own */
    hasOwnDrop(): boolean;
}
