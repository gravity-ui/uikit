<!--GITHUB_BLOCK-->

# List (unstable)

<!--/GITHUB_BLOCK-->

A `List` displays a list of interactive items and lets the user navigate them with the keyboard,
select them, reorder them or perform an action. Selection, virtualization and drag-and-drop are
optional layers: nothing of them exists until you turn them on.

- [Basic Usage](#basic-usage)
- [Sizes](#sizes)
- [Item getters](#item-getters)
  - [getItemChildren](#getitemchildren)
  - [getItemContent](#getitemcontent)
  - [getItemDisabled](#getitemdisabled)
  - [getItemId](#getitemid)
  - [getItemTextValue](#getitemtextvalue)
- [Item actions](#item-actions)
- [renderItem](#renderitem)
  - [List.ItemView](#listitemview)
  - [Custom markup](#custom-markup)
  - [Links](#links)
- [The active item](#the-active-item)
- [Selection](#selection)
  - [Single selection](#single-selection)
  - [Multiple selection](#multiple-selection)
- [Virtualization](#virtualization)
- [Interactive rows](#interactive-rows)
- [Drag and drop](#drag-and-drop)
  - [@hello-pangea/dnd](#hello-pangeadnd)
  - [Any other library](#any-other-library)
- [useListFocusOwner](#uselistfocusowner)
- [Accessibility](#accessibility)
  - [Keyboard](#keyboard)
- [Properties](#properties)
  - [List](#list)
  - [ListItemContext](#listitemcontext)
  - [ListItemHelpers](#listitemhelpers)
  - [Data attributes](#data-attributes)
  - [ListVirtualizer](#listvirtualizer)
  - [ListDndAdapter](#listdndadapter)

## Basic Usage

```tsx
import {unstable_List as List} from '@gravity-ui/uikit/unstable';

const languages = ['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'Kotlin'];

function LanguageList() {
  return <List aria-label="Languages" items={languages} />;
}
```

<ListExample />

A list has no visible label of its own, so `aria-label` (or `aria-labelledby`) is required — the
list says so in development when neither is passed.

## Sizes

The `size` prop sets the density of the rows — `s`, `m` (the default), `l` or `xl`.

<ListSizes />

## Item getters

`List` does not ask you to convert your data into a shape of its own: `items` holds your objects as
they are, and a getter is how the list asks a question about one of them — what its id is, what to
show in the row, what typeahead searches, whether the item is disabled, whether it holds the
options of a section. Each getter has a default that reads the field of the same name, so data that
already answers that way needs no getter at all.

Your item travels back untouched: it comes with `onItemAction`, and `renderItem` receives it along
with the state of the row.

| Getter             | Answers                                      | Default                           |
| :----------------- | :------------------------------------------- | :-------------------------------- |
| `getItemChildren`  | the options of a section, if the item is one | `item.children`                   |
| `getItemContent`   | what to show in a row                        | the string itself                 |
| `getItemDisabled`  | whether the item is disabled                 | `item.disabled`                   |
| `getItemId`        | the id of an item                            | `item.id`, a string is its own id |
| `getItemTextValue` | the text typeahead searches                  | the content, when it is a string  |

When a row needs more than a value — an icon, a description, a whole layout of its own — the
getters step aside and [`renderItem`](#renderitem) draws the row instead.

### getItemChildren

`(item: T) => readonly T[] | undefined` — the options of a section. By default the `children` field
is read, and only when it is an array.

An item that has children becomes a section: its own row is the header — presentational, out of
navigation and selection — followed by its options, and a screen reader announces an option
together with the name of its section.

> [!NOTE]
> Only one level of nesting is available: children of an option inside a section are reported in
> development and rendered as plain options.

```tsx
import {unstable_List as List} from '@gravity-ui/uikit/unstable';

const documents = [
  {
    id: 'recent',
    name: 'Recent',
    children: [
      {id: 'report', name: 'Annual report'},
      {id: 'plan', name: 'Marketing plan'},
    ],
  },
  {
    id: 'all',
    name: 'All',
    children: [
      {id: 'backlog', name: 'Backlog'},
      {id: 'sync', name: 'Team sync'},
    ],
  },
];

function DocumentList() {
  return <List aria-label="Documents" items={documents} getItemContent={(item) => item.name} />;
}
```

<ListSections />

### getItemContent

`(item: T) => React.ReactNode` — what to show in a row. By default a string item renders itself and
an item of any other shape renders nothing, which is reported in development.

The result is a node, not just text, so an icon or a `<Text>` next to the label is fine — but
anything that is not a plain string leaves typeahead without a query, see `getItemTextValue` below.

Whatever the getter returns lands in the children of the row. The slots of the row view
(`startContent`, `description`, `endContent`) are its props rather than its content, so they are
set in [`renderItem`](#listitemview) — as is the markup of the row itself.

```tsx
import {CircleCheck, TriangleExclamation} from '@gravity-ui/icons';
import {Flex, Icon} from '@gravity-ui/uikit';
import {unstable_List as List} from '@gravity-ui/uikit/unstable';

const services = [
  {id: 'api', name: 'API gateway', healthy: true},
  {id: 'database', name: 'Database', healthy: false},
  {id: 'cdn', name: 'CDN', healthy: true},
];

function ServiceList() {
  return (
    <List
      aria-label="Services"
      items={services}
      getItemContent={(service) => (
        <Flex gap={2} alignItems="center">
          <Icon data={service.healthy ? CircleCheck : TriangleExclamation} size={14} />
          {service.name}
        </Flex>
      )}
      getItemTextValue={(service) => service.name}
    />
  );
}
```

<ListItemContent />

### getItemDisabled

`(item: T) => boolean` — whether an item is disabled. By default the `disabled` field of the item
is read.

A disabled item drops out of every interaction: hover and clicks do not activate it, the arrows,
`Home`/`End` and typeahead skip it, gestures never select it, and a list whose active item is not
set puts its tab stop on the first enabled item instead. It stays in the list for a screen reader
(`aria-disabled`, plus `data-disabled` for your CSS), and a controlled `selectedIds` may still
contain it.

### getItemId

`(item: T) => string` — the identity of an item. By default a string item is its own id, and an
item of any other shape is expected to have an `id` field.

Ids are the language the list speaks to you: `activeItemId`, `selectedIds`, `onItemAction` and the
drag-and-drop adapter all pass them around, and the DOM id of a row is derived from one. They have
to be unique and stable between renders — an id that changes moves the selection and the cursor
with it. A duplicate id and a missing one are reported in development; the list has no positional
fallback, because a hidden instability is worse than an explicit error.

### getItemTextValue

`(item: T) => string` — the text typeahead searches. By default it is the content of the row when
that content is a string.

The value is used for typeahead only: it does not name the row for a screen reader, that is the job
of the content itself (or of an `aria-label` in your own markup). When the content is not a plain
string and the getter is missing, the list says so in development and the row stays invisible to
typeahead.

## Item actions

`onItemAction` is the applying gesture of a row — a click, `Enter`, and `Space` while a selection
mode is on. The item comes with its id, so there is no lookup map to build.

```tsx
import {Flex, Text} from '@gravity-ui/uikit';
import {unstable_List as List} from '@gravity-ui/uikit/unstable';

const commands = [
  {id: 'copy', title: 'Copy'},
  {id: 'paste', title: 'Paste'},
  {id: 'duplicate', title: 'Duplicate'},
  {id: 'delete', title: 'Delete'},
];

function CommandList() {
  const [currentId, setCurrentId] = React.useState();

  return (
    <Flex direction="column" gap={2}>
      <List
        aria-label="Actions"
        items={commands}
        getItemContent={(command) => command.title}
        onItemAction={setCurrentId}
      />
      <Text color="secondary">You applied item ID: {currentId}</Text>
    </Flex>
  );
}
```

<ListActions />

## renderItem

`renderItem(ctx, helpers)` draws a row instead of the default one. `ctx` carries the item, its
content and its state, and `helpers` carry the props of the row: `getItemProps()` for the element
of the row, `getItemViewProps()` for the row view and `getCellProps()` for the cells of a grid.

It draws every row, section headers included — they arrive with `ctx.kind === 'section'`, and
`getItemProps()` gives them the props of a header rather than of an option. Branch on the kind and
draw the header with `List.SectionHeader`:

```tsx
renderItem={(ctx, {getItemProps, getItemViewProps}) =>
  ctx.kind === 'section' ? (
    <List.SectionHeader {...getItemProps()}>{ctx.content}</List.SectionHeader>
  ) : (
    <List.ItemView {...getItemProps()} {...getItemViewProps()}>
      {ctx.content}
    </List.ItemView>
  )
}
```

> [!NOTE] > `List.ItemView` is the recommended way to draw a complex row: it implements the guidelines of the
> design system — sizes, spacing, typography and the indication of the row states — so a row built
> from its slots stays consistent with the rest of the library. Markup of your own is the answer
> only when the row cannot be expressed with the slots at all.

### List.ItemView

`List.ItemView` is the row of the default render: it gives a row a leading icon, a description and
trailing content without any markup of your own.

```tsx
import {Clock, Envelope, Star} from '@gravity-ui/icons';
import {Icon, Label} from '@gravity-ui/uikit';
import {unstable_List as List} from '@gravity-ui/uikit/unstable';

const mailboxes = [
  {id: 'inbox', name: 'Inbox', description: 'Unread first', icon: Envelope, count: 24},
  {id: 'starred', name: 'Starred', description: 'Flagged by you', icon: Star, count: 3},
  {id: 'snoozed', name: 'Snoozed', description: 'Back later today', icon: Clock, count: 1},
];

function MailboxList() {
  return (
    <List
      aria-label="Mailboxes"
      items={mailboxes}
      getItemTextValue={(mailbox) => mailbox.name}
      renderItem={(ctx, {getItemProps, getItemViewProps}) => (
        <List.ItemView
          {...getItemProps()}
          {...getItemViewProps()}
          startContent={<Icon data={ctx.item.icon} size={16} />}
          description={ctx.item.description}
          endContent={<Label>{ctx.item.count}</Label>}
        >
          {ctx.item.name}
        </List.ItemView>
      )}
    />
  );
}
```

<ListItemSlots />

### Custom markup

`renderItem` may return anything at all — the props of the list still come from `getItemProps()`,
but nothing of the row view is inherited: the looks of the row, and the way it shows its states,
become yours.

Show the keyboard cursor by `ctx.state.activationModality`, the way the default row does: the state
`active` also belongs to the row the mouse last hovered, so an indication tied to it alone stays
behind after the pointer has left. The hover itself is yours — usually a plain CSS `:hover`.

```tsx
import {Avatar, Flex, Text} from '@gravity-ui/uikit';
import {unstable_List as List} from '@gravity-ui/uikit/unstable';

function TeammateList({users}) {
  return (
    <List
      aria-label="Teammates"
      items={users}
      style={{gap: 8}}
      getItemTextValue={(user) => user.name}
      renderItem={(ctx, {getItemProps}) => (
        <div
          {...getItemProps()}
          className="teammate" // the hover lives in the CSS of the consumer
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: 12,
            borderRadius: 12,
            cursor: 'pointer',
            outline: `2px solid var(${
              ctx.state.active && ctx.state.activationModality === 'keyboard'
                ? '--g-color-line-brand'
                : '--g-color-line-generic'
            })`,
          }}
        >
          <Avatar text={ctx.item.name} size="l" />
          <Flex direction="column">
            <Text variant="subheader-1">{ctx.item.name}</Text>
            <Text color="secondary" variant="caption-2">
              {ctx.item.role}
            </Text>
          </Flex>
        </div>
      )}
    />
  );
}
```

<ListCustomMarkup />

Anything passed to `getItemProps(overrides)` is composed with the props of the list instead of
replacing them: handlers are called in a chain, `className`, `ref` and `style` are merged.

### Links

Rendering a row as an anchor gives it the affordances of a link — the URL in the status bar, "Open
in new tab", a middle click. The navigation itself belongs to `onItemAction`, so suppress the
native one to keep a click from navigating twice.

> [!IMPORTANT]
> A screen reader announces such a row as an option, not as a link: `role="option"` overrides the
> role of the anchor, so the link is an affordance of the browser rather than a promise to
> assistive technology. Anything the user has to know before activating the row belongs to its
> accessible name — the example says that the link opens a new tab, which the icon only shows
> visually. When the row must stay a real link for assistive technology, put it inside a cell of a
> [grid](#interactive-rows) instead: there its own role survives.

```tsx
import {ArrowUpRightFromSquare} from '@gravity-ui/icons';
import {Icon} from '@gravity-ui/uikit';
import {unstable_List as List} from '@gravity-ui/uikit/unstable';

const specs = [
  {
    id: 'listbox',
    name: 'ARIA listbox pattern',
    description: 'w3.org',
    href: 'https://www.w3.org/WAI/ARIA/apg/patterns/listbox/',
  },
  {
    id: 'grid',
    name: 'ARIA grid pattern',
    description: 'w3.org',
    href: 'https://www.w3.org/WAI/ARIA/apg/patterns/grid/',
  },
  {
    id: 'components',
    name: 'Gravity UI components',
    description: 'gravity-ui.com',
    href: 'https://gravity-ui.com/components',
  },
];

function SpecList() {
  return (
    <List
      aria-label="Specifications"
      items={specs}
      getItemTextValue={(spec) => spec.name}
      onItemAction={(id, spec) => window.open(spec.href, '_blank', 'noopener,noreferrer')}
      renderItem={(ctx, {getItemProps, getItemViewProps}) => (
        <List.ItemView
          component="a"
          href={ctx.item.href}
          target="_blank"
          rel="noopener noreferrer"
          {...getItemProps({
            'aria-label': `${ctx.item.name}, opens in a new tab`,
            onClick: (event) => event.preventDefault(),
          })}
          {...getItemViewProps()}
          description={ctx.item.description}
          endContent={<Icon data={ArrowUpRightFromSquare} size={14} />}
        >
          {ctx.item.name}
        </List.ItemView>
      )}
    />
  );
}
```

<ListLinks />

## The active item

One item at a time is active — the one the keyboard acts on. It follows the pointer while the user
is working with the mouse (turn that off with `activateOnHover`) and the arrows while they are
working with the keyboard, and the highlight matches the input in use.

The active item can be controlled with `activeItemId` and `onActiveItemUpdate`, where `null` means
that nothing is active. An id that comes from your own code moves the highlight and the tab stop,
but neither DOM focus nor the scroll: only the gestures of the list itself scroll the active row
into view.

```tsx
import {Button, Flex} from '@gravity-ui/uikit';
import {unstable_List as List} from '@gravity-ui/uikit/unstable';

const languages = ['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'Kotlin'];

function LanguageList() {
  const [activeItemId, setActiveItemId] = React.useState(languages[1]);

  return (
    <Flex direction="column" gap={2}>
      <Flex gap={2}>
        <Button onClick={() => setActiveItemId(languages[0])}>First</Button>
        <Button onClick={() => setActiveItemId(languages[languages.length - 1])}>Last</Button>
        <Button onClick={() => setActiveItemId(null)}>None</Button>
      </Flex>
      <List
        aria-label="Languages"
        items={languages}
        activeItemId={activeItemId}
        onActiveItemUpdate={setActiveItemId}
      />
    </Flex>
  );
}
```

<ListControlledActivation />

## Selection

By default `List` doesn't allow selection, but this can be enabled using the `selectionMode` prop.
The selected items are an array of ids, controlled with `selectedIds` and `onSelectedUpdate` or
uncontrolled with `defaultSelectedIds`. Section headers and disabled items are never selected by a
gesture, and an `onItemAction` passed alongside is called by the same gesture, right after the
selection has been updated.

### Single selection

Only one item can be selected at a time: picking another one moves the selection to it, and
clicking the already selected item does not clear it. The selected row is highlighted.

```tsx
import {unstable_List as List} from '@gravity-ui/uikit/unstable';

const languages = ['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'Kotlin'];

function LanguagePicker() {
  const [selectedIds, setSelectedIds] = React.useState([languages[0]]);

  return (
    <List
      aria-label="Languages"
      items={languages}
      selectionMode="single"
      selectedIds={selectedIds}
      onSelectedUpdate={setSelectedIds}
    />
  );
}
```

<ListSingleSelection />

### Multiple selection

Any number of items can be selected, and a click on a selected item clears it. Selected rows are
marked with a check rather than a highlight, which would compete with the highlight of the active
row. The mode also brings the range gestures — a range from the item picked last, and select-all;
all of them are in the [keyboard table](#keyboard). A range is computed over the data rather than
over the DOM, so it covers the rows outside of the virtualization window as well.

```tsx
import {Flex, Text} from '@gravity-ui/uikit';
import {unstable_List as List} from '@gravity-ui/uikit/unstable';

const languages = ['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'Kotlin'];

function LanguagePicker() {
  const [selectedIds, setSelectedIds] = React.useState([]);

  return (
    <Flex direction="column" gap={2}>
      <List
        aria-label="Languages"
        items={languages}
        selectionMode="multiple"
        selectedIds={selectedIds}
        onSelectedUpdate={setSelectedIds}
      />
      <Text color="secondary">Selected: {selectedIds.join(', ') || 'nothing'}</Text>
    </Flex>
  );
}
```

<ListMultipleSelection />

## Virtualization

Wrapping the list in `<ListVirtualizer>` renders only the visible window of rows, which makes lists
of tens of thousands of items possible. The root of `List` is the scroll container, so its height
has to be limited.

How tall a row is counted to be is decided by two props of the wrapper: `estimateItemSize` is the
guess used before the row is rendered, and `measure` — on by default — replaces the guess with the
height the row turned out to have. That is why rows of variable height need no configuration, and
why turning the measurement off pays only when every row is exactly as tall as an explicit
estimate. The rest of the props are in [ListVirtualizer](#listvirtualizer).

> [!NOTE]
> A virtualized list is empty in server-rendered HTML: there is no viewport to measure against, so
> the rows appear only after hydration. Leave the list unvirtualized when its content has to be in
> the markup itself.

```tsx
import {
  unstable_List as List,
  unstable_ListVirtualizer as ListVirtualizer,
} from '@gravity-ui/uikit/unstable';

function TrackList({tracks}) {
  return (
    <ListVirtualizer estimateItemSize={28}>
      <List
        aria-label="Archive"
        style={{height: 480}}
        items={tracks}
        getItemContent={(track) => track.title}
      />
    </ListVirtualizer>
  );
}
```

<ListVirtualized />

## Interactive rows

A row that contains a button, a checkbox or a drag handle needs `role="grid"`: interactive content
is not allowed inside a plain option. The content of such a row lives in cells, and the interactive
content of those cells is reached with `←`/`→` — `→` steps into it, `←` walks back and returns to
the row.

```tsx
import {TrashBin} from '@gravity-ui/icons';
import {Button, Icon} from '@gravity-ui/uikit';
import {unstable_List as List} from '@gravity-ui/uikit/unstable';

function TaskList({tasks, removeTask}) {
  return (
    <List
      role="grid"
      aria-label="Tasks"
      items={tasks}
      getItemContent={(task) => task.title}
      renderItem={(ctx, {getItemProps, getItemViewProps, getCellProps}) => (
        <List.ItemView
          {...getItemProps()}
          {...getItemViewProps()}
          endContent={
            <span {...getCellProps()}>
              {/* the list is a single tab stop, so the button is reached with ←/→ */}
              <Button
                tabIndex={-1}
                aria-label={`Delete ${ctx.item.title}`}
                onClick={() => removeTask(ctx.id)}
              >
                <Icon data={TrashBin} />
              </Button>
            </span>
          }
        >
          <span {...getCellProps()}>{ctx.content}</span>
        </List.ItemView>
      )}
    />
  );
}
```

<ListInteractiveRows />

The default render wraps the content in a cell itself; with your own `renderItem` the cells are
placed with `getCellProps()`, which returns nothing in a plain list — so one `renderItem` works in
both cases. Give the interactive content `tabIndex={-1}`: the whole list is a single tab stop.

## Drag and drop

Reordering is a layer of its own: you bring a drag-and-drop library, wrap it into an adapter and
pass the adapter as the `dnd` prop. From there the roles are split — the library follows the
pointer, your code moves the data, and the list shows what is going on: it marks the dragged row,
draws the insertion line and stops the activation from following the cursor. Dragging with the
keyboard is not supported yet.

### @hello-pangea/dnd

The recommended library. Its wrappers cannot be expressed by the adapter contract, so the
integration is compositional: `DragDropContext` and `Droppable` go around the list, the row wraps
itself in `Draggable` inside `renderItem`, and the adapter half carries `draggingId` and the props
of the drop zone. The drop moves your data — `moveItem(items, fromId, toId, position, getId?)`
reorders the top level of the array and returns the original one, by reference, when nothing has
moved — so treat the result as immutable. The ids are read the way the list reads them unless
`getId` says otherwise.

```tsx
import {DragDropContext, Droppable} from '@hello-pangea/dnd';
import {unstable_List as List, unstable_moveItem as moveItem} from '@gravity-ui/uikit/unstable';

function SortableList({items, setItems}) {
  const {draggingId, onDragStart, onDragEnd} = useHelloPangeaListDnd({
    ids: items.map((item) => item.id),
    onDrop: (fromId, toId, position) => setItems(moveItem(items, fromId, toId, position)),
  });

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Droppable droppableId="order">
        {(provided) => (
          <List
            // the drag handle of the library is a real button: it is valid in a cell of a grid
            role="grid"
            aria-label="Order"
            items={items}
            dnd={{
              getContainerDndProps: () => ({...provided.droppableProps, ref: provided.innerRef}),
              draggingId,
            }}
            getItemContent={(item) => item.title}
            // the row wraps itself in Draggable and puts dragHandleProps into a
            // cell — the complete source is in the Code panel below
            renderItem={(ctx, helpers) => <SortableRow ctx={ctx} helpers={helpers} />}
          />
        )}
      </Droppable>
    </DragDropContext>
  );
}
```

The examples switch the list to the [grid roles](#interactive-rows): the drag handle of this
library is a real button, and interactive content is valid inside a cell rather than inside an
option.

<ListReorderHelloPangea />

<ListReorderHelloPangeaVirtualized />

### Any other library

An adapter is a plain object of four optional fields (see [ListDndAdapter](#listdndadapter)): two
getters of props and the state of the drag. Which of them you fill in depends on how the library
reaches the rows:

- **props and state** — the adapter registers the rows and the drop zone itself through
  `getItemDndProps`/`getContainerDndProps` (a `ref` for libraries that take elements rather than
  props) and reports `draggingId`/`dropTarget`;
- **state only** — the library is integrated inside your `renderItem` (a per-item hook, a wrapper
  component), so its props never travel through the adapter.

> [!IMPORTANT]
> The state — `draggingId` and `dropTarget` — is filled in either way. Without it the list does not
> know that a drag is going on: the activation keeps following the cursor, the row is not marked as
> dragged and the hover highlight stays on.

What an adapter owes the list:

- the `ref` of the getters is stable (per id in `getItemDndProps`) — otherwise the element is
  re-registered in the library on every render, and a drag re-renders the list often;
- the props do not close over the render state: rows are memoized, so read the fresh `items`
  through a ref;
- `dropTarget` is deduplicated before `setState` — a dragover fires on every pixel;
- `role`, `id` and `tabIndex` belong to the list — such keys are ignored with a dev warning.

Then pick how the drop position is shown — the two ways exclude each other:

- **an insertion line drawn by the list** — fill `dropTarget` in, and the row gets
  `data-drop-target="before|after"` (it works in a custom `renderItem` as well);
- **the neighbours shift** — apply the transforms of your library and leave `dropTarget` empty, so
  the gap itself shows the place.

For styles of your own the list marks the dragged row with `data-dragging` and the root with
`data-drag-active`.

The two examples below are the two shapes side by side: pragmatic-drag-and-drop as an adapter of
props and state with the insertion line of the list, and dnd-kit as a state-only adapter with
`useSortable` in the row component and the neighbours shifting. Each of them is shown twice, on a
plain list and on a virtualized one, and the complete source is in its Code panel.

#### pragmatic-drag-and-drop

<ListReorder />

<ListReorderVirtualized />

#### dnd-kit

Do not spread the `attributes` of `useSortable`: they carry `role` and `tabIndex`, which belong to
the list.

<ListReorderDndKit />

<ListReorderDndKitVirtualized />

## useListFocusOwner

Sometimes a list is driven from an input rather than from itself: a filter above the rows, a
combobox, the popup of a `Select`. The keyboard then has to serve both at once — the user types
into the input and walks the rows with the arrows — and the focus must stay in the input, otherwise
typing stops halfway through.

That is what `useListFocusOwner()` is for. The hook returns an owner object: the input takes its
props, the list takes the object itself, and from that moment DOM focus never leaves the input
while the active row is exposed to a screen reader through `aria-activedescendant`.

The hook takes no arguments and returns the owner object:

| Name          | Description                                                                                                      |                              Type                               |
| :------------ | :--------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------: |
| getInputProps | The props of the input that owns the focus. The overrides are composed by the same contract as in `getItemProps` | `(overrides?: InputHTMLAttributes) => ListFocusOwnerInputProps` |

The props `getInputProps()` builds:

| Name                  | Description                                                                       |               Type               |
| :-------------------- | :-------------------------------------------------------------------------------- | :------------------------------: |
| role                  | Marks the input as the control of the list; override it for non-combobox patterns |           `'combobox'`           |
| aria-expanded         | Whether a list with this owner is mounted                                         |            `boolean`             |
| aria-controls         | The id of the connected list                                                      |      `string \| undefined`       |
| aria-activedescendant | The DOM id of the active row of that list                                         |      `string \| undefined`       |
| onKeyDown             | The keyboard machinery of the list; a handler of yours runs after it              | `(event: KeyboardEvent) => void` |

What changes in the list:

- the rows leave the tab order — the input is the only tab stop, and DOM focus never moves to a row;
- `↑`/`↓`/`Home`/`End`/`Enter` work from the input, move the active item and scroll it into view;
- character keys and `Space` belong to the input: typing is filtering, so typeahead is off and
  `Space` no longer selects. `Ctrl`/`Cmd`+`A` selects the text of the input rather than the items;
- `Shift`+`↑`/`↓` still extends the range when a multiple selection is on.

What to keep in mind:

- keep the activity controlled and point it at the first match while filtering, so that `Enter`
  always applies what the user sees;
- a list inside a popup is expected to be mounted only while the popup is open. A closed popup kept
  mounted is not supported: the arrows of a hidden list would go on moving the activity and
  `aria-expanded` would stay `true`;
- one owner serves one list — two lists mounted at the same time need two hooks;
- for a list that is not a popup at all (the example above) override `role` and `aria-expanded`
  through the overrides of `getInputProps` when the combobox semantics do not fit;
- full keyboard reachability of the cells of a [grid](#interactive-rows) is guaranteed in the roving
  strategy only: with an external owner `←`/`→` belong to the caret of the input.

```tsx
import {Flex, TextInput} from '@gravity-ui/uikit';
import {
  unstable_List as List,
  unstable_useListFocusOwner as useListFocusOwner,
} from '@gravity-ui/uikit/unstable';

const frameworks = ['React', 'Vue', 'Svelte', 'Solid', 'Angular', 'Qwik', 'Preact'];

const filterFrameworks = (query) =>
  frameworks.filter((name) => name.toLowerCase().includes(query.trim().toLowerCase()));

function FrameworkPicker() {
  const [query, setQuery] = React.useState('');
  const [activeItemId, setActiveItemId] = React.useState(null);
  const focusOwner = useListFocusOwner();
  const {onKeyDown, ...inputProps} = focusOwner.getInputProps({'aria-label': 'Framework'});

  const handleQuery = (value) => {
    setQuery(value);
    // Typing is filtering: the activity moves to the first match
    setActiveItemId(filterFrameworks(value)[0] ?? null);
  };

  return (
    <Flex direction="column" gap={2}>
      <TextInput
        value={query}
        onUpdate={handleQuery}
        controlProps={inputProps}
        // TextInput sets its own onKeyDown after spreading controlProps —
        // the keyboard of the list is handed to it through a separate prop
        onKeyDown={onKeyDown}
      />
      <List
        focusOwner={focusOwner}
        aria-label="Frameworks"
        items={filterFrameworks(query)}
        activeItemId={activeItemId}
        onActiveItemUpdate={setActiveItemId}
        onItemAction={(id) => setQuery(id)}
      />
    </Flex>
  );
}
```

<ListFocusOwner />

## Accessibility

The roles, the keyboard and the state of the rows are the responsibility of the list itself: it
renders a `listbox` of `option`s with a single tab stop, marks the selected rows with
`aria-selected` once a selection mode is on (and the list with `aria-multiselectable` in
`multiple`), numbers the rows under virtualization — `aria-setsize`/`aria-posinset` in a listbox,
`aria-rowcount`/`aria-rowindex` in a grid — and lets a screen reader announce an option together
with the name of its section. What is left to you:

- **name the list** with `aria-label` or `aria-labelledby` — a list has no visible label of its own;
- **pass `getItemTextValue`** when the content of a row is not a plain string, otherwise typeahead
  has nothing to search;
- **spread `getItemProps()`** on the element of a row in a custom `renderItem` — the role, the id,
  the keyboard and the state of the row all come from there;
- **switch to `role="grid"`** when a row contains interactive content, and give that content
  `tabIndex={-1}`: it is reached with `←`/`→` rather than `Tab` (see
  [Interactive rows](#interactive-rows));
- **connect an input that owns the focus** through `useListFocusOwner()` instead of wiring
  `aria-activedescendant` by hand (see [useListFocusOwner](#uselistfocusowner)).

### Keyboard

| Key                                | Action                                                                                                                                                                                                              |
| :--------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `↑` / `↓`                          | Move to the previous/next item, cycling at the edges                                                                                                                                                                |
| `Home` / `End`                     | Move to the first/last item                                                                                                                                                                                         |
| Character keys                     | Jump to the item whose text starts with what was typed; the buffer resets after a pause, and repeating one character cycles through the items starting with it. With a focus owner the keys go to the input instead |
| `Enter`                            | Apply the active item (`onItemAction`)                                                                                                                                                                              |
| `Space`                            | Select the active item (with a selection mode on); part of the typeahead query while it is being typed                                                                                                              |
| `Shift` + click, `Shift` + `↑`/`↓` | Select a range (`multiple` only); unlike the plain arrows, a `Shift`+arrow stops at the edges instead of cycling                                                                                                    |
| `Shift` + `Space`                  | Select the range up to the active item (`multiple` only)                                                                                                                                                            |
| `Ctrl`/`Cmd` + `A`                 | Select every item (`multiple` only; with a focus owner the key belongs to the input)                                                                                                                                |
| `←` / `→`                          | Step into the interactive content of a cell and back (`role="grid"` only, mirrored in RTL)                                                                                                                          |
| `Tab`                              | Leave the list: it is a single tab stop                                                                                                                                                                             |

## Properties

### List

| Name                | Description                                                           |                   Type                   |               Default                |
| :------------------ | :-------------------------------------------------------------------- | :--------------------------------------: | :----------------------------------: |
| items               | The data of the list (strings or objects)                             |              `readonly T[]`              |                                      |
| aria-label          | The name of the list for a screen reader                              |                 `string`                 |                                      |
| aria-labelledby     | The element that names the list, instead of `aria-label`              |                 `string`                 |                                      |
| getItemId           | The unique id of an item                                              |          `(item: T) => string`           |            `(i) => i.id`             |
| getItemDisabled     | Whether an item is disabled                                           |          `(item: T) => boolean`          |        `(i) => !!i.disabled`         |
| getItemChildren     | The children of a section                                             | `(item: T) => readonly T[] \| undefined` | `item.children`, when it is an array |
| getItemContent      | The content of a row                                                  |      `(item: T) => React.ReactNode`      |     the item, if it is a string      |
| getItemTextValue    | The text for typeahead                                                |          `(item: T) => string`           |    `content` when it is a string     |
| activeItemId        | The active item, controlled (`null` means none)                       |             `string \| null`             |                                      |
| defaultActiveItemId | The active item, uncontrolled                                         |                 `string`                 |                                      |
| onActiveItemUpdate  | The callback of an activity change                                    |      `(id: string \| null) => void`      |                                      |
| onItemAction        | Applying an item: a click or Enter (plus Space with the layer)        |     `(id: string, item: T) => void`      |                                      |
| selectionMode       | Turns the selection layer on                                          |         `'single' \| 'multiple'`         |                                      |
| selectedIds         | The selected items, controlled                                        |           `readonly string[]`            |                                      |
| defaultSelectedIds  | The selected items, uncontrolled                                      |           `readonly string[]`            |                                      |
| onSelectedUpdate    | The callback of a selection change                                    |        `(ids: string[]) => void`         |                                      |
| dnd                 | Turns the drag-and-drop layer on (an adapter)                         |             `ListDndAdapter`             |                                      |
| role                | The ARIA role: `grid` for rows with interactive content               |          `'listbox' \| 'grid'`           |             `'listbox'`              |
| focusOwner          | An external focus owner (`useListFocusOwner`)                         |             `ListFocusOwner`             |                                      |
| activateOnHover     | Activation on hover                                                   |                `boolean`                 |                `true`                |
| renderItem          | A custom render of a row                                              |         `(ctx, helpers) => node`         |                                      |
| id                  | The base of the row ids and the target of an external `aria-controls` |                 `string`                 |         an auto-generated id         |
| size                | The size of the rows                                                  |       `'s' \| 'm' \| 'l' \| 'xl'`        |                `'m'`                 |
| className           | The CSS class of the root element                                     |                 `string`                 |                                      |
| style               | The inline style of the root element                                  |          `React.CSSProperties`           |                                      |
| qa                  | The `data-qa` attribute of the root (for tests)                       |                 `string`                 |                                      |
| ref                 | The ref of the root element                                           |       `React.Ref<HTMLDivElement>`        |                                      |

`List.ItemView` is the row view of the default render and `List.SectionHeader` is its section
header; both are statics of the component and are meant for `renderItem`. The reorder helper is
exported next to the list — `unstable_moveItem`.

### ListItemContext

The first argument of `renderItem` — the row as data.

| Name                     | Description                                                                   |                    Type                    |
| :----------------------- | :---------------------------------------------------------------------------- | :----------------------------------------: |
| id                       | The id of the item, the one the list speaks in                                |                  `string`                  |
| item                     | Your item, untouched                                                          |                    `T`                     |
| index                    | The position among the rendered rows, section headers included                |                  `number`                  |
| kind                     | Whether the row is an option or a section header                              |           `'item' \| 'section'`            |
| content                  | The result of `getItemContent`                                                |       `React.ReactNode \| undefined`       |
| state.active             | Whether the row is the active one                                             |                 `boolean`                  |
| state.activationModality | What the active row was activated with; present on the active row only        |   `'keyboard' \| 'pointer' \| undefined`   |
| state.disabled           | The result of `getItemDisabled`                                               |                 `boolean`                  |
| state.selected           | Present only while a selection mode is on                                     |           `boolean \| undefined`           |
| state.dragging           | Whether this row is the one being dragged; present only while `dnd` is passed |           `boolean \| undefined`           |
| state.dropTarget         | The edge the drop will land on; present only while `dnd` is passed            | `'before' \| 'after' \| null \| undefined` |

### ListItemHelpers

The second argument of `renderItem` — the props of the row. Overrides passed to a getter are
composed with the props of the list instead of replacing them: handlers are called in a chain,
`className`, `ref` and `style` are merged, and keys with the value `undefined` are ignored.

| Name             | Description                                                                                                    |
| :--------------- | :------------------------------------------------------------------------------------------------------------- |
| getItemProps     | Everything the element of the row needs: the role, the DOM id, the tab stop, the handlers, the data attributes |
| getItemViewProps | The state of the row in terms of `List.ItemView`: `size`, `active`, `disabled`, `selected`, `selectionStyle`   |
| getCellProps     | The props of a cell in `role="grid"`; an empty object in a listbox, so one `renderItem` works in both          |

### Data attributes

The list marks the rows and the root, so custom markup can be styled with CSS alone. A state
attribute is present or absent rather than set to `"false"`.

| Attribute          | Where    | When                                                                       |
| :----------------- | :------- | :------------------------------------------------------------------------- |
| `data-active`      | a row    | The row is the active one                                                  |
| `data-disabled`    | a row    | The item is disabled                                                       |
| `data-selected`    | a row    | The row is selected (a selection mode is on)                               |
| `data-dragging`    | a row    | The row is being dragged (`dnd` is passed)                                 |
| `data-drop-target` | a row    | The drop will land on this row; the value is the edge, `before` or `after` |
| `data-drag-active` | the root | A drag is going on somewhere in the list                                   |
| `data-qa`          | the root | The value of the `qa` prop                                                 |

### ListVirtualizer

The wrapper of the [virtualization](#virtualization) layer.

| Name             | Description                                                                                      |            Type             |          Default          |
| :--------------- | :----------------------------------------------------------------------------------------------- | :-------------------------: | :-----------------------: |
| children         | The `<List>` inside                                                                              |         `ReactNode`         |                           |
| estimateItemSize | The height estimate of a row before it is rendered — a constant or a function of the row context | `number \| (ctx) => number` | by the `size` of the list |
| measure          | Measure the actual heights of the rows after mount (rows of variable height out of the box)      |          `boolean`          |          `true`           |
| overscan         | The buffer of rows outside of the visible window                                                 |          `number`           |            `5`            |

### ListDndAdapter

The object of the `dnd` prop — the [drag-and-drop](#drag-and-drop) layer.

| Name                  | Description                                                                                      |                         Type                          |
| :-------------------- | :----------------------------------------------------------------------------------------------- | :---------------------------------------------------: |
| getContainerDndProps? | The props of the root of the list (the drop zone); `ref` is for libraries registering an element |                 `() => ListDndProps`                  |
| getItemDndProps?      | The props of a row; they are mixed into `getItemProps` after the base ones, before the overrides |            `(id: string) => ListDndProps`             |
| draggingId?           | What is being dragged — the source of `ctx.state.dragging` and `data-dragging`                   |                   `string \| null`                    |
| dropTarget?           | `{id, position}` — the source of `ctx.state.dropTarget`; the indicator is drawn by the list      | `{id: string; position: 'before' \| 'after'} \| null` |
