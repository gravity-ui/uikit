import * as React from 'react';

import {act, fireEvent, render, screen} from '../../../../../../../test-utils/utils';
import {KeyCode} from '../../../../../../constants';
import {ThemeContext} from '../../../../../theme/ThemeContext';
import type {Direction} from '../../../../../theme/types';
import type {ListChildrenState, ListItemType} from '../../types';
import {useListSelection} from '../../useListSelection';
import type {ListSelectionMode} from '../../useListSelection';
import {useListState} from '../../useListState';
import type {ListApi, ListItemContext, ListRole} from '../types';
import {useListBehavior} from '../useListBehavior';

interface Node {
    id: string;
    label?: string;
    disabled?: boolean;
    type?: ListItemType;
    children?: Node[];
    childrenState?: ListChildrenState;
}

const flat: Node[] = [
    {id: 'a', label: 'Apple'},
    {id: 'b', label: 'Banana'},
    {id: 'c', label: 'Cherry'},
    {id: 'd', label: 'Date'},
    {id: 'e', label: 'Elderberry'},
];

// `c` is disabled: navigation still lands on it, selection never does.
const withDisabled: Node[] = [
    {id: 'a', label: 'Apple'},
    {id: 'b', label: 'Banana'},
    {id: 'c', label: 'Cherry', disabled: true},
    {id: 'd', label: 'Date'},
    {id: 'e', label: 'Elderberry'},
];

// Two section headers (non-navigable) each holding two options.
const sections: Node[] = [
    {id: 's1', label: 'Recent', type: 'section', children: [{id: 'a'}, {id: 'b'}]},
    {id: 's2', label: 'All', type: 'section', children: [{id: 'c'}, {id: 'd'}]},
];

interface HarnessProps {
    items: Node[];
    role?: ListRole;
    selectionMode?: ListSelectionMode;
    defaultSelectedIds?: string[];
    onSelectedUpdate?: (ids: string[]) => void;
    defaultExpandedIds?: string[];
    typeahead?: boolean;
    activateOnHover?: 'keep' | 'reset-on-leave' | false;
    onItemAction?: (ctx: ListItemContext<Node>) => void;
    disabled?: boolean;
    activeItemId?: string;
    defaultActiveItemId?: string;
    onActiveItemUpdate?: (id: string | undefined) => void;
    onLoadChildren?: (ctx: ListItemContext<Node>) => void;
    id?: string;
    apiRef?: {current: ListApi | null};
}

function Harness(props: HarnessProps) {
    const state = useListState<Node>({
        items: props.items,
        getItemType: (n) => n.type ?? 'item',
        defaultExpandedIds: props.defaultExpandedIds,
    });
    const selection = useListSelection(state, {
        selectionMode: props.selectionMode,
        defaultSelectedIds: props.defaultSelectedIds,
        onSelectedUpdate: props.onSelectedUpdate,
    });
    const behavior = useListBehavior<Node>({
        state,
        selection,
        role: props.role ?? 'listbox',
        typeahead: props.typeahead,
        activateOnHover: props.activateOnHover,
        onItemAction: props.onItemAction,
        disabled: props.disabled,
        activeItemId: props.activeItemId,
        defaultActiveItemId: props.defaultActiveItemId,
        onActiveItemUpdate: props.onActiveItemUpdate,
        onLoadChildren: props.onLoadChildren,
        getItemTextValue: (n) => n.label ?? n.id,
        id: props.id,
    });
    const {apiRef} = props;
    if (apiRef) {
        apiRef.current = behavior.api;
    }
    // The headless props are typed for a generic `HTMLElement`; the only member that does not spread
    // cleanly onto a concrete `<div>` is the (invariant) ref, so it is re-cast at the spread site.
    return (
        <div
            {...behavior.containerProps}
            ref={behavior.containerProps.ref as React.Ref<HTMLDivElement>}
            aria-label="list"
            data-qa="container"
        >
            {state.visibleIds.map((id) => {
                const ctx = behavior.getItemContext(id);
                return (
                    <div
                        key={id}
                        {...ctx.props}
                        ref={ctx.props.ref as React.Ref<HTMLDivElement>}
                        data-qa={id}
                        data-active={ctx.state.active || undefined}
                    >
                        {state.getItemById(id)?.label ?? id}
                    </div>
                );
            })}
        </div>
    );
}

