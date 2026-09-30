<!--GITHUB_BLOCK-->

# ListItemView

<!--/GITHUB_BLOCK-->

`ListItemView` is the view of a list row: it lays out the content of a row — the icon, the
description, the trailing content — and draws the states its owner passes in.

```tsx
import {ListItemView} from '@gravity-ui/uikit';
```

The [List](../List/README.md) draws its rows with this view and exposes it as `List.ItemView`, with
the props of the layout only. Reach for `ListItemView` itself to build a row outside of a list — a
row of a menu of your own, an item of a tree — or when a row needs the nesting and collapsing props
that a list does not pass.

- [Basic Usage](#basic-usage)
- [Sizes](#sizes)
- [Slots](#slots)
- [States](#states)
- [Selection](#selection)
- [Nesting and collapsing](#nesting-and-collapsing)
- [Drag handle](#drag-handle)
- [Another element](#another-element)
- [CSS API](#css-api)
- [Properties](#properties)

## Basic Usage

The view is a block element as wide as its container: the width of a row is the width of the list
around it.

```tsx
import {Envelope} from '@gravity-ui/icons';
import {Icon, ListItemView} from '@gravity-ui/uikit';

function Mailbox() {
  return (
    <ListItemView startContent={<Icon data={Envelope} size={16} />} onClick={openMailbox}>
      Inbox
    </ListItemView>
  );
}
```

<ListItemViewExample />

The view has no ARIA role of its own: a row gets its role from the list it belongs to (`option` in a
listbox, `row` in a grid), and `role` together with the rest of the DOM props reaches the root
element as it is passed. Inside a `<List>` the props come ready from `getItemProps()`.

## Sizes

The `size` prop sets the density of a row — `s`, `m`, `l` or `xl`. It drives the minimum height,
the paddings, the corner radius and the size of the controls of the row; `xl` also switches the
text to `body-2`. A row without `size` keeps the base geometry of the view, which is close to `m`
but not the same; inside a `<List>` every row gets the size of the list.

<ListItemViewSizes />

## Slots

The content of a row is its children, and the rest is in the props: `startContent` for a leading
icon or an avatar, `description` for the second line, `endContent` for what closes the row — a
label, a shortcut, an action.

<ListItemViewSlots />

```tsx
<ListItemView
  startContent={<Icon data={Star} size={16} />}
  description="Flagged by you"
  endContent={<Label>3</Label>}
>
  Starred
</ListItemView>
```

## States

A row shows four states, and each of them is a prop — the view keeps no state of its own:

- `active` — the cursor of the keyboard: a list moves it with the arrow keys;
- `hovered` — the hover highlight, forced by the props. Without the prop the row highlights itself
  on `:hover`; `hovered={false}` suppresses that, which is what a list does while a drag is going
  on;
- `disabled` — the row is dimmed and stops reacting to the pointer, its own `onClick` included;
- `selected` — see [Selection](#selection).

<ListItemViewStates />

## Selection

`selectionStyle` says how a selected row is shown: `highlight` tints the row, `check` keeps a slot
for a check mark in front of the content, `none` shows the selection by nothing — for a row that
says it in its own content. The prop has no default: a `selected` row without it looks like any
other. Inside a `<List>` the list picks the style itself — `check` for a multiple selection,
`highlight` for a single one.

<ListItemViewSelection />

The check slot is kept for every row of a list, selected or not, so the content of the rows does not
jump as the selection changes.

## Nesting and collapsing

`nestedLevel` indents a row by the depth of a tree, and `collapsible` gives a row the toggle of its
branch: `collapsed` is its state and `onCollapseChange` its handler. A click on the row itself
toggles the branch too, unless the row has an `onClick` of its own.

The toggle is decoration: it carries `aria-hidden` and is out of the tab order, so the row itself
is the only way to the branch. The `aria-expanded` of the row is yours to set.

<ListItemViewNesting />

## Drag handle

`dragHandle` fills the outermost slot of a row, in front of the indent, the collapse toggle and the
check mark, so the handle of a reorderable list stays at the edge of the row whatever else the row
shows. The view knows nothing about drag and drop: the props of the library live on the element you
pass.

<ListItemViewDragHandle />

```tsx
<ListItemView
  dragHandle={
    <span {...dragHandleProps} aria-label="Drag to reorder">
      <Icon data={Grip} size={12} />
    </span>
  }
>
  {track.title}
</ListItemView>
```

## Another element

`component` renders the row as another element — a link, a button — and `componentProps` are the
props of that element: `href`, `type`, the handlers. With `isContainer` the view lays out nothing
and leaves the markup of the row to you, keeping the states and the element.

<ListItemViewCustomElement />

## CSS API

| Name                                        | Description                          |
| :------------------------------------------ | :----------------------------------- |
| `--g-list-item-view-min-height`             | The minimum height of a row          |
| `--g-list-item-view-border-radius`          | The corner radius                    |
| `--g-list-item-view-padding-inline`         | The inline padding                   |
| `--g-list-item-view-padding-block`          | The block padding                    |
| `--g-list-item-view-line-height`            | The line height of the content       |
| `--g-list-item-view-controls-gap`           | The gap between the slots            |
| `--g-list-item-view-controls-size`          | The size of the controls of a row    |
| `--g-list-item-view-controls-border-radius` | The corner radius of the controls    |
| `--g-list-item-view-controls-icon-size`     | The size of the icons of the control |
| `--g-list-item-view-spacer-size`            | The indent of one nesting level      |
| `--g-list-item-view-background-color`       | The background of a row              |
| `--g-list-item-view-background-color-hover` | The background of a hovered row      |
| `--g-list-item-view-text-color`             | The colour of the content            |
| `--g-list-item-view-description-color`      | The colour of the description        |

The colour variables, `--g-list-item-view-line-height` and `--g-list-item-view-spacer-size` apply
to a row of any size. The eight geometry variables — the minimum height, the radius, the paddings
and the four of the controls — are the values of a row **without** `size`: a size modifier assigns
that geometry itself and the variables are not read at all. A row that has a size is retuned by
setting the properties themselves in a class of your own (the mobile menu of the `FilePreview` does
exactly that).

## Properties

| Name             | Description                                                                                 |                  Type                  | Default |
| :--------------- | :------------------------------------------------------------------------------------------ | :------------------------------------: | :-----: |
| children         | The content of the row                                                                      |           `React.ReactNode`            |         |
| size             | The density of the row                                                                      |        `'s'` `'m'` `'l'` `'xl'`        |         |
| startContent     | The leading content: an icon, an avatar                                                     |           `React.ReactNode`            |         |
| description      | The second line of the row                                                                  |           `React.ReactNode`            |         |
| endContent       | The trailing content: a label, a shortcut, an action                                        |           `React.ReactNode`            |         |
| dragHandle       | The content of the outermost slot: the drag handle of a reorderable row                     |           `React.ReactNode`            |         |
| active           | The cursor of the keyboard on the row                                                       |               `boolean`                |         |
| hovered          | The hover highlight, forced by the props (`false` suppresses the `:hover` of the row)       |               `boolean`                |         |
| disabled         | Whether the row is disabled                                                                 |               `boolean`                |         |
| selected         | Whether the row is selected                                                                 |               `boolean`                |         |
| selectionStyle   | How a selected row is shown                                                                 |    `'highlight'` `'check'` `'none'`    |         |
| collapsible      | Whether the row has the toggle of its branch                                                |               `boolean`                |         |
| collapsed        | Whether the branch of the row is collapsed                                                  |               `boolean`                |         |
| onCollapseChange | The handler of the toggle (a click on the row without `onClick` toggles the branch as well) |     `(collapsed: boolean) => void`     |         |
| nestedLevel      | The depth of the row in a tree: the indent in front of it                                   |                `number`                |   `0`   |
| onClick          | The handler of a click on the row (a click on a focusable descendant is not one)            | `React.MouseEventHandler<HTMLElement>` |         |
| component        | The element the row is rendered as                                                          |          `React.ElementType`           | `'div'` |
| componentProps   | The props of that element                                                                   |   `React.ComponentProps<component>`    |         |
| isContainer      | Renders the children as they are, without the layout of the slots                           |               `boolean`                | `false` |
| className        | The CSS class of the row                                                                    |                `string`                |         |
| style            | The inline style of the row                                                                 |         `React.CSSProperties`          |         |

The rest of the props reach the root element of the row: `role`, `id`, `tabIndex`, `aria-*`,
`data-*`, the handlers of the pointer and the keyboard.
