import {renderHook} from '@testing-library/react';
import {UseOpenProps} from '../types';
import {useOpenState} from '../useOpenState';

const renderUseOpenStateHook = (initialProps: UseOpenProps = {}) => {
    return renderHook((props) => useOpenState(props), {initialProps});
};

describe('useOpen', () => {
    describe('initial render', () => {
        test('check default result', () => {
            const {result} = renderUseOpenStateHook();

            expect(result.current.open).toBe(false);
            expect(result.current.setOpen).toEqual(expect.any(Function));
            expect(result.current.setClose).toEqual(expect.any(Function));
            expect(result.current.toggleOpen).toEqual(expect.any(Function));
        });
        test('check defaultOpen prop', () => {
            const {result} = renderUseOpenStateHook({defaultOpen: true});

            expect(result.current.open).toBe(true);
        });
    });
    describe('use functions to change state', () => {
        test('setOpen/setClose changes open value', () => {
            const {result, rerender} = renderUseOpenStateHook();

            expect(result.current.open).toBe(false);

            result.current.setOpen();
            rerender({});

            expect(result.current.open).toBe(true);

            result.current.setClose();
            rerender({});

            expect(result.current.open).toBe(false);
        });
        test('toggleOpen changes open value', () => {
            const {result, rerender} = renderUseOpenStateHook();

            expect(result.current.open).toBe(false);

            result.current.toggleOpen();
            rerender({});

            expect(result.current.open).toBe(true);

            result.current.toggleOpen();
            rerender({});

            expect(result.current.open).toBe(false);
        });
    });
    describe('callbacks', () => {
        test('onOpenChange is called', () => {
            const onOpenChange = jest.fn();
            const props = {onOpenChange};
            const {result, rerender} = renderUseOpenStateHook(props);

            result.current.setOpen();
            rerender(props);

            expect(onOpenChange).toHaveBeenCalledWith(true);

            result.current.setClose();
            rerender(props);

            expect(onOpenChange).toHaveBeenCalledWith(false);
        });
        test('onClose is called', () => {
            const onClose = jest.fn();
            const props = {onClose};
            const {result, rerender} = renderUseOpenStateHook(props);

            result.current.setOpen();
            rerender(props);
            result.current.setClose();
            rerender(props);

            expect(onClose).toHaveBeenCalledTimes(1);
        });
        test('if the same value is set, the callback will not be executed', () => {
            const onClose = jest.fn();
            const onOpenChange = jest.fn();
            const props = {onClose, onOpenChange};
            const {result, rerender} = renderUseOpenStateHook(props);

            result.current.setClose();
            rerender(props);

            expect(onClose).toHaveBeenCalledTimes(0);
            expect(onOpenChange).toHaveBeenCalledTimes(0);

            result.current.setOpen();
            rerender(props);
            result.current.setOpen();
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

        test('setOpen/setClose do not work', () => {
            const {result, rerender} = renderUseOpenStateHook({open: true});

            result.current.setClose();

            expect(result.current.open).toBe(true);

            rerender({open: false});

            result.current.setOpen();

            expect(result.current.open).toBe(false);
        });

        test('onClose is called', () => {
            const onClose = jest.fn();
            const {result} = renderUseOpenStateHook({open: true, onClose});

            result.current.setClose();

            expect(onClose).toHaveBeenCalledTimes(1);
        });

        test('onOpenChange is not called', () => {
            const onOpenChange = jest.fn();
            const props = {open: true, onOpenChange};
            const {result, rerender} = renderUseOpenStateHook(props);

            result.current.setClose();
            result.current.setOpen();
            rerender(props);

            expect(onOpenChange).toHaveBeenCalledTimes(0);
        });
    });
});