function renderList(props: HarnessProps, direction: Direction = 'ltr') {
    const utils = render(
        <ThemeContext.Provider value={{direction, theme: 'light', themeValue: 'light'}}>
            <Harness {...props} />
        </ThemeContext.Provider>,
    );
    return {container: screen.getByTestId('container'), unmount: utils.unmount};
}

/** Screen-scoped row lookup by its `data-qa` (avoids destructuring queries off `render`). */
function getRow(id: string): HTMLElement {
    return screen.getByTestId(id);
}

function activeOf(container: HTMLElement): string | undefined {
    return container.querySelector('[data-active]')?.getAttribute('data-qa') ?? undefined;
}

function selectedOf(container: HTMLElement): string[] {
    return Array.from(container.querySelectorAll('[aria-selected="true"]'))
        .map((el) => el.getAttribute('data-qa') as string)
        .sort();
}

function tabbableOf(container: HTMLElement): string | undefined {
    return container.querySelector('[tabindex="0"]')?.getAttribute('data-qa') ?? undefined;
}

interface KeyPress {
    key: string;
    shiftKey?: boolean;
    ctrlKey?: boolean;
    metaKey?: boolean;
}

function press(container: HTMLElement, keys: KeyPress[]) {
    for (const k of keys) {
        fireEvent.keyDown(container, {
            key: k.key,
            shiftKey: k.shiftKey,
            ctrlKey: k.ctrlKey,
            metaKey: k.metaKey,
        });
    }
}

describe('useListBehavior / containerProps', () => {
    it('sets the listbox role and a generated id', () => {
        const {container} = renderList({items: flat});
        expect(container).toHaveAttribute('role', 'listbox');
        expect(container).toHaveAttribute('id');
    });

    it('uses the provided id for the container and derives row ids from it', () => {
        const {container} = renderList({items: flat, id: 'my-list'});
        expect(container).toHaveAttribute('id', 'my-list');
        expect(getRow('a')).toHaveAttribute('id', 'my-list-item-a');
    });

    it('marks the container multiselectable only for multiple selection', () => {
        const {container: singleContainer, unmount} = renderList({
            items: flat,
            selectionMode: 'single',
        });
        expect(singleContainer).not.toHaveAttribute('aria-multiselectable');
        unmount();
        const {container: multipleContainer} = renderList({
            items: flat,
            selectionMode: 'multiple',
        });
        expect(multipleContainer).toHaveAttribute('aria-multiselectable', 'true');
    });

    it('keeps a single roving tab stop that follows the active row', () => {
        const {container} = renderList({items: flat});
        // No active row yet — the first navigable row is the tab stop.
        expect(tabbableOf(container)).toBe('a');
        expect(getRow('a').tabIndex).toBe(0);
        expect(getRow('b').tabIndex).toBe(-1);
        // First ArrowDown activates the first row, the second moves to the next.
        press(container, [{key: KeyCode.ARROW_DOWN}, {key: KeyCode.ARROW_DOWN}]);
        expect(tabbableOf(container)).toBe('b');
        expect(getRow('a').tabIndex).toBe(-1);
    });

    it('exposes aria-selected on options only when selection is on', () => {
        const {unmount} = renderList({items: flat});
        expect(getRow('a')).not.toHaveAttribute('aria-selected');
        unmount();
        renderList({items: flat, selectionMode: 'single'});
        expect(getRow('a')).toHaveAttribute('aria-selected', 'false');
    });
});

// The parameterized keyboard matrix — role × key × selectionMode × direction. The listbox machine
// is direction-agnostic, so every case is asserted identical under LTR and RTL.
interface MatrixCase {
    name: string;
    items?: Node[];
    selectionMode?: ListSelectionMode;
    defaultSelectedIds?: string[];
    defaultActiveItemId?: string;
    keys: KeyPress[];
    expectedActive?: string;
    expectedSelected?: string[];
}

