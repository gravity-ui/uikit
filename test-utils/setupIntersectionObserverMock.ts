export function setupIntersectionObserverMock({
    root = null,
    rootMargin = '',
    thresholds = [],
    disconnect = () => null,
    observe = () => null,
    takeRecords = () => [
        {
            boundingClientRect: {} as DOMRectReadOnly,
            intersectionRatio: 1,
            intersectionRect: {} as DOMRectReadOnly,
            isIntersecting: true,
            rootBounds: null,
            target: {} as Element,
            time: 1,
        },
    ],
    unobserve = () => null,
} = {}): void {
    class MockIntersectionObserver implements IntersectionObserver {
        readonly root: Element | null = root;
        readonly rootMargin: string = rootMargin;
        readonly thresholds: ReadonlyArray<number> = thresholds;
        disconnect: () => void = disconnect;
        observe: (target: Element) => void = observe;
        takeRecords: () => IntersectionObserverEntry[] = takeRecords;
        unobserve: (target: Element) => void = unobserve;

        constructor(
            callback: (
                entries: IntersectionObserverEntry[],
                observer: IntersectionObserver,
            ) => void,
        ) {
            callback(takeRecords(), this);
        }
    }

    Object.defineProperty(window, 'IntersectionObserver', {
        writable: true,
        configurable: true,
        value: MockIntersectionObserver,
    });

    Object.defineProperty(global, 'IntersectionObserver', {
        writable: true,
        configurable: true,
        value: MockIntersectionObserver,
    });
}
