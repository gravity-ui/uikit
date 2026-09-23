import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {DragAndDropDndKitExample} from './DragAndDropDndKitExample';
import dragAndDropDndKitCode from './DragAndDropDndKitExample?raw';
import {DragAndDropDndKitVirtualizedExample} from './DragAndDropDndKitVirtualizedExample';
import dragAndDropDndKitVirtualizedCode from './DragAndDropDndKitVirtualizedExample?raw';
import {DragAndDropPragmaticExample} from './DragAndDropPragmaticExample';
import dragAndDropPragmaticCode from './DragAndDropPragmaticExample?raw';
import {DragAndDropPragmaticVirtualizedExample} from './DragAndDropPragmaticVirtualizedExample';
import dragAndDropPragmaticVirtualizedCode from './DragAndDropPragmaticVirtualizedExample?raw';
import {HelloPangeaManualExample} from './HelloPangeaManualExample';
import helloPangeaManualCode from './HelloPangeaManualExample?raw';
import {HelloPangeaManualVirtualizedExample} from './HelloPangeaManualVirtualizedExample';
import helloPangeaManualVirtualizedCode from './HelloPangeaManualVirtualizedExample?raw';
import {exampleSource} from './exampleSource';
import useDndKitListDndCode from './useDndKitListDnd?raw';
import usePragmaticListDndCode from './usePragmaticListDnd?raw';

// Drag and drop integrations: how a library plugs into the adapter contract of
// the `dnd` prop. @hello-pangea/dnd under the hood — the wiring the kit of the
// DragAndDrop stories of the List does for you, written by hand; and two other
// libraries in the two shapes of the adapter: props and state
// (pragmatic-drag-and-drop — the insertion line is drawn by the list) and
// state only (dnd-kit — the neighbours shift). Each is shown on a plain list and
// on a virtualized one; the Code panel of a story holds the complete source of
// the example together with its adapter hook
const meta: Meta = {
    title: 'Components/Data Display/List/Drag and drop integrations',
    parameters: {
        layout: 'centered',
        a11y: {
            context: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: false,
                    },
                ],
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

// @hello-pangea/dnd by hand: DragDropContext, Droppable and Draggable of your
// own, the state from useListHelloPangeaDnd, the placeholder through the adapter
export const HelloPangeaUnderTheHood: Story = {
    render: () => <HelloPangeaManualExample />,
    parameters: {
        docs: {
            source: {
                language: 'tsx',
                code: exampleSource([['HelloPangeaManualExample.tsx', helloPangeaManualCode]]),
            },
        },
    },
};

// @hello-pangea/dnd by hand under virtualization: mode="virtual", renderClone
// and the container of the clone inside the themed tree
export const HelloPangeaUnderTheHoodVirtualized: Story = {
    render: () => <HelloPangeaManualVirtualizedExample />,
    parameters: {
        docs: {
            source: {
                language: 'tsx',
                code: exampleSource([
                    ['HelloPangeaManualVirtualizedExample.tsx', helloPangeaManualVirtualizedCode],
                ]),
            },
        },
    },
};

// pragmatic-drag-and-drop: the "full" form of the adapter (props through ref
// registration of the rows plus the state, all in a single dnd prop)
export const PragmaticDragAndDrop: Story = {
    render: () => <DragAndDropPragmaticExample />,
    parameters: {
        docs: {
            source: {
                language: 'tsx',
                code: exampleSource([
                    ['DragAndDropPragmaticExample.tsx', dragAndDropPragmaticCode],
                    ['usePragmaticListDnd.ts', usePragmaticListDndCode],
                ]),
            },
        },
    },
};

// pragmatic × virtualization: the same single-prop dnd integration on top of a
// window of rows
export const PragmaticDragAndDropVirtualized: Story = {
    render: () => <DragAndDropPragmaticVirtualizedExample />,
    parameters: {
        docs: {
            source: {
                language: 'tsx',
                code: exampleSource([
                    [
                        'DragAndDropPragmaticVirtualizedExample.tsx',
                        dragAndDropPragmaticVirtualizedCode,
                    ],
                    ['usePragmaticListDnd.ts', usePragmaticListDndCode],
                ]),
            },
        },
    },
};

// dnd-kit: a "state-only" adapter plus the per-item useSortable hook in the
// consumer's own row component through renderItem
export const DndKit: Story = {
    render: () => <DragAndDropDndKitExample />,
    parameters: {
        docs: {
            source: {
                language: 'tsx',
                code: exampleSource([
                    ['DragAndDropDndKitExample.tsx', dragAndDropDndKitCode],
                    ['useDndKitListDnd.ts', useDndKitListDndCode],
                ]),
            },
        },
    },
};

// dnd-kit × virtualization — the recipe dnd-kit prescribes for virtual lists:
// a DragOverlay flies with the cursor while the original is hidden for the
// duration of the drag (its slot is covered by the preview shift of the
// neighbours) and survives being unmounted from the window (see the header of
// the example for the details)
export const DndKitVirtualized: Story = {
    render: () => <DragAndDropDndKitVirtualizedExample />,
    parameters: {
        docs: {
            source: {
                language: 'tsx',
                code: exampleSource([
                    ['DragAndDropDndKitVirtualizedExample.tsx', dragAndDropDndKitVirtualizedCode],
                    ['useDndKitListDnd.ts', useDndKitListDndCode],
                ]),
            },
        },
    },
};
