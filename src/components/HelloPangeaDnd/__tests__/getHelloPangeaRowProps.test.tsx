// eslint-disable-next-line no-restricted-imports
import type {DraggableProvided, DraggableStateSnapshot} from '@hello-pangea/dnd';

import {render, screen} from '../../../../test-utils/utils';
import {Lang, configure} from '../../../utils/configure';
import type {ListItemContext, ListItemHelpers, ListPropsOverrides} from '../../List/types';
import {HelloPangeaDragHandle} from '../HelloPangeaDragHandle';
import {forwardDetachedTouches} from '../forwardDetachedTouches';
import {getHelloPangeaRowProps} from '../getHelloPangeaRowProps';
import type {GetHelloPangeaRowPropsOptions} from '../getHelloPangeaRowProps';

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

const call = (options: Partial<GetHelloPangeaRowPropsOptions<string>> = {}) =>
    getHelloPangeaRowProps({
        ctx,
        helpers: helpers(),
        provided: provided(),
        snapshot: snapshot(),
        ...options,
    });

describe('getHelloPangeaRowProps', () => {
    test('the draggable props and the ref of the library go through the core props of the row', () => {
        const rowHelpers = helpers();
        const getItemProps = jest.spyOn(rowHelpers, 'getItemProps');
        const {rowProps} = call({helpers: rowHelpers});

        expect(rowProps).toMatchObject({role: 'row', 'data-rfd-draggable-id': 'a'});
        expect(rowProps.style).toEqual({
            transform: 'translate(0px, 28px)',
            transition: 'opacity 0.2s',
        });
        const {ref} = getItemProps.mock.calls[0][0] as {ref: (element: HTMLElement) => void};
        const element = document.createElement('div');
        ref(element);
        expect(innerRef).toHaveBeenCalledWith(element);
    });

    test('the transition of the library is off during an active drag, back for the drop animation', () => {
        expect(call({snapshot: snapshot({isDragging: true})}).rowProps.style).toMatchObject({
            transition: 'none',
        });
        expect(
            call({snapshot: snapshot({isDragging: true, isDropAnimating: true})}).rowProps.style,
        ).toMatchObject({transition: 'opacity 0.2s'});
    });

    test('the handle: out of the tab order, with a name', () => {
        const {handleProps, cellProps} = call();
        expect(handleProps).toEqual({
            ...provided().dragHandleProps,
            onDragStart: expect.any(Function),
            onTouchStart: forwardDetachedTouches,
            tabIndex: -1,
            'aria-label': 'Drag to reorder',
        });
        expect(cellProps).toEqual({role: 'gridcell'});
    });

    test('a row that cannot be dragged gets a decorative handle, not focusable', () => {
        expect(call({provided: provided(false)}).handleProps).toEqual({'aria-hidden': true});
    });

    test('dev warnings: a listbox, a section header', () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        try {
            call({ctx: {...ctx, kind: 'section'}, helpers: helpers('listbox')});
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

    test('the name: aria-label, then the built-in text of the language', () => {
        const {rerender} = render(<HelloPangeaDragHandle aria-label="Reorder" qa="handle" />);
        expect(screen.getByLabelText('Reorder')).toHaveAttribute('tabindex', '-1');
        expect(screen.getByTestId('handle')).toBe(screen.getByLabelText('Reorder'));

        configure({lang: Lang.Ru});
        rerender(<HelloPangeaDragHandle />);
        expect(screen.getByLabelText('Перетащите, чтобы изменить порядок')).toBeInTheDocument();
    });

    test('aria-hidden makes the handle decorative: no name, not focusable', () => {
        const {rerender} = render(<HelloPangeaDragHandle aria-hidden qa="handle" />);
        expect(screen.getByTestId('handle')).not.toHaveAttribute('aria-label');
        expect(screen.getByTestId('handle')).not.toHaveAttribute('tabindex');

        rerender(<HelloPangeaDragHandle aria-hidden="false" qa="handle" />);
        expect(screen.getByTestId('handle')).toHaveAttribute('tabindex', '-1');
    });

    test('children replace the grip', () => {
        render(<HelloPangeaDragHandle>⋮</HelloPangeaDragHandle>);
        expect(screen.getByLabelText('Drag to reorder')).toHaveTextContent('⋮');
    });
});
