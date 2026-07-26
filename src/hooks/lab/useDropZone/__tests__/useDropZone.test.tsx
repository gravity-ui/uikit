import type * as React from 'react';

import {act, renderHook} from '../../../../../test-utils/utils';
import {DROP_ZONE_BASE_ATTRIBUTES} from '../constants';
import {useDropZone} from '../useDropZone';

function createDragEvent(itemTypes: string[] = []): React.DragEvent {
    const items = itemTypes.map((type) => ({
        type,
        kind: 'file',
        getAsFile: () => new File([], 'test', {type}),
    }));
    const nativeEvent = {
        dataTransfer: {items, dropEffect: 'none'},
        preventDefault: jest.fn(),
    } as unknown as DragEvent;

    return {
        nativeEvent,
        preventDefault: jest.fn(),
    } as unknown as React.DragEvent;
}

const defaultParams = {
    onDrop: jest.fn(),
};

describe('useDropZone', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('without ref — getDroppableProps', () => {
        test('returns getDroppableProps as a function', () => {
            const {result} = renderHook(() => useDropZone({...defaultParams}));
            expect(typeof result.current.getDroppableProps).toBe('function');
        });

        test('getDroppableProps() contains correct base attributes', () => {
            const {result} = renderHook(() => useDropZone({...defaultParams}));
            const props = result.current.getDroppableProps();
            expect(props['aria-dropeffect']).toBe('copy');
            expect(props.tabIndex).toBe(0);
            expect(props.role).toBe('button');
        });

        test('getDroppableProps() contains drag event handlers', () => {
            const {result} = renderHook(() => useDropZone({...defaultParams}));
            const props = result.current.getDroppableProps();
            expect(typeof props.onDragEnter).toBe('function');
            expect(typeof props.onDragOver).toBe('function');
            expect(typeof props.onDragLeave).toBe('function');
            expect(typeof props.onDrop).toBe('function');
        });

        test('initial value: isDraggingOver=false', () => {
            const {result} = renderHook(() => useDropZone({...defaultParams}));
            expect(result.current.isDraggingOver).toBe(false);
        });
    });

    describe('drag enter/leave lifecycle', () => {
        test('dragEnter sets isDraggingOver=true and calls onDragEnter with native event', () => {
            const onDragEnter = jest.fn();
            const {result} = renderHook(() => useDropZone({onDragEnter}));
            const props = result.current.getDroppableProps();
            const event = createDragEvent(['image/png']);

            act(() => {
                props.onDragEnter(event);
            });

            expect(result.current.isDraggingOver).toBe(true);
            expect(onDragEnter).toHaveBeenCalledTimes(1);
            expect(onDragEnter).toHaveBeenCalledWith(event.nativeEvent);
            expect(event.nativeEvent.dataTransfer?.dropEffect).toBe('copy');
        });

        test('dragEnter handles any file item type', () => {
            const {result} = renderHook(() => useDropZone({...defaultParams}));
            const props = result.current.getDroppableProps();

            act(() => {
                props.onDragEnter(createDragEvent(['application/pdf']));
            });

            expect(result.current.isDraggingOver).toBe(true);
        });

        test('dragLeave resets isDraggingOver=false', () => {
            const onDragLeave = jest.fn();
            const {result} = renderHook(() => useDropZone({onDragLeave}));
            const props = result.current.getDroppableProps();
            const event = createDragEvent(['image/png']);

            act(() => {
                props.onDragEnter(createDragEvent(['image/png']));
            });
            act(() => {
                props.onDragLeave(event);
            });

            expect(result.current.isDraggingOver).toBe(false);
            expect(onDragLeave).toHaveBeenCalledTimes(1);
            expect(onDragLeave).toHaveBeenCalledWith(event.nativeEvent);
        });

        test('nested drag events: 2x enter + 1x leave → still dragging', () => {
            const {result} = renderHook(() => useDropZone({...defaultParams}));
            const props = result.current.getDroppableProps();

            act(() => {
                props.onDragEnter(createDragEvent(['image/png']));
            });
            act(() => {
                props.onDragEnter(createDragEvent(['image/png']));
            });
            act(() => {
                props.onDragLeave(createDragEvent(['image/png']));
            });

            expect(result.current.isDraggingOver).toBe(true);
        });

        test('dragOver calls preventDefault, updates dropEffect and calls onDragOver', () => {
            const onDragOver = jest.fn();
            const {result} = renderHook(() => useDropZone({onDragOver}));
            const props = result.current.getDroppableProps();
            const event = createDragEvent(['image/png']);

            act(() => {
                props.onDragOver(event);
            });

            expect(
                (event.nativeEvent as unknown as {preventDefault: jest.Mock}).preventDefault,
            ).toHaveBeenCalledTimes(1);
            expect(event.nativeEvent.dataTransfer?.dropEffect).toBe('copy');
            expect(onDragOver).toHaveBeenCalledTimes(1);
            expect(onDragOver).toHaveBeenCalledWith(event.nativeEvent);
        });
    });

    describe('drop', () => {
        test('calls onDrop with native event', () => {
            const onDrop = jest.fn();
            const {result} = renderHook(() => useDropZone({onDrop}));
            const props = result.current.getDroppableProps();
            const event = createDragEvent(['image/png', 'application/pdf']);

            act(() => {
                props.onDrop(event);
            });

            expect(onDrop).toHaveBeenCalledTimes(1);
            expect(onDrop.mock.calls[0]).toEqual([event.nativeEvent]);
        });

        test('resets isDraggingOver after drop', () => {
            const {result} = renderHook(() => useDropZone({...defaultParams}));
            const props = result.current.getDroppableProps();

            act(() => {
                props.onDragEnter(createDragEvent(['image/png']));
            });
            expect(result.current.isDraggingOver).toBe(true);

            act(() => {
                props.onDrop(createDragEvent(['image/png']));
            });
            expect(result.current.isDraggingOver).toBe(false);
        });

        test('resets nesting counter after drop', () => {
            const {result} = renderHook(() => useDropZone({...defaultParams}));
            const props = result.current.getDroppableProps();

            act(() => {
                props.onDragEnter(createDragEvent(['image/png']));
                props.onDragEnter(createDragEvent(['image/png']));
            });
            act(() => {
                props.onDrop(createDragEvent(['image/png']));
            });

            // After drop + new enter, counter should be 1, so leave should reset
            act(() => {
                props.onDragEnter(createDragEvent(['image/png']));
            });
            act(() => {
                props.onDragLeave(createDragEvent(['image/png']));
            });
            expect(result.current.isDraggingOver).toBe(false);
        });
    });

    describe('disabled', () => {
        test('does not change isDraggingOver or call onDragEnter when disabled', () => {
            const onDragEnter = jest.fn();
            const {result} = renderHook(() =>
                useDropZone({onDragEnter, onDrop: jest.fn(), disabled: true}),
            );
            const props = result.current.getDroppableProps();

            act(() => {
                props.onDragEnter(createDragEvent(['image/png']));
            });

            expect(result.current.isDraggingOver).toBe(false);
            expect(onDragEnter).not.toHaveBeenCalled();
        });

        test('does not call callbacks on drop when disabled', () => {
            const onDrop = jest.fn();
            const {result} = renderHook(() => useDropZone({onDrop, disabled: true}));
            const props = result.current.getDroppableProps();

            act(() => {
                props.onDrop(createDragEvent(['image/png']));
            });

            expect(onDrop).not.toHaveBeenCalled();
        });

        test('does not call preventDefault on drop when disabled', () => {
            const {result} = renderHook(() => useDropZone({...defaultParams, disabled: true}));
            const props = result.current.getDroppableProps();
            const event = createDragEvent(['image/png']);

            act(() => {
                props.onDrop(event);
            });

            expect(
                (event.nativeEvent as unknown as {preventDefault: jest.Mock}).preventDefault,
            ).not.toHaveBeenCalled();
        });
    });

    describe('with ref', () => {
        test('does not return getDroppableProps', () => {
            const ref = {current: document.createElement('div')};
            const {result} = renderHook(() => useDropZone({...defaultParams, ref}));
            expect('getDroppableProps' in result.current).toBe(false);
        });

        test('returns isDraggingOver', () => {
            const ref = {current: document.createElement('div')};
            const {result} = renderHook(() => useDropZone({...defaultParams, ref}));
            expect(result.current.isDraggingOver).toBe(false);
        });

        test('attaches native event listeners on ref element', () => {
            const element = document.createElement('div');
            const addSpy = jest.spyOn(element, 'addEventListener');
            const ref = {current: element};

            renderHook(() => useDropZone({...defaultParams, ref}));

            const eventNames = addSpy.mock.calls.map((call) => call[0]);
            expect(eventNames).toContain('dragenter');
            expect(eventNames).toContain('dragover');
            expect(eventNames).toContain('dragleave');
            expect(eventNames).toContain('drop');
        });

        test('sets aria attributes on ref element', () => {
            const element = document.createElement('div');
            const ref = {current: element};

            renderHook(() => useDropZone({...defaultParams, ref}));

            expect(element.getAttribute('aria-dropeffect')).toBe(
                DROP_ZONE_BASE_ATTRIBUTES['aria-dropeffect'],
            );
            expect(element.getAttribute('tabindex')).toBe(
                String(DROP_ZONE_BASE_ATTRIBUTES.tabIndex),
            );
            expect(element.getAttribute('role')).toBe(DROP_ZONE_BASE_ATTRIBUTES.role);
        });

        test('removes listeners on unmount', () => {
            const element = document.createElement('div');
            const removeSpy = jest.spyOn(element, 'removeEventListener');
            const ref = {current: element};

            const {unmount} = renderHook(() => useDropZone({...defaultParams, ref}));
            unmount();

            const eventNames = removeSpy.mock.calls.map((call) => call[0]);
            expect(eventNames).toContain('dragenter');
            expect(eventNames).toContain('dragover');
            expect(eventNames).toContain('dragleave');
            expect(eventNames).toContain('drop');
        });
    });
});
