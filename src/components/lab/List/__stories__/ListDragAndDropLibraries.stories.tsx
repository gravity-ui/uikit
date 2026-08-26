import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {DragAndDropDndKitExample} from './DragAndDropDndKitExample';
import dragAndDropDndKitCode from './DragAndDropDndKitExample?raw';
import {DragAndDropDndKitVirtualizedExample} from './DragAndDropDndKitVirtualizedExample';
import dragAndDropDndKitVirtualizedCode from './DragAndDropDndKitVirtualizedExample?raw';
import {DragAndDropPragmaticExample} from './DragAndDropPragmaticExample';
import dragAndDropPragmaticCode from './DragAndDropPragmaticExample?raw';
import {DragAndDropPragmaticVirtualizedExample} from './DragAndDropPragmaticVirtualizedExample';
import dragAndDropPragmaticVirtualizedCode from './DragAndDropPragmaticVirtualizedExample?raw';
import {exampleSource} from './exampleSource';
import useDndKitListDndCode from './useDndKitListDnd?raw';
import usePragmaticListDndCode from './usePragmaticListDnd?raw';

// Drag and drop on top of libraries other than the recommended
// @hello-pangea/dnd (the DragAndDrop stories of Lab/List). These are examples
// of plugging a library into the adapter contract of the `dnd` prop, in its
// two shapes: an adapter of props and state (pragmatic-drag-and-drop — the
// insertion line is drawn by the list) and a state-only adapter (dnd-kit — the
// neighbours shift). Each library is shown on a plain list and on a
// virtualized one; the Code panel of a story holds the complete source of the
// example together with its adapter hook
const meta: Meta = {
    title: 'Lab/List/Drag and drop with other libraries',
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
