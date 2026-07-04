import {act, renderHook} from '../../../../../../../test-utils/utils';
import type {UseListStateProps} from '../../useListState';
import {useListState} from '../../useListState';
import type {ListSelection, ListSelectionProps} from '../types';
import {useListSelection} from '../useListSelection';

interface Node {
    id: string;
    disabled?: boolean;
    group?: boolean;
    children?: Node[];
}

const flat: Node[] = [{id: 'a'}, {id: 'b'}, {id: 'c'}, {id: 'd'}, {id: 'e'}];

// `c` is disabled: it stays a position in the range but is never selected.
const withDisabled: Node[] = [
    {id: 'a'},
    {id: 'b'},
    {id: 'c', disabled: true},
    {id: 'd'},
    {id: 'e'},
];

// Sections are `type: 'section'` label rows over their option children — enabled, but not selectable
// and skipped by selection, distinct from disabled `item`s.
const sections: Node[] = [
    {id: 'sec1', group: true, children: [{id: 'a'}, {id: 'b'}]},
    {id: 'sec2', group: true, children: [{id: 'c'}, {id: 'd'}]},
];
const getItemType = (node: Node): 'item' | 'section' => (node.group ? 'section' : 'item');

// Every `setup` call enables selection, so the hook always returns a `ListSelection` here; the
// off case (no `selectionMode`) is covered by a dedicated test below.
function setup(
    items: Node[],
    selectionProps: ListSelectionProps,
    stateProps: Omit<UseListStateProps<Node>, 'items'> = {},
) {
    return renderHook(
        (props: {selectionProps: ListSelectionProps}) => {
            const state = useListState({items, ...stateProps});
            const selection = useListSelection(state, props.selectionProps) as ListSelection;
            return {state, selection};
        },
        {initialProps: {selectionProps}},
    );
}

