import type * as React from 'react';

import {act, renderHook} from '../../../../../test-utils/utils';
import {DROP_ZONE_BASE_ATTRIBUTES} from '../constants';
import {useDropZone} from '../useDropZone';

function createDragEvent(itemTypes: string[]): React.DragEvent {
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
    accept: ['image/*'],
    onDropAccepted: jest.fn(),
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

        test('initial values: isDraggingOver=false, isInvalidDrag=false', () => {
            const {result} = renderHook(() => useDropZone({...defaultParams}));
            expect(result.current.isDraggingOver).toBe(false);
            expect(result.current.isInvalidDrag).toBe(false);
        });
    });

    describe('drag enter/leave lifecycle', () => {
        test('dragEnter with valid files → isDraggingOver=true', () => {
            const {result} = renderHook(() => useDropZone({...defaultParams}));
            const props = result.current.getDroppableProps();

            act(() => {
                props.onDragEnter(createDragEvent(['image/png']));
            });

            expect(result.current.isDraggingOver).toBe(true);
            expect(result.current.isInvalidDrag).toBe(false);
        });

        test('dragLeave → isDraggingOver=false', () => {
            const {result} = renderHook(() => useDropZone({...defaultParams}));
            const props = result.current.getDroppableProps();

            act(() => {
                props.onDragEnter(createDragEvent(['image/png']));
            });
            act(() => {
                props.onDragLeave(createDragEvent(['image/png']));
            });

            expect(result.current.isDraggingOver).toBe(false);
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

        test('dragEnter with invalid type → isInvalidDrag=true, isDraggingOver=true', () => {
            const {result} = renderHook(() => useDropZone({...defaultParams}));
            const props = result.current.getDroppableProps();

            act(() => {
                props.onDragEnter(createDragEvent(['application/pdf']));
            });

            expect(result.current.isInvalidDrag).toBe(true);
            expect(result.current.isDraggingOver).toBe(true);
        });

        test('dragLeave after invalid drag → isInvalidDrag=false', () => {
            const {result} = renderHook(() => useDropZone({...defaultParams}));
            const props = result.current.getDroppableProps();

            act(() => {
                props.onDragEnter(createDragEvent(['application/pdf']));
            });
            act(() => {
                props.onDragLeave(createDragEvent(['application/pdf']));
            });

            expect(result.current.isInvalidDrag).toBe(false);
            expect(result.current.isDraggingOver).toBe(false);
        });
    });

    describe('drop', () => {
        test('calls onDropAccepted with accepted items', () => {
            const onDropAccepted = jest.fn();
            const {result} = renderHook(() => useDropZone({accept: ['image/*'], onDropAccepted}));
            const props = result.current.getDroppableProps();

            act(() => {
                props.onDragEnter(createDragEvent(['image/png']));
            });
            act(() => {
                props.onDrop(createDragEvent(['image/png']));
            });

            expect(onDropAccepted).toHaveBeenCalledTimes(1);
            expect(onDropAccepted).toHaveBeenCalledWith(
                expect.arrayContaining([expect.objectContaining({type: 'image/png'})]),
            );
        });

        test('calls onDropRejected with rejected items', () => {
            const onDropAccepted = jest.fn();
            const onDropRejected = jest.fn();
            const {result} = renderHook(() =>
                useDropZone({accept: ['image/*'], onDropAccepted, onDropRejected}),
            );
            const props = result.current.getDroppableProps();

            act(() => {
                props.onDrop(createDragEvent(['application/pdf']));
            });

            expect(onDropRejected).toHaveBeenCalledTimes(1);
            expect(onDropRejected).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({
                        reasons: expect.arrayContaining(['invalid-type']),
                    }),
                ]),
            );
        });

        test('calls onDrop with both arrays', () => {
            const onDrop = jest.fn();
            const {result} = renderHook(() => useDropZone({accept: ['image/*'], onDrop}));
            const props = result.current.getDroppableProps();

            act(() => {
                props.onDrop(createDragEvent(['image/png', 'application/pdf']));
            });

            expect(onDrop).toHaveBeenCalledTimes(1);
            expect(onDrop).toHaveBeenCalledWith(
                expect.arrayContaining([expect.objectContaining({type: 'image/png'})]),
                expect.arrayContaining([
                    expect.objectContaining({
                        reasons: expect.arrayContaining(['invalid-type']),
                    }),
                ]),
            );
        });

        test('resets isDraggingOver and isInvalidDrag after drop', () => {
            const {result} = renderHook(() => useDropZone({...defaultParams}));
            const props = result.current.getDroppableProps();

            act(() => {
                props.onDragEnter(createDragEvent(['application/pdf']));
            });
            expect(result.current.isDraggingOver).toBe(true);
            expect(result.current.isInvalidDrag).toBe(true);

            act(() => {
                props.onDrop(createDragEvent(['application/pdf']));
            });
            expect(result.current.isDraggingOver).toBe(false);
            expect(result.current.isInvalidDrag).toBe(false);
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

        test('does not call onDropAccepted if no accepted items', () => {
            const onDropAccepted = jest.fn();
            const onDropRejected = jest.fn();
            const {result} = renderHook(() =>
                useDropZone({accept: ['image/*'], onDropAccepted, onDropRejected}),
            );
            const props = result.current.getDroppableProps();

            act(() => {
                props.onDrop(createDragEvent(['application/pdf']));
            });

            expect(onDropAccepted).not.toHaveBeenCalled();
            expect(onDropRejected).toHaveBeenCalledTimes(1);
        });

        test('does not call onDropRejected if no rejected items', () => {
            const onDropAccepted = jest.fn();
            const onDropRejected = jest.fn();
            const {result} = renderHook(() =>
                useDropZone({accept: ['image/*'], onDropAccepted, onDropRejected}),
            );
            const props = result.current.getDroppableProps();

            act(() => {
                props.onDrop(createDragEvent(['image/png']));
            });

            expect(onDropRejected).not.toHaveBeenCalled();
            expect(onDropAccepted).toHaveBeenCalledTimes(1);
        });
    });

    describe('disabled', () => {
        test('does not change isDraggingOver when disabled', () => {
            const {result} = renderHook(() => useDropZone({...defaultParams, disabled: true}));
            const props = result.current.getDroppableProps();

            act(() => {
                props.onDragEnter(createDragEvent(['image/png']));
            });

            expect(result.current.isDraggingOver).toBe(false);
        });

        test('does not call callbacks on drop when disabled', () => {
            const onDropAccepted = jest.fn();
            const onDrop = jest.fn();
            const {result} = renderHook(() =>
                useDropZone({accept: ['image/*'], onDropAccepted, onDrop, disabled: true}),
            );
            const props = result.current.getDroppableProps();

            act(() => {
                props.onDrop(createDragEvent(['image/png']));
            });

            expect(onDropAccepted).not.toHaveBeenCalled();
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

    describe('maxFilesCount', () => {
        test('maxFilesCount: 1 + drop 2 valid files → 1 accepted, 1 rejected', () => {
            const onDropAccepted = jest.fn();
            const onDropRejected = jest.fn();
            const {result} = renderHook(() =>
                useDropZone({
                    accept: ['image/*'],
                    onDropAccepted,
                    onDropRejected,
                    multiple: true,
                    maxFilesCount: 1,
                }),
            );
            const props = result.current.getDroppableProps();

            act(() => {
                props.onDrop(createDragEvent(['image/png', 'image/jpeg']));
            });

            expect(onDropAccepted).toHaveBeenCalledWith(
                expect.arrayContaining([expect.objectContaining({type: 'image/png'})]),
            );
            expect(onDropRejected).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({
                        reasons: expect.arrayContaining(['too-many-files']),
                    }),
                ]),
            );
        });

        test('without multiple → normalizedMaxFiles is 1', () => {
            const onDropAccepted = jest.fn();
            const onDropRejected = jest.fn();
            const {result} = renderHook(() =>
                useDropZone({
                    accept: ['image/*'],
                    onDropAccepted,
                    onDropRejected,
                }),
            );
            const props = result.current.getDroppableProps();

            act(() => {
                props.onDrop(createDragEvent(['image/png', 'image/jpeg']));
            });

            expect(onDropAccepted).toHaveBeenCalledWith([
                expect.objectContaining({type: 'image/png'}),
            ]);
            expect(onDropRejected).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({
                        reasons: expect.arrayContaining(['too-many-files']),
                    }),
                ]),
            );
        });
    });

    describe('with ref', () => {
        test('does not return getDroppableProps', () => {
            const ref = {current: document.createElement('div')};
            const {result} = renderHook(() => useDropZone({...defaultParams, ref}));
            expect('getDroppableProps' in result.current).toBe(false);
        });

        test('returns isDraggingOver and isInvalidDrag', () => {
            const ref = {current: document.createElement('div')};
            const {result} = renderHook(() => useDropZone({...defaultParams, ref}));
            expect(result.current.isDraggingOver).toBe(false);
            expect(result.current.isInvalidDrag).toBe(false);
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