const DOWN: KeyPress = {key: KeyCode.ARROW_DOWN};
const UP: KeyPress = {key: KeyCode.ARROW_UP};

const matrix: MatrixCase[] = [
    // Navigation
    {name: 'ArrowDown → next', defaultActiveItemId: 'a', keys: [DOWN], expectedActive: 'b'},
    {name: 'ArrowUp → previous', defaultActiveItemId: 'b', keys: [UP], expectedActive: 'a'},
    {
        name: 'ArrowDown stops at the last row',
        defaultActiveItemId: 'e',
        keys: [DOWN],
        expectedActive: 'e',
    },
    {
        name: 'ArrowUp stops at the first row',
        defaultActiveItemId: 'a',
        keys: [UP],
        expectedActive: 'a',
    },
    {name: 'ArrowDown with no active → first', keys: [DOWN], expectedActive: 'a'},
    {name: 'ArrowUp with no active → last', keys: [UP], expectedActive: 'e'},
    {
        name: 'Home → first',
        defaultActiveItemId: 'c',
        keys: [{key: KeyCode.HOME}],
        expectedActive: 'a',
    },
    {name: 'End → last', defaultActiveItemId: 'c', keys: [{key: KeyCode.END}], expectedActive: 'e'},
    {
        name: 'ArrowRight is inert',
        defaultActiveItemId: 'c',
        keys: [{key: KeyCode.ARROW_RIGHT}],
        expectedActive: 'c',
    },
    {
        name: 'ArrowLeft is inert',
        defaultActiveItemId: 'c',
        keys: [{key: KeyCode.ARROW_LEFT}],
        expectedActive: 'c',
    },
    {
        name: 'ArrowDown lands on a disabled row (still navigable)',
        items: withDisabled,
        defaultActiveItemId: 'b',
        keys: [DOWN],
        expectedActive: 'c',
    },
    // Single selection
    {
        name: 'Space selects (single)',
        selectionMode: 'single',
        defaultActiveItemId: 'c',
        keys: [{key: KeyCode.SPACEBAR}],
        expectedActive: 'c',
        expectedSelected: ['c'],
    },
    {
        name: 'Enter selects when there is no action (single)',
        selectionMode: 'single',
        defaultActiveItemId: 'b',
        keys: [{key: KeyCode.ENTER}],
        expectedSelected: ['b'],
    },
    {
        name: 'Space without a selection mode is inert',
        defaultActiveItemId: 'b',
        keys: [{key: KeyCode.SPACEBAR}],
        expectedActive: 'b',
        expectedSelected: [],
    },
    {
        name: 'Shift+ArrowDown only moves (single)',
        selectionMode: 'single',
        defaultActiveItemId: 'a',
        keys: [{key: KeyCode.ARROW_DOWN, shiftKey: true}],
        expectedActive: 'b',
        expectedSelected: [],
    },
    // Multiple selection
    {
        name: 'Space toggles on (multiple)',
        selectionMode: 'multiple',
        defaultActiveItemId: 'c',
        keys: [{key: KeyCode.SPACEBAR}],
        expectedSelected: ['c'],
    },
    {
        name: 'Space toggles off (multiple)',
        selectionMode: 'multiple',
        defaultSelectedIds: ['c'],
        defaultActiveItemId: 'c',
        keys: [{key: KeyCode.SPACEBAR}],
        expectedSelected: [],
    },
    {
        name: 'Space does not select a disabled row (multiple)',
        items: withDisabled,
        selectionMode: 'multiple',
        defaultActiveItemId: 'c',
        keys: [{key: KeyCode.SPACEBAR}],
        expectedActive: 'c',
        expectedSelected: [],
    },
    {
        name: 'Ctrl+A selects all visible (multiple)',
        selectionMode: 'multiple',
        defaultActiveItemId: 'a',
        keys: [{key: 'a', ctrlKey: true}],
        expectedSelected: ['a', 'b', 'c', 'd', 'e'],
    },
    {
        name: 'Cmd+A selects all visible (multiple)',
        selectionMode: 'multiple',
        defaultActiveItemId: 'a',
        keys: [{key: 'a', metaKey: true}],
        expectedSelected: ['a', 'b', 'c', 'd', 'e'],
    },
    {
        name: 'Ctrl+A is inert (single)',
        selectionMode: 'single',
        defaultActiveItemId: 'a',
        keys: [{key: 'a', ctrlKey: true}],
        expectedSelected: [],
    },
    {
        name: 'Shift+ArrowDown starts a range (multiple)',
        selectionMode: 'multiple',
        defaultActiveItemId: 'a',
        keys: [{key: KeyCode.ARROW_DOWN, shiftKey: true}],
        expectedActive: 'b',
        expectedSelected: ['b'],
    },
    {
        name: 'Shift+ArrowDown extends the range (multiple)',
        selectionMode: 'multiple',
        defaultActiveItemId: 'a',
        keys: [
            {key: KeyCode.ARROW_DOWN, shiftKey: true},
            {key: KeyCode.ARROW_DOWN, shiftKey: true},
        ],
        expectedActive: 'c',
        expectedSelected: ['b', 'c'],
    },
    {
        name: 'Shift+ArrowUp extends upward (multiple)',
        selectionMode: 'multiple',
        defaultActiveItemId: 'e',
        keys: [
            {key: KeyCode.ARROW_UP, shiftKey: true},
            {key: KeyCode.ARROW_UP, shiftKey: true},
        ],
        expectedActive: 'c',
        expectedSelected: ['c', 'd'],
    },
    {
        name: 'Shift+Home extends to the first row (multiple)',
        selectionMode: 'multiple',
        defaultActiveItemId: 'c',
        keys: [{key: KeyCode.SPACEBAR}, {key: KeyCode.HOME, shiftKey: true}],
        expectedActive: 'a',
        expectedSelected: ['a', 'b', 'c'],
    },
    {
        name: 'Shift+End extends to the last row (multiple)',
        selectionMode: 'multiple',
        defaultActiveItemId: 'c',
        keys: [{key: KeyCode.SPACEBAR}, {key: KeyCode.END, shiftKey: true}],
        expectedActive: 'e',
        expectedSelected: ['c', 'd', 'e'],
    },
    {
        // Appendix decision: a shift range spans disabled rows by position but never selects them.
        name: 'Shift range spans a disabled row but skips it in the selection (multiple)',
        items: withDisabled,
        selectionMode: 'multiple',
        defaultActiveItemId: 'a',
        keys: [
            {key: KeyCode.SPACEBAR},
            {key: KeyCode.ARROW_DOWN, shiftKey: true},
            {key: KeyCode.ARROW_DOWN, shiftKey: true},
            {key: KeyCode.ARROW_DOWN, shiftKey: true},
        ],
        expectedActive: 'd',
        expectedSelected: ['a', 'b', 'd'],
    },
];

