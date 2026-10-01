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
    connect(connection: ListHelloPangeaDndStateConnection): void;
    disconnect(): void;
}
