import {act, renderHook} from '../../../../test-utils/utils';
import type {UseOpenProps} from '../types';
import {useOpenState} from '../useOpenState';

const renderUseOpenStateHook = (initialProps: UseOpenProps = {}) => {
    return renderHook((props) => useOpenState(props), {initialProps});
};

describe('useOpenState', () => {
    describe('initial render', () => {
        test('check default result', () => {
            const {result} = renderUseOpenStateHook();

            expect(result.current.open).toBe(false);
            expect(result.current.toggleOpen).toEqual(expect.any(Function));
        });
        test('check defaultOpen prop', () => {
            const {result} = renderUseOpenStateHook({defaultOpen: true});

            expect(result.current.open).toBe(true);
        });
    });
    describe('use functions to change state', () => {
        test('toggleOpen with arg changes open value', () => {
            const {result, rerender} = renderUseOpenStateHook();

            expect(result.current.open).toBe(false);

            act(() => {
                result.current.toggleOpen(true);
            });
            rerender({});

            expect(result.current.open).toBe(true);

            act(() => {
                result.current.toggleOpen(false);
            });
            rerender({});

            expect(result.current.open).toBe(false);
        });
        test('toggleOpen without arg changes open value', () => {
            const {result, rerender} = renderUseOpenStateHook();

            expect(result.current.open).toBe(false);

            act(() => {
                result.current.toggleOpen();
            });
            rerender({});

            expect(result.current.open).toBe(true);

            act(() => {
                result.current.toggleOpen();
            });
            rerender({});

            expect(result.current.open).toBe(false);
        });
    });
    describe('callbacks', () => {
        test('onOpenChange is called', () => {
            const onOpenChange = jest.fn();
            const props = {onOpenChange};
            const {result, rerender} = renderUseOpenStateHook(props);

            act(() => {
                result.current.toggleOpen();
            });
            rerender(props);

            expect(onOpenChange).toHaveBeenCalledWith(true);

            act(() => {
                result.current.toggleOpen();
            });
            rerender(props);

            expect(onOpenChange).toHaveBeenCalledWith(false);
        });
        test('if the same value is set, the onOpenChange will not be called', () => {
            const onOpenChange = jest.fn();
            const props = {onOpenChange};
            const {result, rerender} = renderUseOpenStateHook(props);

            act(() => {
                result.current.toggleOpen(false);
            });
            rerender(props);

            expect(onOpenChange).toHaveBeenCalledTimes(0);

            act(() => {
                result.current.toggleOpen(true);
            });
            rerender(props);
            act(() => {
                result.current.toggleOpen(true);
            });
            rerender(props);

            expect(onOpenChange).toHaveBeenCalledTimes(1);
        });
    });

    describe('controlled open', () => {
        test('open prop dominates over defaultOpen prop', () => {
            const props = {defaultOpen: true, open: false};
            const {result} = renderUseOpenStateHook(props);

            expect(result.current.open).toBe(false);
        });
        test('open prop controls state', () => {
            const {result, rerender} = renderUseOpenStateHook({open: true});

            expect(result.current.open).toBe(true);

            rerender({open: false});

            expect(result.current.open).toBe(false);
        });

        test('toggleOpen do not work', () => {
            const {result, rerender} = renderUseOpenStateHook({open: true});

            act(() => {
                result.current.toggleOpen(false);
            });

            expect(result.current.open).toBe(true);

            rerender({open: false});

            act(() => {
                result.current.toggleOpen(true);
            });

            expect(result.current.open).toBe(false);
        });

        test('onOpenChange is called', () => {
            const onOpenChange = jest.fn();
            const props = {open: true, onOpenChange};
            const {result, rerender} = renderUseOpenStateHook(props);

            act(() => {
                result.current.toggleOpen(false);
            });
            rerender(props);

            expect(onOpenChange).toHaveBeenCalledWith(false);
        });

        test('if the same value is set, the onOpenChange will not be called', () => {
            const onOpenChange = jest.fn();
            const props = {open: true, onOpenChange};
            const {result, rerender} = renderUseOpenStateHook(props);

            act(() => {
                result.current.toggleOpen(true);
            });
            rerender(props);

            expect(onOpenChange).toHaveBeenCalledTimes(0);

            rerender({...props, open: false});
            act(() => {
                result.current.toggleOpen(false);
            });

            expect(onOpenChange).toHaveBeenCalledTimes(0);
        });
    });
});