describe.each<Direction>(['ltr', 'rtl'])('useListBehavior / keyboard matrix (%s)', (direction) => {
    it.each(matrix)('$name', (testCase) => {
        const {container} = renderList(
            {
                items: testCase.items ?? flat,
                selectionMode: testCase.selectionMode,
                defaultSelectedIds: testCase.defaultSelectedIds,
                defaultActiveItemId: testCase.defaultActiveItemId,
                // Off so a typed key never competes with the assertions in this matrix.
                typeahead: false,
            },
            direction,
        );
        press(container, testCase.keys);
        if (testCase.expectedActive !== undefined) {
            expect(activeOf(container)).toBe(testCase.expectedActive);
        }
        expect(selectedOf(container)).toEqual((testCase.expectedSelected ?? []).sort());
    });
});

describe('useListBehavior / roving focus', () => {
    it('moves real DOM focus with the active row', () => {
        const {container} = renderList({items: flat, defaultActiveItemId: 'a'});
        press(container, [{key: KeyCode.ARROW_DOWN}]);
        expect(getRow('b')).toHaveFocus();
        press(container, [{key: KeyCode.END}]);
        expect(getRow('e')).toHaveFocus();
    });

    it('syncs the active row when a row receives focus', () => {
        const {container} = renderList({items: flat});
        fireEvent.focus(getRow('c'));
        expect(activeOf(container)).toBe('c');
    });
});

