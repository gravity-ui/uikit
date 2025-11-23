export type EventListeners<T extends Record<string, unknown[]>> = {
    [Event in keyof T]?: ((...args: T[Event]) => void)[];
};
