export class SyntheticFocusEvent<Target = Element> implements React.FocusEvent<Target> {
    nativeEvent: FocusEvent;
    target: EventTarget & Target;
    currentTarget: EventTarget & Target;
    relatedTarget: Element;
    bubbles: boolean;
    cancelable: boolean;
    defaultPrevented: boolean;
    eventPhase: number;
    isTrusted: boolean;
    timeStamp: number;
    type: string;

    constructor(
        type: string,
        nativeEvent: FocusEvent,
        override: Partial<Pick<FocusEvent, 'target' | 'currentTarget'>> = {},
    ) {
        this.nativeEvent = nativeEvent;
        this.target = (override.target ?? nativeEvent.target) as EventTarget & Target;
        this.currentTarget = (override.currentTarget ?? nativeEvent.currentTarget) as EventTarget &
            Target;
        this.relatedTarget = nativeEvent.relatedTarget as Element;
        this.bubbles = nativeEvent.bubbles;
        this.cancelable = nativeEvent.cancelable;
        this.defaultPrevented = nativeEvent.defaultPrevented;
        this.eventPhase = nativeEvent.eventPhase;
        this.isTrusted = nativeEvent.isTrusted;
        this.timeStamp = nativeEvent.timeStamp;
        this.type = type;
    }

    isDefaultPrevented(): boolean {
        return this.nativeEvent.defaultPrevented;
    }

    preventDefault(): void {
        this.defaultPrevented = true;
        this.nativeEvent.preventDefault();
    }

    stopPropagation(): void {
        this.nativeEvent.stopPropagation();
        this.isPropagationStopped = () => true;
    }

    isPropagationStopped(): boolean {
        return false;
    }

    persist() {}
}