describe('useListBehavior / sections and disabled navigability', () => {
    it('renders section headers as transparent presentation rows', () => {
        renderList({items: sections, defaultExpandedIds: ['s1', 's2']});
        const header = getRow('s1');
        expect(header).toHaveAttribute('role', 'presentation');
        expect(header.hasAttribute('tabindex')).toBe(false);
        expect(header).not.toHaveAttribute('aria-selected');
    });

    it('steps over section headers during navigation', () => {
        const {container} = renderList({
            items: sections,
            defaultExpandedIds: ['s1', 's2'],
            defaultActiveItemId: 'b',
        });
        // b is the last option of s1; the next navigable row is c (skipping the s2 header).
        press(container, [{key: KeyCode.ARROW_DOWN}]);
        expect(activeOf(container)).toBe('c');
    });

    it('ignores clicks on a section header', () => {
        const onSelectedUpdate = jest.fn();
        const {container} = renderList({
            items: sections,
            defaultExpandedIds: ['s1', 's2'],
            selectionMode: 'single',
            onSelectedUpdate,
        });
        fireEvent.click(getRow('s1'));
        expect(onSelectedUpdate).not.toHaveBeenCalled();
        expect(activeOf(container)).toBeUndefined();
    });

    it('keeps disabled rows navigable but not selectable', () => {
        const {container} = renderList({
            items: withDisabled,
            selectionMode: 'multiple',
            defaultActiveItemId: 'b',
        });
        press(container, [{key: KeyCode.ARROW_DOWN}]);
        expect(activeOf(container)).toBe('c');
        press(container, [{key: KeyCode.SPACEBAR}]);
        expect(selectedOf(container)).toEqual([]);
    });
});

describe('useListBehavior / typeahead', () => {
    it('activates the first item matching the typed prefix', () => {
        const {container} = renderList({items: flat});
        fireEvent.keyDown(container, {key: 'c'});
        expect(activeOf(container)).toBe('c');
    });

    it('cycles through same-letter matches on repeated keys', () => {
        const items: Node[] = [
            {id: 'a1', label: 'Apple'},
            {id: 'a2', label: 'Avocado'},
            {id: 'b1', label: 'Banana'},
        ];
        const {container} = renderList({items});
        fireEvent.keyDown(container, {key: 'a'});
        expect(activeOf(container)).toBe('a1');
        fireEvent.keyDown(container, {key: 'a'});
        expect(activeOf(container)).toBe('a2');
    });

    it('resets the buffer after the timeout', () => {
        jest.useFakeTimers();
        try {
            const items: Node[] = [
                {id: 'a', label: 'Alpha'},
                {id: 'b', label: 'Bravo'},
            ];
            const {container} = renderList({items});
            fireEvent.keyDown(container, {key: 'a'});
            expect(activeOf(container)).toBe('a');
            act(() => {
                jest.advanceTimersByTime(1100);
            });
            // Buffer reset — `b` searches fresh for "Bravo" instead of extending to "ab" (no match).
            fireEvent.keyDown(container, {key: 'b'});
            expect(activeOf(container)).toBe('b');
        } finally {
            jest.useRealTimers();
        }
    });

    it('can be turned off', () => {
        const {container} = renderList({items: flat, typeahead: false, defaultActiveItemId: 'a'});
        fireEvent.keyDown(container, {key: 'c'});
        expect(activeOf(container)).toBe('a');
    });
});

describe('useListBehavior / hover activation', () => {
    it('activates on hover and clears on leave by default', () => {
        const {container} = renderList({items: flat});
        fireEvent.pointerEnter(getRow('b'));
        expect(activeOf(container)).toBe('b');
        fireEvent.pointerLeave(getRow('b'));
        expect(activeOf(container)).toBeUndefined();
    });

    it('keeps the active row on leave with activateOnHover="keep"', () => {
        const {container} = renderList({items: flat, activateOnHover: 'keep'});
        fireEvent.pointerEnter(getRow('b'));
        fireEvent.pointerLeave(getRow('b'));
        expect(activeOf(container)).toBe('b');
    });

    it('does not activate on hover with activateOnHover=false', () => {
        const {container} = renderList({items: flat, activateOnHover: false});
        fireEvent.pointerEnter(getRow('b'));
        expect(activeOf(container)).toBeUndefined();
    });
});