describe('lab/List core: useListSelection', () => {
    describe('off (no selectionMode)', () => {
        it('returns undefined so the list has no selection', () => {
            const {result} = renderHook(() => {
                const state = useListState({items: flat});
                return {selection: useListSelection(state, {})};
            });
            expect(result.current.selection).toBeUndefined();
        });

        it('warns in dev when selectedIds is passed without selectionMode', () => {
            const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

            renderHook(() => {
                const state = useListState({items: flat});
                return useListSelection(state, {selectedIds: ['a']});
            });

            expect(errorSpy).toHaveBeenCalledWith(
                expect.stringContaining('ignored without `selectionMode`'),
            );
            errorSpy.mockRestore();
        });
    });

    describe('mode', () => {
        it('reflects the selectionMode', () => {
            expect(setup(flat, {selectionMode: 'single'}).result.current.selection.mode).toBe(
                'single',
            );
            expect(setup(flat, {selectionMode: 'multiple'}).result.current.selection.mode).toBe(
                'multiple',
            );
        });

        it('starts with an empty array selection', () => {
            const {result} = setup(flat, {selectionMode: 'multiple'});
            expect(result.current.selection.selectedIds).toEqual([]);
            expect(result.current.selection.isSelected('a')).toBe(false);
        });
    });

    describe('single mode', () => {
        it('select replaces the selection', () => {
            const {result} = setup(flat, {selectionMode: 'single'});

            act(() => result.current.selection.select('a'));
            expect(result.current.selection.selectedIds).toEqual(['a']);

            act(() => result.current.selection.select('b'));
            expect(result.current.selection.selectedIds).toEqual(['b']);
            expect(result.current.selection.isSelected('a')).toBe(false);
        });

        it('toggle selects, then deselects the same node', () => {
            const {result} = setup(flat, {selectionMode: 'single'});

            act(() => result.current.selection.toggle('a'));
            expect(result.current.selection.selectedIds).toEqual(['a']);

            act(() => result.current.selection.toggle('a'));
            expect(result.current.selection.selectedIds).toEqual([]);
        });

        it('toggle of a second node replaces the first', () => {
            const {result} = setup(flat, {selectionMode: 'single'});

            act(() => result.current.selection.toggle('a'));
            act(() => result.current.selection.toggle('b'));
            expect(result.current.selection.selectedIds).toEqual(['b']);
        });
    });

    describe('multiple mode', () => {
        it('toggle accumulates and removes, preserving order', () => {
            const {result} = setup(flat, {selectionMode: 'multiple'});

            act(() => result.current.selection.toggle('b'));
            act(() => result.current.selection.toggle('a'));
            act(() => result.current.selection.toggle('d'));
            expect(result.current.selection.selectedIds).toEqual(['b', 'a', 'd']);

            act(() => result.current.selection.toggle('a'));
            expect(result.current.selection.selectedIds).toEqual(['b', 'd']);
        });

        it('select replaces the whole selection with a single node', () => {
            const {result} = setup(flat, {selectionMode: 'multiple'});

            act(() => result.current.selection.toggle('a'));
            act(() => result.current.selection.toggle('b'));
            expect(result.current.selection.selectedIds).toEqual(['a', 'b']);

            act(() => result.current.selection.select('c'));
            expect(result.current.selection.selectedIds).toEqual(['c']);
            expect(result.current.selection.isSelected('a')).toBe(false);
        });

        it('isSelected tracks the selected set', () => {
            const {result} = setup(flat, {selectionMode: 'multiple'});

            act(() => result.current.selection.toggle('a'));
            act(() => result.current.selection.toggle('d'));
            expect(result.current.selection.isSelected('a')).toBe(true);
            expect(result.current.selection.isSelected('d')).toBe(true);
            expect(result.current.selection.isSelected('b')).toBe(false);
        });
    });

    describe('disabled nodes are not selectable', () => {
        it('select is a no-op on a disabled node', () => {
            const {result} = setup(withDisabled, {selectionMode: 'multiple'});

            act(() => result.current.selection.select('c'));
            expect(result.current.selection.selectedIds).toEqual([]);
        });

        it('toggle is a no-op on a disabled node', () => {
            const {result} = setup(withDisabled, {selectionMode: 'multiple'});

            act(() => result.current.selection.toggle('c'));
            expect(result.current.selection.selectedIds).toEqual([]);
        });
    });

    describe('section labels are not selectable', () => {
        it('select and toggle are no-ops on a section header', () => {
            const {result} = setup(
                sections,
                {selectionMode: 'multiple'},
                {defaultExpandedIds: ['sec1', 'sec2'], getItemType},
            );

            act(() => result.current.selection.select('sec1'));
            expect(result.current.selection.selectedIds).toEqual([]);

            act(() => result.current.selection.toggle('sec2'));
            expect(result.current.selection.selectedIds).toEqual([]);
        });
    });

    describe('extendTo (range) in multiple mode', () => {
        it('extends an inclusive range from the anchor set by select', () => {
            const {result} = setup(flat, {selectionMode: 'multiple'});

            act(() => result.current.selection.select('b')); // anchor = b
            act(() => result.current.selection.extendTo('d'));
            expect(result.current.selection.selectedIds).toEqual(['b', 'c', 'd']);
        });

        it('extends in visibleIds order regardless of direction', () => {
            const {result} = setup(flat, {selectionMode: 'multiple'});

            act(() => result.current.selection.select('d')); // anchor = d
            act(() => result.current.selection.extendTo('a'));
            expect(result.current.selection.selectedIds).toEqual(['a', 'b', 'c', 'd']);
        });

        it('grows and shrinks around a fixed anchor', () => {
            const {result} = setup(flat, {selectionMode: 'multiple'});

            act(() => result.current.selection.select('b')); // anchor stays at b
            act(() => result.current.selection.extendTo('e'));
            expect(result.current.selection.selectedIds).toEqual(['b', 'c', 'd', 'e']);

            act(() => result.current.selection.extendTo('c'));
            expect(result.current.selection.selectedIds).toEqual(['b', 'c']);
        });

        it('spans a disabled node by position but never selects it', () => {
            const {result} = setup(withDisabled, {selectionMode: 'multiple'});

            act(() => result.current.selection.select('a')); // anchor = a
            act(() => result.current.selection.extendTo('e'));
            // The range a..e crosses the disabled `c`; the selection skips it.
            expect(result.current.selection.selectedIds).toEqual(['a', 'b', 'd', 'e']);
        });

        it('with no anchor selects only the target', () => {
            const {result} = setup(flat, {selectionMode: 'multiple'});

            act(() => result.current.selection.extendTo('c'));
            expect(result.current.selection.selectedIds).toEqual(['c']);
        });

        it('is a no-op onto a non-selectable target with no anchor (keeps a pre-seeded selection)', () => {
            const {result} = setup(withDisabled, {
                selectionMode: 'multiple',
                defaultSelectedIds: ['a', 'b'],
            });

            // `defaultSelectedIds` set no anchor; extending onto the disabled `c` must not wipe it.
            act(() => result.current.selection.extendTo('c'));
            expect(result.current.selection.selectedIds).toEqual(['a', 'b']);
        });

        it('is a no-op when the target is not visible', () => {
            const {result} = setup(flat, {selectionMode: 'multiple'});

            act(() => result.current.selection.select('a'));
            act(() => result.current.selection.extendTo('missing'));
            expect(result.current.selection.selectedIds).toEqual(['a']);
        });

        it('crosses section headers by position but selects only options', () => {
            const {result} = setup(
                sections,
                {selectionMode: 'multiple'},
                {defaultExpandedIds: ['sec1', 'sec2'], getItemType},
            );
            // visibleIds = ['sec1', 'a', 'b', 'sec2', 'c', 'd']; sec1/sec2 are `section` labels.
            act(() => result.current.selection.select('a')); // anchor = a
            act(() => result.current.selection.extendTo('c'));
            // The range spans the `sec2` header; it is skipped, options are selected.
            expect(result.current.selection.selectedIds).toEqual(['a', 'b', 'c']);
        });

        it('extends up to a section target, excluding the target itself', () => {
            const {result} = setup(
                sections,
                {selectionMode: 'multiple'},
                {defaultExpandedIds: ['sec1', 'sec2'], getItemType},
            );

            act(() => result.current.selection.select('a')); // anchor = a
            act(() => result.current.selection.extendTo('sec2')); // target is a section label
            expect(result.current.selection.selectedIds).toEqual(['a', 'b']);
        });

        it('keeps the selection when the anchor turned non-selectable and the range is empty', () => {
            const {result, rerender} = renderHook(
                ({items}: {items: Node[]}) => {
                    const state = useListState({items, getItemType});
                    const selection = useListSelection(state, {
                        selectionMode: 'multiple',
                    }) as ListSelection;
                    return {selection};
                },
                {initialProps: {items: [{id: 'a'}, {id: 'b'}, {id: 'c'}] as Node[]}},
            );

            act(() => result.current.selection.select('a')); // anchor = a, selection ['a']
            // `a` becomes disabled and `b` a section — the whole a..b range is now non-selectable.
            rerender({items: [{id: 'a', disabled: true}, {id: 'b', group: true}, {id: 'c'}]});
            act(() => result.current.selection.extendTo('b'));
            // Empty range must not wipe the pre-existing selection.
            expect(result.current.selection.selectedIds).toEqual(['a']);
        });
    });

    describe('extendTo in single mode', () => {
        it('behaves like select', () => {
            const {result} = setup(flat, {selectionMode: 'single'});

            act(() => result.current.selection.select('a'));
            act(() => result.current.selection.extendTo('c'));
            expect(result.current.selection.selectedIds).toEqual(['c']);
        });
    });

    describe('selectAll', () => {
        it('selects every visible enabled node', () => {
            const {result} = setup(withDisabled, {selectionMode: 'multiple'});

            act(() => result.current.selection.selectAll());
            expect(result.current.selection.selectedIds).toEqual(['a', 'b', 'd', 'e']);
        });

        it('excludes non-selectable section headers', () => {
            const {result} = setup(
                sections,
                {selectionMode: 'multiple'},
                {defaultExpandedIds: ['sec1', 'sec2'], getItemType},
            );

            act(() => result.current.selection.selectAll());
            expect(result.current.selection.selectedIds).toEqual(['a', 'b', 'c', 'd']);
        });

        it('follows expansion — collapsed descendants are not visible, so not selected', () => {
            const tree: Node[] = [{id: 'f', children: [{id: 'f1'}, {id: 'f2'}]}, {id: 'g'}];
            const {result} = setup(tree, {selectionMode: 'multiple'});

            // A `tree` folder is a selectable `item`, so selectAll includes it (unlike a `section`).
            act(() => result.current.selection.selectAll());
            expect(result.current.selection.selectedIds).toEqual(['f', 'g']);

            act(() => result.current.state.setExpanded('f', true));
            act(() => result.current.selection.selectAll());
            expect(result.current.selection.selectedIds).toEqual(['f', 'f1', 'f2', 'g']);
        });

        it('is a no-op in single mode', () => {
            const onSelectedUpdate = jest.fn();
            const {result} = setup(flat, {selectionMode: 'single', onSelectedUpdate});

            act(() => result.current.selection.selectAll());
            expect(result.current.selection.selectedIds).toEqual([]);
            expect(onSelectedUpdate).not.toHaveBeenCalled();
        });
    });

    describe('clear', () => {
        it('empties the selection', () => {
            const {result} = setup(flat, {selectionMode: 'multiple'});

            act(() => result.current.selection.toggle('a'));
            act(() => result.current.selection.toggle('b'));
            act(() => result.current.selection.clear());
            expect(result.current.selection.selectedIds).toEqual([]);
        });

        it('resets the anchor so a following extendTo selects only the target', () => {
            const {result} = setup(flat, {selectionMode: 'multiple'});

            act(() => result.current.selection.select('b')); // anchor = b
            act(() => result.current.selection.clear());
            act(() => result.current.selection.extendTo('d'));
            expect(result.current.selection.selectedIds).toEqual(['d']);
        });

        it('does not emit when already empty', () => {
            const onSelectedUpdate = jest.fn();
            const {result} = setup(flat, {selectionMode: 'multiple', onSelectedUpdate});

            act(() => result.current.selection.clear());
            expect(onSelectedUpdate).not.toHaveBeenCalled();
        });
    });

    describe('onSelectedUpdate details.trigger', () => {
        it('defaults to pointer', () => {
            const onSelectedUpdate = jest.fn();
            const {result} = setup(flat, {selectionMode: 'multiple', onSelectedUpdate});

            act(() => result.current.selection.toggle('a'));
            expect(onSelectedUpdate).toHaveBeenCalledWith(['a'], {trigger: 'pointer'});
        });

        it('carries the explicit trigger', () => {
            const onSelectedUpdate = jest.fn();
            const {result} = setup(flat, {selectionMode: 'multiple', onSelectedUpdate});

            act(() => result.current.selection.toggle('a', 'keyboard'));
            expect(onSelectedUpdate).toHaveBeenCalledWith(['a'], {trigger: 'keyboard'});
        });

        it('does not emit when the selection is unchanged', () => {
            const onSelectedUpdate = jest.fn();
            const {result} = setup(flat, {selectionMode: 'multiple', onSelectedUpdate});

            act(() => result.current.selection.toggle('a'));
            expect(onSelectedUpdate).toHaveBeenCalledTimes(1);

            // Re-selecting the already-selected node produces the same set: no emit.
            act(() => result.current.selection.select('a'));
            expect(onSelectedUpdate).toHaveBeenCalledTimes(1);
        });
    });

    describe('controlled', () => {
        it('emits onSelectedUpdate but reflects the prop, not internal state', () => {
            const onSelectedUpdate = jest.fn();
            const {result, rerender} = renderHook(
                (props: {selectionProps: ListSelectionProps}) => {
                    const state = useListState({items: flat});
                    const selection = useListSelection(
                        state,
                        props.selectionProps,
                    ) as ListSelection;
                    return {selection};
                },
                {
                    initialProps: {
                        selectionProps: {
                            selectionMode: 'multiple',
                            selectedIds: [] as string[],
                            onSelectedUpdate,
                        } as ListSelectionProps,
                    },
                },
            );

            act(() => result.current.selection.toggle('a'));
            expect(onSelectedUpdate).toHaveBeenCalledWith(['a'], {trigger: 'pointer'});
            // Controlled: nothing changes until the owner updates the prop.
            expect(result.current.selection.selectedIds).toEqual([]);
            expect(result.current.selection.isSelected('a')).toBe(false);

            rerender({
                selectionProps: {
                    selectionMode: 'multiple',
                    selectedIds: ['a'],
                    onSelectedUpdate,
                },
            });
            expect(result.current.selection.selectedIds).toEqual(['a']);
            expect(result.current.selection.isSelected('a')).toBe(true);
        });
    });

    describe('uncontrolled with defaultSelectedIds', () => {
        it('starts from the default and then tracks internal changes', () => {
            const {result} = setup(flat, {
                selectionMode: 'multiple',
                defaultSelectedIds: ['b'],
            });

            expect(result.current.selection.selectedIds).toEqual(['b']);
            expect(result.current.selection.isSelected('b')).toBe(true);

            act(() => result.current.selection.toggle('d'));
            expect(result.current.selection.selectedIds).toEqual(['b', 'd']);
        });
    });

    describe('stability', () => {
        it('keeps the gesture methods referentially stable across selection changes', () => {
            const {result} = setup(flat, {selectionMode: 'multiple'});

            const {select, toggle, extendTo, selectAll, clear} = result.current.selection;

            act(() => result.current.selection.toggle('a'));

            expect(result.current.selection.select).toBe(select);
            expect(result.current.selection.toggle).toBe(toggle);
            expect(result.current.selection.extendTo).toBe(extendTo);
            expect(result.current.selection.selectAll).toBe(selectAll);
            expect(result.current.selection.clear).toBe(clear);
        });
    });
});
