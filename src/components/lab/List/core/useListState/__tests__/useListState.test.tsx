import {act, renderHook} from '../../../../../../../test-utils/utils';
import type {ListChildrenState} from '../../types';
import {useListState} from '../useListState';

interface Node {
    id: string;
    disabled?: boolean;
    group?: boolean;
    children?: Node[];
    childrenState?: ListChildrenState;
}

const tree: Node[] = [
    {
        id: 'root',
        children: [{id: 'c1'}, {id: 'c2', children: [{id: 'gc1'}]}],
    },
    {id: 'sibling'},
];

describe('lab/List core: useListState', () => {
    describe('normalization', () => {
        it('handles primitive string items with zero getters', () => {
            const {result} = renderHook(() => useListState({items: ['Apple', 'Pear', 'Plum']}));

            expect(result.current.visibleIds).toEqual(['Apple', 'Pear', 'Plum']);
            expect(result.current.getItemById('Apple')).toBe('Apple');
            expect(result.current.getLevel('Apple')).toBe(0);
            expect(result.current.getParentId('Apple')).toBeUndefined();
            expect(result.current.getChildrenIds('Apple')).toBeUndefined();
            expect(result.current.isDisabled('Apple')).toBe(false);
        });

        it('reads object defaults (id, disabled) from the item', () => {
            const items: Node[] = [{id: 'a'}, {id: 'b', disabled: true}];
            const {result} = renderHook(() => useListState({items}));

            expect(result.current.visibleIds).toEqual(['a', 'b']);
            expect(result.current.getItemById('b')).toBe(items[1]);
            expect(result.current.isDisabled('a')).toBe(false);
            expect(result.current.isDisabled('b')).toBe(true);
        });

        it('honors custom getters', () => {
            const items = [
                {key: 'x', off: true},
                {key: 'y', off: false},
            ];
            const {result} = renderHook(() =>
                useListState({
                    items,
                    getItemId: (i) => i.key,
                    getItemDisabled: (i) => i.off,
                }),
            );

            expect(result.current.visibleIds).toEqual(['x', 'y']);
            expect(result.current.isDisabled('x')).toBe(true);
            expect(result.current.isDisabled('y')).toBe(false);
        });
    });

    describe('item type (item / section)', () => {
        it('defaults every node to item', () => {
            const {result} = renderHook(() => useListState({items: tree}));
            expect(result.current.getItemType('root')).toBe('item');
            expect(result.current.getItemType('c1')).toBe('item');
        });

        it('defaults to item for primitive string items and unknown ids', () => {
            const {result} = renderHook(() => useListState({items: ['Apple']}));
            expect(result.current.getItemType('Apple')).toBe('item');
            expect(result.current.getItemType('missing')).toBe('item');
        });

        it('honors a custom getItemType', () => {
            const items: Node[] = [
                {id: 'sec', group: true, children: [{id: 'opt'}]},
                {id: 'plain'},
            ];
            const {result} = renderHook(() =>
                useListState({
                    items,
                    defaultExpandedIds: ['sec'],
                    getItemType: (node) => (node.group ? 'section' : 'item'),
                }),
            );

            // A section keeps its structure and expansion — only its role differs.
            expect(result.current.getItemType('sec')).toBe('section');
            expect(result.current.getItemType('opt')).toBe('item');
            expect(result.current.getItemType('plain')).toBe('item');
            expect(result.current.getChildrenIds('sec')).toEqual(['opt']);
            expect(result.current.visibleIds).toEqual(['sec', 'opt', 'plain']);
        });

        it('reuses type on an unchanged subtree without recomputing', () => {
            const stable: Node = {id: 'sec', group: true, children: [{id: 'opt'}]};
            const getItemType = jest.fn(
                (node: Node) => (node.group ? 'section' : 'item') as 'item' | 'section',
            );
            const {result, rerender} = renderHook(
                ({items}: {items: Node[]}) => useListState({items, getItemType}),
                {initialProps: {items: [stable, {id: 'x'}] as Node[]}},
            );

            const callsAfterMount = getItemType.mock.calls.length;
            rerender({items: [stable, {id: 'y'}]});

            expect(result.current.getItemType('sec')).toBe('section');
            // Only the new node `y` is rebuilt; the stable section subtree is copied by reference.
            expect(getItemType.mock.calls.length - callsAfterMount).toBe(1);
        });
    });

    describe('structure indexes', () => {
        it('computes level / parentId / childrenIds', () => {
            const {result} = renderHook(() => useListState({items: tree}));

            expect(result.current.getLevel('root')).toBe(0);
            expect(result.current.getLevel('c2')).toBe(1);
            expect(result.current.getLevel('gc1')).toBe(2);

            expect(result.current.getParentId('root')).toBeUndefined();
            expect(result.current.getParentId('c2')).toBe('root');
            expect(result.current.getParentId('gc1')).toBe('c2');

            expect(result.current.getChildrenIds('root')).toEqual(['c1', 'c2']);
            expect(result.current.getChildrenIds('c2')).toEqual(['gc1']);
            expect(result.current.getChildrenIds('c1')).toBeUndefined();
        });
    });

    describe('visibleIds & expansion', () => {
        it('shows only roots when collapsed', () => {
            const {result} = renderHook(() => useListState({items: tree}));
            expect(result.current.visibleIds).toEqual(['root', 'sibling']);
        });

        it('expands and collapses (uncontrolled)', () => {
            const {result} = renderHook(() => useListState({items: tree, defaultExpandedIds: []}));

            act(() => result.current.setExpanded('root', true));
            expect(result.current.visibleIds).toEqual(['root', 'c1', 'c2', 'sibling']);

            act(() => result.current.setExpanded('c2', true));
            expect(result.current.visibleIds).toEqual(['root', 'c1', 'c2', 'gc1', 'sibling']);

            act(() => result.current.setExpanded('root', false));
            expect(result.current.visibleIds).toEqual(['root', 'sibling']);
        });

        it('starts expanded from defaultExpandedIds', () => {
            const {result} = renderHook(() =>
                useListState({items: tree, defaultExpandedIds: ['root']}),
            );
            expect(result.current.visibleIds).toEqual(['root', 'c1', 'c2', 'sibling']);
            expect(result.current.isExpanded('root')).toBe(true);
            expect(result.current.isExpanded('c2')).toBe(false);
        });

        it('setExpanded is a no-op when already in the requested state', () => {
            const onExpandedUpdate = jest.fn();
            const {result} = renderHook(() =>
                useListState({items: tree, defaultExpandedIds: ['root'], onExpandedUpdate}),
            );

            act(() => result.current.setExpanded('root', true));
            act(() => result.current.setExpanded('c1', false));
            expect(onExpandedUpdate).not.toHaveBeenCalled();
        });

        it('is controlled: emits onExpandedUpdate, reflects the prop', () => {
            const onExpandedUpdate = jest.fn();
            const {result, rerender} = renderHook(
                ({expandedIds}: {expandedIds: string[]}) =>
                    useListState({items: tree, expandedIds, onExpandedUpdate}),
                {initialProps: {expandedIds: [] as string[]}},
            );

            expect(result.current.visibleIds).toEqual(['root', 'sibling']);

            act(() => result.current.setExpanded('root', true));
            expect(onExpandedUpdate).toHaveBeenCalledWith(['root']);
            // Controlled: nothing changes until the prop is updated by the owner.
            expect(result.current.visibleIds).toEqual(['root', 'sibling']);

            rerender({expandedIds: ['root']});
            expect(result.current.visibleIds).toEqual(['root', 'c1', 'c2', 'sibling']);
        });
    });

    describe('async subtree (ListChildrenState)', () => {
        it('outcome A — lazy load returned no children: loaded empty folder', () => {
            const items: Node[] = [{id: 'folder', children: [], childrenState: 'loaded'}];
            const {result} = renderHook(() =>
                useListState({items, defaultExpandedIds: ['folder']}),
            );

            // Expandable (chevron stays), but the group is empty.
            expect(result.current.getChildrenIds('folder')).toEqual([]);
            expect(result.current.getChildrenState('folder')).toBe('loaded');
            expect(result.current.isExpanded('folder')).toBe(true);
            expect(result.current.visibleIds).toEqual(['folder']);
        });

        it('outcome B — lazy load returned no children: node became a leaf', () => {
            const items: Node[] = [{id: 'leaf', childrenState: undefined}];
            const {result} = renderHook(() => useListState({items, defaultExpandedIds: ['leaf']}));

            expect(result.current.getChildrenIds('leaf')).toBeUndefined();
            expect(result.current.getChildrenState('leaf')).toBeUndefined();
            expect(result.current.visibleIds).toEqual(['leaf']);
        });

        it('lazy folder: children unloaded but expandable via childrenState', () => {
            const items: Node[] = [{id: 'lazy', childrenState: 'lazy'}];
            const {result} = renderHook(() => useListState({items}));

            // No loaded children, yet the behavior layer can tell it apart from a leaf.
            expect(result.current.getChildrenIds('lazy')).toBeUndefined();
            expect(result.current.getChildrenState('lazy')).toBe('lazy');
        });
    });

    describe('memoization', () => {
        it('does not rebuild the index when only expansion changes', () => {
            const getItemChildren = jest.fn((node: Node) => node.children);
            const {result} = renderHook(() => useListState({items: tree, getItemChildren}));

            const callsAfterMount = getItemChildren.mock.calls.length;
            const rootItemBefore = result.current.getItemById('root');

            act(() => result.current.setExpanded('root', true));

            // The structural index (which is what calls getItemChildren) is untouched.
            expect(getItemChildren).toHaveBeenCalledTimes(callsAfterMount);
            expect(result.current.getItemById('root')).toBe(rootItemBefore);
        });

        it('keeps index accessors and setExpanded referentially stable across expansion', () => {
            const {result} = renderHook(() => useListState({items: tree, defaultExpandedIds: []}));

            const getItemByIdBefore = result.current.getItemById;
            const getChildrenIdsBefore = result.current.getChildrenIds;
            const setExpandedBefore = result.current.setExpanded;

            act(() => result.current.setExpanded('root', true));

            expect(result.current.getItemById).toBe(getItemByIdBefore);
            expect(result.current.getChildrenIds).toBe(getChildrenIdsBefore);
            expect(result.current.setExpanded).toBe(setExpandedBefore);
        });
    });

    describe('incremental reconciliation (transitions)', () => {
        it('lazy folder → loaded with children, reusing the untouched sibling subtree', () => {
            const folderA: Node = {id: 'A', children: [{id: 'A1'}, {id: 'A2'}]};
            const getItemDisabled = jest.fn((node: Node) => Boolean(node.disabled));

            const {result, rerender} = renderHook(
                ({items}: {items: Node[]}) => useListState({items, getItemDisabled}),
                {initialProps: {items: [folderA, {id: 'B', childrenState: 'lazy'}] as Node[]}},
            );

            expect(result.current.getChildrenState('B')).toBe('lazy');
            expect(result.current.getChildrenIds('B')).toBeUndefined();

            const callsAfterMount = getItemDisabled.mock.calls.length;

            // Patch only B; folderA keeps its reference.
            rerender({
                items: [folderA, {id: 'B', children: [{id: 'B1'}], childrenState: 'loaded'}],
            });

            expect(result.current.getChildrenState('B')).toBe('loaded');
            expect(result.current.getChildrenIds('B')).toEqual(['B1']);
            // Only B and B1 are (re)built — the unchanged folderA subtree is skipped entirely.
            expect(getItemDisabled.mock.calls.length - callsAfterMount).toBe(2);
        });

        it('lazy folder → leaf', () => {
            const folderA: Node = {id: 'A', children: [{id: 'A1'}]};
            const {result, rerender} = renderHook(
                ({items}: {items: Node[]}) => useListState({items}),
                {initialProps: {items: [folderA, {id: 'B', childrenState: 'lazy'}] as Node[]}},
            );

            rerender({items: [folderA, {id: 'B'}]});

            expect(result.current.getChildrenIds('B')).toBeUndefined();
            expect(result.current.getChildrenState('B')).toBeUndefined();
        });

        it('removes children and prunes their subtrees from the index', () => {
            const {result, rerender} = renderHook(
                ({items}: {items: Node[]}) => useListState({items, defaultExpandedIds: ['P']}),
                {
                    initialProps: {
                        items: [
                            {
                                id: 'P',
                                children: [{id: 'c1', children: [{id: 'gc1'}]}, {id: 'c2'}],
                                childrenState: 'loaded',
                            },
                        ] as Node[],
                    },
                },
            );

            expect(result.current.visibleIds).toEqual(['P', 'c1', 'c2']);
            expect(result.current.getItemById('gc1')).toBeDefined();

            rerender({items: [{id: 'P', children: [], childrenState: 'loaded'}]});

            expect(result.current.getChildrenIds('P')).toEqual([]);
            expect(result.current.visibleIds).toEqual(['P']);
            // Removed descendants are gone from the index, not just hidden.
            expect(result.current.getItemById('c1')).toBeUndefined();
            expect(result.current.getItemById('c2')).toBeUndefined();
            expect(result.current.getItemById('gc1')).toBeUndefined();
        });

        it('prunes a removed root', () => {
            const keep: Node = {id: 'X'};
            const {result, rerender} = renderHook(
                ({items}: {items: Node[]}) => useListState({items}),
                {initialProps: {items: [keep, {id: 'Y'}] as Node[]}},
            );

            expect(result.current.visibleIds).toEqual(['X', 'Y']);

            rerender({items: [keep]});

            expect(result.current.visibleIds).toEqual(['X']);
            expect(result.current.getItemById('Y')).toBeUndefined();
        });

        it('moves a node (same reference) between two rebuilt parents', () => {
            const moved: Node = {id: 'M'};
            const {result, rerender} = renderHook(
                ({items}: {items: Node[]}) =>
                    useListState({items, defaultExpandedIds: ['P1', 'P2']}),
                {
                    initialProps: {
                        items: [
                            {id: 'P1', children: [moved], childrenState: 'loaded'},
                            {id: 'P2', children: [], childrenState: 'loaded'},
                        ] as Node[],
                    },
                },
            );

            expect(result.current.visibleIds).toEqual(['P1', 'M', 'P2']);
            expect(result.current.getParentId('M')).toBe('P1');

            // M keeps its reference but moves from P1 to P2 (both parents get new references).
            rerender({
                items: [
                    {id: 'P1', children: [], childrenState: 'loaded'},
                    {id: 'P2', children: [moved], childrenState: 'loaded'},
                ],
            });

            expect(result.current.getParentId('M')).toBe('P2');
            expect(result.current.getLevel('M')).toBe(1);
            expect(result.current.getItemById('M')).toBe(moved);
            expect(result.current.visibleIds).toEqual(['P1', 'P2', 'M']);
        });

        it('reorders siblings (same references) and updates order', () => {
            const a: Node = {id: 'a'};
            const b: Node = {id: 'b'};
            const getItemDisabled = jest.fn((node: Node) => Boolean(node.disabled));
            const {result, rerender} = renderHook(
                ({items}: {items: Node[]}) => useListState({items, getItemDisabled}),
                {initialProps: {items: [a, b]}},
            );

            const callsAfterMount = getItemDisabled.mock.calls.length;

            rerender({items: [b, a]});

            expect(result.current.visibleIds).toEqual(['b', 'a']);
            // Both are reused (unchanged reference and position), so no getters re-run.
            expect(getItemDisabled.mock.calls.length).toBe(callsAfterMount);
        });

        it('recomputes on a new-but-equal items array (memoize-by-reference contract)', () => {
            const {result, rerender} = renderHook(
                ({items}: {items: Node[]}) => useListState({items}),
                {initialProps: {items: [{id: 'a'}] as Node[]}},
            );

            const getItemByIdBefore = result.current.getItemById;

            rerender({items: [{id: 'a'}]});

            expect(result.current.visibleIds).toEqual(['a']);
            expect(result.current.getItemById).not.toBe(getItemByIdBefore);
        });

        it('warns on duplicate ids (dev)', () => {
            const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

            renderHook(() => useListState({items: [{id: 'dup'}, {id: 'dup'}] as Node[]}));

            expect(errorSpy).toHaveBeenCalledWith(
                expect.stringContaining('Duplicate item id "dup"'),
            );

            errorSpy.mockRestore();
        });
    });

    describe('bench-smoke: expand on a 50k tree does not walk hidden nodes', () => {
        it('expanding one folder does not re-traverse the forest', () => {
            const FOLDERS = 1000;
            const CHILDREN = 50; // 1000 folders * 50 = 50_000 leaves

            const forest: Node[] = [];
            for (let f = 0; f < FOLDERS; f++) {
                const children: Node[] = [];
                for (let c = 0; c < CHILDREN; c++) {
                    children.push({id: `f${f}-c${c}`});
                }
                forest.push({id: `f${f}`, children});
            }

            const getItemChildren = jest.fn((node: Node) => node.children);
            const {result} = renderHook(() => useListState({items: forest, getItemChildren}));

            // All folders collapsed: only the top level is visible.
            expect(result.current.visibleIds).toHaveLength(FOLDERS);

            const callsAfterMount = getItemChildren.mock.calls.length;

            act(() => result.current.setExpanded('f500', true));

            // No full pass: expansion recomputes visibleIds from the prebuilt index only.
            expect(getItemChildren).toHaveBeenCalledTimes(callsAfterMount);
            expect(result.current.visibleIds).toHaveLength(FOLDERS + CHILDREN);
        });
    });
});