describe('useListBehavior / controlled active', () => {
    it('emits onActiveItemUpdate without moving a controlled active row', () => {
        const onActiveItemUpdate = jest.fn();
        const {container} = renderList({items: flat, activeItemId: 'b', onActiveItemUpdate});
        expect(activeOf(container)).toBe('b');
        press(container, [{key: KeyCode.ARROW_DOWN}]);
        // A single update per active change, even though moving focus fires a focus event too.
        expect(onActiveItemUpdate).toHaveBeenCalledTimes(1);
        expect(onActiveItemUpdate).toHaveBeenCalledWith('c');
        // Controlled — the parent has not applied the update, so the active row stays put.
        expect(activeOf(container)).toBe('b');
    });

    it('follows the controlled value once the parent applies it', () => {
        function Controlled() {
            const [active, setActive] = React.useState<string | undefined>('b');
            return <Harness items={flat} activeItemId={active} onActiveItemUpdate={setActive} />;
        }
        render(<Controlled />);
        const container = getRow('container');
        press(container, [{key: KeyCode.ARROW_DOWN}]);
        expect(activeOf(container)).toBe('c');
    });

    it('seeds the initial active row from the first selectable selected id', () => {
        const {container} = renderList({
            items: withDisabled,
            selectionMode: 'single',
            // `c` is disabled, so the seed skips it to the next selected enabled row.
            defaultSelectedIds: ['c', 'd'],
        });
        expect(activeOf(container)).toBe('d');
    });
});

describe('useListBehavior / onItemAction', () => {
    it('fires on Enter and takes precedence over selection', () => {
        const onItemAction = jest.fn();
        const {container} = renderList({
            items: flat,
            selectionMode: 'single',
            defaultActiveItemId: 'b',
            onItemAction,
        });
        press(container, [{key: KeyCode.ENTER}]);
        expect(onItemAction).toHaveBeenCalledTimes(1);
        expect(onItemAction.mock.calls[0][0].id).toBe('b');
        expect(selectedOf(container)).toEqual([]);
    });

    it('fires on a single click when there is no selection mode', () => {
        const onItemAction = jest.fn();
        renderList({items: flat, onItemAction});
        fireEvent.click(getRow('b'));
        expect(onItemAction.mock.calls[0][0].id).toBe('b');
    });

    it('fires on double click even with a selection mode', () => {
        const onItemAction = jest.fn();
        renderList({items: flat, selectionMode: 'multiple', onItemAction});
        fireEvent.doubleClick(getRow('b'));
        expect(onItemAction.mock.calls[0][0].id).toBe('b');
    });

    it('does not fire for a disabled row', () => {
        const onItemAction = jest.fn();
        renderList({items: withDisabled, onItemAction});
        fireEvent.click(getRow('c'));
        expect(onItemAction).not.toHaveBeenCalled();
    });
});

describe('useListBehavior / pointer selection', () => {
    it('selects on click in single mode', () => {
        const {container} = renderList({items: flat, selectionMode: 'single'});
        fireEvent.click(getRow('b'));
        expect(selectedOf(container)).toEqual(['b']);
    });

    it('toggles on click in multiple mode', () => {
        const {container} = renderList({items: flat, selectionMode: 'multiple'});
        fireEvent.click(getRow('b'));
        expect(selectedOf(container)).toEqual(['b']);
        fireEvent.click(getRow('b'));
        expect(selectedOf(container)).toEqual([]);
    });

    it('extends the range on shift+click in multiple mode', () => {
        const {container} = renderList({items: flat, selectionMode: 'multiple'});
        fireEvent.click(getRow('a'));
        fireEvent.click(getRow('c'), {shiftKey: true});
        expect(selectedOf(container)).toEqual(['a', 'b', 'c']);
    });
});

