import {Tab} from '..';
import {act, renderHook} from '../../../../test-utils/utils';
import {useTabListDnd} from '../hooks/useTabListDnd';

import {tab1, tab2, tab3, tab4} from './constants';

const makeMockChildren = (slugs: string[]) => slugs.map((slug) => <Tab key={slug} value={slug} />);

test('calls onSortStart on drag start', () => {
    const onSortStart = jest.fn();
    const children = makeMockChildren([tab1.value, tab2.value, tab3.value]);

    const {result} = renderHook(() => useTabListDnd({shownChildren: children, onSortStart}));

    act(() => {
        result.current.handleDragStart();
    });

    expect(onSortStart).toHaveBeenCalledTimes(1);
});

test('calls onSortEnd with reordered slugs on valid drop', () => {
    const onSortEnd = jest.fn();
    const slugs = [tab1.value, tab2.value, tab3.value];
    const children = makeMockChildren(slugs);

    const {result} = renderHook(() => useTabListDnd({shownChildren: children, onSortEnd}));

    act(() => {
        result.current.handleDragEnd({
            draggableId: tab1.value,
            type: 'DEFAULT',
            source: {droppableId: 'list', index: 0},
            destination: {droppableId: 'list', index: 2},
            reason: 'DROP',
            mode: 'FLUID',
            combine: null,
        });
    });

    expect(onSortEnd).toHaveBeenCalledWith([tab2.value, tab3.value, tab1.value]);
});

test('calls onSortEnd with collapsed slugs after shown slugs on valid drop', () => {
    const onSortEnd = jest.fn();
    const shownChildren = makeMockChildren([tab1.value, tab2.value]);
    const collapsedChildren = makeMockChildren([tab3.value, tab4.value]);

    const {result} = renderHook(() => useTabListDnd({shownChildren, collapsedChildren, onSortEnd}));

    act(() => {
        result.current.handleDragEnd({
            draggableId: tab1.value,
            type: 'DEFAULT',
            source: {droppableId: 'list', index: 0},
            destination: {droppableId: 'list', index: 1},
            reason: 'DROP',
            mode: 'FLUID',
            combine: null,
        });
    });

    expect(onSortEnd).toHaveBeenCalledWith([tab2.value, tab1.value, tab3.value, tab4.value]);
});

test('does not call onSortEnd when dropped on the same index', () => {
    const onSortEnd = jest.fn();
    const children = makeMockChildren([tab1.value, tab2.value, tab3.value]);

    const {result} = renderHook(() => useTabListDnd({shownChildren: children, onSortEnd}));

    act(() => {
        result.current.handleDragEnd({
            draggableId: tab1.value,
            type: 'DEFAULT',
            source: {droppableId: 'list', index: 1},
            destination: {droppableId: 'list', index: 1},
            reason: 'DROP',
            mode: 'FLUID',
            combine: null,
        });
    });

    expect(onSortEnd).not.toHaveBeenCalled();
});

test('does not call onSortEnd when destination is null (drop cancelled)', () => {
    const onSortEnd = jest.fn();
    const children = makeMockChildren([tab1.value, tab2.value, tab3.value]);

    const {result} = renderHook(() => useTabListDnd({shownChildren: children, onSortEnd}));

    act(() => {
        result.current.handleDragEnd({
            draggableId: tab1.value,
            type: 'DEFAULT',
            source: {droppableId: 'list', index: 0},
            destination: null,
            reason: 'CANCEL',
            mode: 'FLUID',
            combine: null,
        });
    });

    expect(onSortEnd).not.toHaveBeenCalled();
});

test('does not call onSortEnd when onSortEnd is not provided', () => {
    const children = makeMockChildren([tab1.value, tab2.value, tab3.value]);

    const {result} = renderHook(() => useTabListDnd({shownChildren: children}));

    expect(() => {
        act(() => {
            result.current.handleDragEnd({
                draggableId: tab1.value,
                type: 'DEFAULT',
                source: {droppableId: 'list', index: 0},
                destination: {droppableId: 'list', index: 2},
                reason: 'DROP',
                mode: 'FLUID',
                combine: null,
            });
        });
    }).not.toThrow();
});

test('calls onSortEnd with reordered slugs when moving last shown tab to the first position', () => {
    const onSortEnd = jest.fn();
    const children = makeMockChildren([tab1.value, tab2.value, tab3.value]);

    const {result} = renderHook(() => useTabListDnd({shownChildren: children, onSortEnd}));

    act(() => {
        result.current.handleDragEnd({
            draggableId: tab3.value,
            type: 'DEFAULT',
            source: {droppableId: 'list', index: 2},
            destination: {droppableId: 'list', index: 0},
            reason: 'DROP',
            mode: 'FLUID',
            combine: null,
        });
    });

    expect(onSortEnd).toHaveBeenCalledWith([tab3.value, tab1.value, tab2.value]);
});

test('keeps a deterministic empty slug for unsupported children on sort end', () => {
    const onSortEnd = jest.fn();
    const children = [
        <Tab key={tab1.value} value={tab1.value} />,
        <span key="unsupported-child">Unsupported child</span>,
        <Tab key={tab2.value} value={tab2.value} />,
    ];

    const {result} = renderHook(() => useTabListDnd({shownChildren: children, onSortEnd}));

    act(() => {
        result.current.handleDragEnd({
            draggableId: tab1.value,
            type: 'DEFAULT',
            source: {droppableId: 'list', index: 0},
            destination: {droppableId: 'list', index: 2},
            reason: 'DROP',
            mode: 'FLUID',
            combine: null,
        });
    });

    expect(onSortEnd).toHaveBeenCalledWith(['', tab2.value, tab1.value]);
});
