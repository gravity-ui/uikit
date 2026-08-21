import {act, render, screen} from '../../../../test-utils/utils';
import {Sheet} from '../Sheet';
import {SheetQa} from '../constants';

describe('Sheet resize', () => {
    let resizeCallback: ResizeObserverCallback | undefined;
    let originalResizeObserver: typeof ResizeObserver;
    let getBoundingClientRectSpy: jest.SpyInstance;

    let marginBoxEl: Element | null = null;
    let contentHeight = 0;

    beforeEach(() => {
        originalResizeObserver = global.ResizeObserver;

        global.ResizeObserver = class implements ResizeObserver {
            constructor(callback: ResizeObserverCallback) {
                resizeCallback = callback;
            }
            disconnect() {}
            observe() {}
            unobserve() {}
        };

        getBoundingClientRectSpy = jest
            .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
            .mockImplementation(function (this: HTMLElement) {
                const height = this === marginBoxEl ? contentHeight : 0;

                return {height, width: 0, top: 0, left: 0} as DOMRect;
            });
    });

    afterEach(() => {
        global.ResizeObserver = originalResizeObserver;
        getBoundingClientRectSpy.mockRestore();
        resizeCallback = undefined;
        marginBoxEl = null;
        contentHeight = 0;
    });

    test('updates the sheet height when its content is resized', () => {
        render(<Sheet visible>Content</Sheet>);

        const scrollContainer = screen.getByTestId(SheetQa.CONTENT_AREA);
        const sheet = screen.getByRole('dialog');

        marginBoxEl = scrollContainer.firstElementChild;

        expect(resizeCallback).toBeDefined();

        contentHeight = 200;
        act(() => {
            resizeCallback?.([], {} as ResizeObserver);
        });

        expect(scrollContainer.style.height).toBe('200px');
        expect(sheet.style.transform).toBe('translate3d(0, -200px, 0)');
    });
});
