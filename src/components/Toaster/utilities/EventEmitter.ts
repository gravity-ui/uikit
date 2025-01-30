type EventListener<T> = (data: T) => void;

type Options = Partial<{
    /** Keep data, if no one listens */
    stashUndelivered: boolean;
}>;

export class EventEmitter<T> {
    private options: Options = {};
    private stash: T | undefined;
    private listeners: EventListener<T>[];

    constructor(options: Options = {}) {
        this.options = options;
        this.listeners = [];
    }

    destroy() {
        this.stash = undefined;
        this.listeners = [];
    }

    subscribe(listener: EventListener<T>) {
        if (typeof listener === 'function') {
            this.listeners.push(listener);

            if (this.stash) {
                this.notify(this.stash);
                this.stash = undefined;
            }
        }

        return () => {
            this.listeners = this.listeners.filter(
                (currentListener) => listener !== currentListener,
            );
        };
    }

    notify(data: T) {
        if (this.options.stashUndelivered && this.listeners.length === 0) {
            this.stash = data;

            return;
        }

        for (const listener of this.listeners) {
            listener(data);
        }
    }
}
