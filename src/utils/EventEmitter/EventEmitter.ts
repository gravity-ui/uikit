import type {EventListeners} from './types';

/**
 * Class for emitting events
 * @example
 * import {EventEmitter} from '@gravity-ui/uikit';
 *
 * const emitter = new EventEmitter<{
 *   foobar: [string, number]
 * }>();
 *
 * emitter.notify('foobar', ['foo', 0]); // returns "false", because there is no attached listeners yet
 *
 * const unsubscribe = emitter.subscribe('foobar', (a, b) => {
 *   console.log(a, b);
 * });
 *
 * emitter.notify('foobar', ['foo', 1]); // returns "true", because listener is appeared
 */
export class EventEmitter<T extends Record<string, unknown[]>> {
    private listeners: EventListeners<T>;

    constructor() {
        this.listeners = {};
    }

    destroy() {
        this.listeners = {};
    }

    subscribe<Event extends keyof T>(event: Event, listener: (...args: T[Event]) => void) {
        if (typeof listener === 'function') {
            this.listeners[event] = (this.listeners[event] || []).concat(listener);
        }

        return () => {
            this.listeners[event] = this.listeners[event]?.filter(
                (currentListener) => listener !== currentListener,
            );
        };
    }

    notify<Event extends keyof T>(event: Event, data: T[Event]) {
        if (!this.listeners[event]?.length) {
            return false;
        }

        for (const listener of this.listeners[event]) {
            listener(...data);
        }

        return true;
    }
}
