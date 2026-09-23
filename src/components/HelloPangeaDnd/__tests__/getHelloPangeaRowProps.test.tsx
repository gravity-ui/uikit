// eslint-disable-next-line no-restricted-imports
import type {DraggableProvided, DraggableStateSnapshot} from '@hello-pangea/dnd';

import {render, screen} from '../../../../test-utils/utils';
import {Lang, configure} from '../../../utils/configure';
import type {ListItemContext, ListItemHelpers, ListPropsOverrides} from '../../List/types';
import {HelloPangeaDragHandle} from '../HelloPangeaDragHandle';
import {getHelloPangeaRowProps} from '../getHelloPangeaRowProps';

const ctx: ListItemContext<string> = {
    id: 'a',
    item: 'a',
    index: 0,
    kind: 'item',
    content: 'a',
    state: {active: false, disabled: false},
};

const coreRef = jest.fn();

/** The core composes the overrides into its own props: here — a plain merge, enough to see what went in */
const helpers = (role: 'grid' | 'listbox' = 'grid'): ListItemHelpers => ({
    getItemProps: (overrides?: ListPropsOverrides) =>
        ({role: 'row', ...overrides, ref: coreRef}) as ReturnType<ListItemHelpers['getItemProps']>,
    getItemViewProps: () => ({}),
    getCellProps: () => (role === 'grid' ? {role: 'gridcell'} : {}),
});

const innerRef = jest.fn();

const provided = (dragHandle = true): DraggableProvided => ({
    innerRef,
    draggableProps: {
        'data-rfd-draggable-context-id': '0',
        'data-rfd-draggable-id': 'a',
        style: {
            transform: 'translate(0px, 28px)',
            transition: 'opacity 0.2s',
        } as DraggableProvided['draggableProps']['style'],
    },
    dragHandleProps: dragHandle
        ? {
              role: 'button',
              tabIndex: 0,
              draggable: false,
              'aria-describedby': 'hint',
              'data-rfd-drag-handle-draggable-id': 'a',
              'data-rfd-drag-handle-context-id': '0',
              onDragStart: jest.fn(),
          }
        : null,
});

const snapshot = (patch: Partial<DraggableStateSnapshot> = {}) =>
    ({isDragging: false, isDropAnimating: false, ...patch}) as DraggableStateSnapshot;

describe('getHelloPangeaRowProps', () => {
    test('the draggable props and the ref of the library go through the core props of the row', () => {
        const rowHelpers = helpers();
        const getItemProps = jest.spyOn(rowHelpers, 'getItemProps');
        const {rowProps} = getHelloPangeaRowProps({
            ctx,
            helpers: rowHelpers,
            provided: provided(),
            snapshot: snapshot(),
        });

        expect(getItemProps).toHaveBeenCalledWith(
            expect.objectContaining({ref: innerRef, 'data-rfd-draggable-id': 'a'}),
        );
        expect(rowProps).toMatchObject({role: 'row', 'data-rfd-draggable-id': 'a'});
        expect(rowProps.style).toEqual({
            transform: 'translate(0px, 28px)',
            transition: 'opacity 0.2s',
        });
    });

    test('the transition of the library is off during an active drag, back for the drop animation', () => {
        const dragging = getHelloPangeaRowProps({
            ctx,
            helpers: helpers(),
            provided: provided(),
            snapshot: snapshot({isDragging: true}),
        });
        expect(dragging.rowProps.style).toMatchObject({transition: 'none'});

        const dropping = getHelloPangeaRowProps({
            ctx,
            helpers: helpers(),
            provided: provided(),
            snapshot: snapshot({isDragging: true, isDropAnimating: true}),
        });
        expect(dropping.rowProps.style).toMatchObject({transition: 'opacity 0.2s'});
    });

    test('the handle: out of the tab order, with a name', () => {
        const {handleProps, cellProps} = getHelloPangeaRowProps({
            ctx,
            helpers: helpers(),
            provided: provided(),
            snapshot: snapshot(),
        });
        expect(handleProps).toMatchObject({
            role: 'button',
            tabIndex: -1,
            'aria-label': 'Drag to reorder',
            'data-rfd-drag-handle-draggable-id': 'a',
        });
        expect(cellProps).toEqual({role: 'gridcell'});

        expect(
            getHelloPangeaRowProps({
                ctx,
                helpers: helpers(),
                provided: provided(),
                snapshot: snapshot(),
                handleLabel: 'Move',
            }).handleProps['aria-label'],
        ).toBe('Move');
    });

    test('a row that cannot be dragged gets a decorative handle', () => {
        const {handleProps} = getHelloPangeaRowProps({
            ctx,
            helpers: helpers(),
            provided: provided(false),
            snapshot: snapshot(),
        });
        expect(handleProps).toEqual({tabIndex: -1, 'aria-hidden': true});
    });

    test('dev warnings: a listbox, a section header', () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        try {
            getHelloPangeaRowProps({
                ctx: {...ctx, kind: 'section'},
                helpers: helpers('listbox'),
                provided: provided(),
                snapshot: snapshot(),
            });
            expect(consoleErrorSpy).toHaveBeenCalledWith(
                expect.stringContaining('Pass `role="grid"` to the List'),
            );
            expect(consoleErrorSpy).toHaveBeenCalledWith(
                expect.stringContaining('Flat lists only'),
            );
        } finally {
            consoleErrorSpy.mockRestore();
        }
    });
});

describe('HelloPangeaDragHandle', () => {
    afterEach(() => configure({lang: Lang.En}));

    test('the name: label, then aria-label, then the built-in text of the language', () => {
        const {rerender} = render(<HelloPangeaDragHandle label="Move" aria-label="ignored" />);
        expect(screen.getByLabelText('Move')).toHaveAttribute('tabindex', '-1');

        rerender(<HelloPangeaDragHandle aria-label="Reorder" />);
        expect(screen.getByLabelText('Reorder')).toBeInTheDocument();

        configure({lang: Lang.Ru});
        rerender(<HelloPangeaDragHandle />);
        expect(screen.getByLabelText('Перетащите, чтобы изменить порядок')).toBeInTheDocument();
    });

    test('children replace the grip', () => {
        render(<HelloPangeaDragHandle>⋮</HelloPangeaDragHandle>);
        expect(screen.getByLabelText('Drag to reorder')).toHaveTextContent('⋮');
    });
});