describe('useListBehavior / disabled list', () => {
    it('marks the container disabled and removes every tab stop', () => {
        const {container} = renderList({items: flat, disabled: true});
        expect(container).toHaveAttribute('aria-disabled', 'true');
        expect(tabbableOf(container)).toBeUndefined();
        expect(getRow('a').tabIndex).toBe(-1);
    });

    it('mutes keyboard, pointer and typeahead interactions', () => {
        const onItemAction = jest.fn();
        const {container} = renderList({
            items: flat,
            selectionMode: 'multiple',
            defaultActiveItemId: 'a',
            disabled: true,
            onItemAction,
        });
        press(container, [{key: KeyCode.ARROW_DOWN}, {key: KeyCode.SPACEBAR}, {key: 'c'}]);
        fireEvent.click(getRow('b'));
        fireEvent.pointerEnter(getRow('b'));
        expect(activeOf(container)).toBe('a');
        expect(selectedOf(container)).toEqual([]);
        expect(onItemAction).not.toHaveBeenCalled();
    });
});

describe('useListBehavior / api', () => {
    it('focuses and activates a row, and is a no-op for a section header', () => {
        const apiRef: {current: ListApi | null} = {current: null};
        renderList({
            items: sections,
            defaultExpandedIds: ['s1', 's2'],
            apiRef,
        });
        act(() => apiRef.current?.focusItem('a'));
        expect(getRow('a')).toHaveFocus();
        expect(apiRef.current?.getActiveItemId()).toBe('a');

        act(() => apiRef.current?.focusItem('s1'));
        // Section header — focusItem is a no-op, the active row is unchanged.
        expect(apiRef.current?.getActiveItemId()).toBe('a');
    });

    it('sets the active row without moving focus via setActiveItemId', () => {
        const apiRef: {current: ListApi | null} = {current: null};
        const {container} = renderList({items: flat, apiRef});
        act(() => apiRef.current?.setActiveItemId('d'));
        expect(activeOf(container)).toBe('d');
        expect(getRow('d')).not.toHaveFocus();
    });

    it('resolves elements and ids in both directions', () => {
        const apiRef: {current: ListApi | null} = {current: null};
        renderList({items: flat, apiRef});
        const row = getRow('c');
        expect(apiRef.current?.getElementById('c')).toBe(row);
        expect(apiRef.current?.getItemIdByElement(row)).toBe('c');
        const child = document.createElement('span');
        row.appendChild(child);
        expect(apiRef.current?.getItemIdByElement(child)).toBe('c');
    });

    it('reports the visible items with structural metadata', () => {
        const apiRef: {current: ListApi | null} = {current: null};
        renderList({items: sections, defaultExpandedIds: ['s1', 's2'], apiRef});
        const visible = apiRef.current?.getVisibleItems() ?? [];
        expect(visible.map((v) => v.id)).toEqual(['s1', 'a', 'b', 's2', 'c', 'd']);
        expect(visible.find((v) => v.id === 'a')).toMatchObject({
            level: 1,
            index: 0,
            parentId: 's1',
        });
    });

    it('forwards keyboard events through handleKeyDown', () => {
        const apiRef: {current: ListApi | null} = {current: null};
        const {container} = renderList({items: flat, apiRef});
        act(() => apiRef.current?.setActiveItemId('a'));
        act(() =>
            apiRef.current?.handleKeyDown(new KeyboardEvent('keydown', {key: KeyCode.ARROW_DOWN})),
        );
        expect(activeOf(container)).toBe('b');
    });

    it('scrolls a row into view', () => {
        const apiRef: {current: ListApi | null} = {current: null};
        renderList({items: flat, apiRef});
        const row = getRow('c');
        row.scrollIntoView = jest.fn();
        act(() => apiRef.current?.scrollToItem('c', {align: 'center'}));
        expect(row.scrollIntoView).toHaveBeenCalledWith({block: 'center'});
    });

    it('expands a lazy node and requests its children', () => {
        const onLoadChildren = jest.fn();
        const apiRef: {current: ListApi | null} = {current: null};
        renderList({
            items: [{id: 'folder', childrenState: 'lazy'}],
            role: 'tree',
            apiRef,
            onLoadChildren,
        });
        act(() => apiRef.current?.expand('folder'));
        expect(onLoadChildren).toHaveBeenCalledTimes(1);
        expect(onLoadChildren.mock.calls[0][0].id).toBe('folder');
    });
});
