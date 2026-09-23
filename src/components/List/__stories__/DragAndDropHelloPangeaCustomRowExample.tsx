/**
 * Drag and drop with @hello-pangea/dnd and rows of your own markup: the row is
 * not `List.ItemView`, so `ListHelloPangeaDnd.Row` does not fit. Write the
 * `Draggable` yourself and take the wiring from `getHelloPangeaRowProps`:
 *
 * - `rowProps` — the core props of the row with the draggable props and the
 *   ref of the library composed in (and the transition fix of an active drag);
 * - `handleProps` — the drag handle props in the grid contract (out of the tab
 *   order, with an accessible name), for `HelloPangeaDragHandle` or an element
 *   of your own;
 * - `cellProps` — the cell props: the handle and the content get a cell each.
 *
 * The index of `Draggable` is the position in `items`. Under virtualization a
 * custom row needs `renderClone` on the wrapper as well: the default clone is a
 * copy of `ListHelloPangeaDnd.Row`.
 *
 * In an application:
 * `import {List} from '@gravity-ui/uikit'`
 * `import {HelloPangeaDragHandle, ListHelloPangeaDnd, getHelloPangeaRowProps} from '@gravity-ui/uikit/hello-pangea-dnd'`
 * `import {Draggable} from '@hello-pangea/dnd'`
 */
import * as React from 'react';

import {faker} from '@faker-js/faker/locale/en';
// eslint-disable-next-line no-restricted-imports
import {Draggable} from '@hello-pangea/dnd';

import {Avatar} from '../../Avatar';
import {
    HelloPangeaDragHandle,
    ListHelloPangeaDnd,
    getHelloPangeaRowProps,
} from '../../HelloPangeaDnd';
import {Text} from '../../Text';
import {List} from '../List';

interface Person {
    id: string;
    name: string;
    email: string;
}

const people: Person[] = Array.from({length: 6}, (_, index) => {
    const name = faker.person.fullName();
    return {id: `person-${index + 1}`, name, email: faker.internet.email({firstName: name})};
});

const cardStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    // A margin rather than the gap of the list: the library measures the
    // margins of the rows, a CSS gap would break the shift of the neighbours
    marginBlockEnd: 8,
    padding: 12,
    borderRadius: 12,
    background: 'var(--g-color-base-float)',
};

export function DragAndDropHelloPangeaCustomRowExample() {
    const [items, setItems] = React.useState(people);
    const ids = items.map((person) => person.id);
    return (
        <ListHelloPangeaDnd items={items} onItemsChange={setItems}>
            <List
                role="grid"
                aria-label="Speakers"
                items={items}
                style={{width: 360}}
                getItemTextValue={(person) => person.name}
                renderItem={(ctx, helpers) => (
                    <Draggable draggableId={ctx.id} index={ids.indexOf(ctx.id)}>
                        {(provided, snapshot) => {
                            const {rowProps, handleProps, cellProps} = getHelloPangeaRowProps({
                                ctx,
                                helpers,
                                provided,
                                snapshot,
                            });
                            return (
                                <div
                                    {...rowProps}
                                    style={{
                                        ...cardStyle,
                                        ...rowProps.style,
                                        // The keyboard cursor is drawn the way the
                                        // default row draws it (see the CustomMarkup story)
                                        outline: `2px solid var(${
                                            ctx.state.active && ctx.state.cursorVisible
                                                ? '--g-color-line-brand'
                                                : '--g-color-line-generic'
                                        })`,
                                    }}
                                >
                                    <span {...cellProps}>
                                        <HelloPangeaDragHandle {...handleProps} />
                                    </span>
                                    <span
                                        {...cellProps}
                                        style={{display: 'flex', alignItems: 'center', gap: 8}}
                                    >
                                        <Avatar text={ctx.item.name} size="s" />
                                        <span>
                                            <Text as="div">{ctx.item.name}</Text>
                                            <Text as="div" color="secondary">
                                                {ctx.item.email}
                                            </Text>
                                        </span>
                                    </span>
                                </div>
                            );
                        }}
                    </Draggable>
                )}
            />
        </ListHelloPangeaDnd>
    );
}
