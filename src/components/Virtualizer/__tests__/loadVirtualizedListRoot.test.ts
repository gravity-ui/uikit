import type * as LoaderModule from '../loadVirtualizedListRoot';

// How many requests of the chunk fail before one goes through, and how many were made
let mockFailures = 0;
let mockRequests = 0;

jest.mock('../VirtualizedListRoot', () => {
    mockRequests += 1;
    if (mockFailures > 0) {
        mockFailures -= 1;
        throw new Error('ChunkLoadError');
    }
    return jest.requireActual('../VirtualizedListRoot');
});

// A loader of its own for every test: it keeps the chunk it loaded, or failed to load, for good.
// The registry is reset too — it holds the chunk the previous test loaded
function loadFreshLoader(): typeof LoaderModule {
    jest.resetModules();
    return jest.requireActual('../loadVirtualizedListRoot');
}

beforeEach(() => {
    jest.useFakeTimers();
    mockFailures = 0;
    mockRequests = 0;
});

afterEach(() => {
    jest.useRealTimers();
});

describe('loadVirtualizedListRoot', () => {
    test('every call shares one request', async () => {
        const loader = loadFreshLoader();

        const first = loader.loadVirtualizedListRoot();
        expect(loader.loadVirtualizedListRoot()).toBe(first);

        const module = await first;
        expect(loader.loadVirtualizedListRoot()).toBe(first);
        expect(loader.getLoadedVirtualizedListRoot()).toBe(module);
        expect(mockRequests).toBe(1);
    });

    test('a request that fails is repeated after a pause', async () => {
        const loader = loadFreshLoader();
        mockFailures = 2;

        const promise = loader.loadVirtualizedListRoot();
        await jest.advanceTimersByTimeAsync(499);
        expect(mockRequests).toBe(1);

        await jest.advanceTimersByTimeAsync(1);
        expect(mockRequests).toBe(2);

        await jest.advanceTimersByTimeAsync(2000);
        const module = await promise;
        expect(mockRequests).toBe(3);
        expect(module.VirtualizedListRoot).toEqual(expect.any(Function));
        expect(loader.getLoadedVirtualizedListRoot()).toBe(module);
    });

    test('after the third failure the promise rejects and stays rejected', async () => {
        const loader = loadFreshLoader();
        mockFailures = 3;

        const promise = loader.loadVirtualizedListRoot();
        const rejection = expect(promise).rejects.toThrow('ChunkLoadError');
        await jest.advanceTimersByTimeAsync(500 + 2000);
        await rejection;

        expect(mockRequests).toBe(3);
        expect(loader.getLoadedVirtualizedListRoot()).toBeUndefined();
        // React.lazy keeps the rejection of its own anyway: no new requests behind its back
        expect(loader.loadVirtualizedListRoot()).toBe(promise);
        expect(mockRequests).toBe(3);
    });
});
