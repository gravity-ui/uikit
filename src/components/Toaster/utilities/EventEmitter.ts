type EventListener<T> = (data: T) => void;

export class EventEmitter<T> {
    private listeners: EventListener<T>[];

    constructor() {
        this.listeners = [];
    }

    destroy() {
        this.listeners = [];
    }

    subscribe(listener: EventListener<T>) {
        if (typeof listener === 'function') {
            this.listeners.push(listener);
        }

        return () => {
            this.listeners = this.listeners.filter(
                (currentListener) => listener !== currentListener,
            );
        };
    }

    notify(data: T) {
        if (this.listeners.length === 0) {
            return false;
        }

        for (const listener of this.listeners) {
            listener(data);
        }

        return true;
    }
}
