<!--GITHUB_BLOCK-->

# Sheet

<!--/GITHUB_BLOCK-->

`Sheet` is a component designed for using in the mobile context as an information or interactive element. You can place content of any size in it, since the internal scrolling and dynamic resizing are supported.

```tsx
import {Sheet} from '@gravity-ui/uikit';
```

On mobile devices, you can move a `Sheet` by pulling its main part or the swipe area. To close it, swipe down, tap the area outside the `Sheet` or press `Escape`.

## Usage

```tsx
import React from 'react';
import {Button, Sheet} from '@gravity-ui/uikit';

const SheetExample = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Button onClick={() => setOpen(true)}>Open Sheet</Button>
      <Sheet open={open} onOpenChange={setOpen} title="Content Sheet">
        Content
      </Sheet>
    </React.Fragment>
  );
};
```

## Focus and keyboard access

By default, opening a sheet focuses the sheet itself, keeps keyboard focus inside the sheet, and
hides the background from assistive technology. Focusing the sheet rather than its first control
keeps a text field from opening the on-screen keyboard. Focus returns to the element that opened
the sheet after it closes.

Use `initialFocus` to focus a control instead and `returnFocus` to customize or disable focus
restoration. Set `disableModal` for sheets that must not trap focus or hide the page: such a sheet
leaves focus where it is unless `initialFocus` is passed and adds no dismiss controls. It still
takes part in the layer stack, so Escape closes it unless `disableEscapeKeyDown` is set; swipe and
veil behavior stay unchanged.

Visually hidden dismiss controls are available to assistive technology, as in `Modal`. Activating
one requests `onOpenChange(false, event)` without a reason. As with other dismissals, a controlled
sheet stays open until the parent updates `open`. Use `disableVisuallyHiddenDismiss` to remove them,
for example when the sheet has a close button of its own.

Sheets can be nested or opened one after another. Escape closes only the topmost sheet, and focus
returns to the element that opened it. A sheet rendered inside a `Modal` or another floating
element handles Escape first, so the next Escape closes its parent.

## Properties

| Name                         | Description                                                                                                                                                                                                                                                                                                                                                                                                                    |                           Type                           |     Default     |
| :--------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------: | :-------------: |
| allowHideOnContentScroll     | Enables the behavior of closing the sheet window by swiping down if the content is scrolled to its top (`content Node.scrollTop === 0`) or has no scroll at all.                                                                                                                                                                                                                                                               |                        `boolean`                         |     `true`      |
| alwaysFullHeight             | `Sheet` height will always have the maximum value                                                                                                                                                                                                                                                                                                                                                                              |                        `boolean`                         |   `undefined`   |
| className                    | `class` HTML attribute                                                                                                                                                                                                                                                                                                                                                                                                         |                         `string`                         |   `undefined`   |
| container                    | DOM element to which component is mounted via `Portal`                                                                                                                                                                                                                                                                                                                                                                         |                      `HTMLElement`                       | `document.body` |
| contentClassName             | `class` HTML attribute for the sheet content.                                                                                                                                                                                                                                                                                                                                                                                  |                         `string`                         |   `undefined`   |
| defaultOpen                  | Opens the sheet on mount when `open` is not passed. To reopen a closed sheet, control it with `open`.                                                                                                                                                                                                                                                                                                                          |                        `boolean`                         |     `false`     |
| disableEscapeKeyDown         | Disables closing the sheet on Escape.                                                                                                                                                                                                                                                                                                                                                                                          |                        `boolean`                         |     `false`     |
| disableModal                 | Disables modal focus management: the sheet neither traps focus nor hides the page behind it, and it has no visually hidden dismiss controls.                                                                                                                                                                                                                                                                                   |                        `boolean`                         |     `false`     |
| disableOutsideClick          | Disables closing the sheet by clicking the veil.                                                                                                                                                                                                                                                                                                                                                                               |                        `boolean`                         |     `false`     |
| disablePortal                | Disables using `Portal`                                                                                                                                                                                                                                                                                                                                                                                                        |                        `boolean`                         |     `false`     |
| disableVisuallyHiddenDismiss | Removes the screen-reader dismiss buttons.                                                                                                                                                                                                                                                                                                                                                                                     |                        `boolean`                         |     `false`     |
| hideTopBar                   | Hides the top bar with the resize handle.                                                                                                                                                                                                                                                                                                                                                                                      |                        `boolean`                         |                 |
| id                           | Sheet ID used as hash in a URL. Make sure to specify multiple `id` values if there can be more than one sheet on a page.                                                                                                                                                                                                                                                                                                       |                         `string`                         |     `sheet`     |
| initialFocus                 | Index of the tabbable element or ref to focus on open. By default a modal sheet focuses itself, and a sheet with `disableModal` leaves focus where it is.                                                                                                                                                                                                                                                                      | `number \| React.MutableRefObject<HTMLElement \| null>`  |                 |
| maxContentHeightCoefficient  | Coefficient that determines the maximum height of the `Sheet` relative to the height of the viewport (range 0-1)                                                                                                                                                                                                                                                                                                               |                         `number`                         |      `0.9`      |
| onOpenChange                 | Callback `(open: boolean, event?: Event, reason?: SheetOpenChangeReason) => void`, as in [`Popup.onOpenChange`](../Popup/README.md#properties).<br>Dismissal requests `open=false` with reason `escape-key`, `outside-press`, `swipe`, or `navigation`; the visually hidden dismiss controls request it without a reason. A controlled sheet closes once the parent sets `open` to `false`; an uncontrolled one closes itself. |                        `function`                        |   `undefined`   |
| onTransitionIn               | Called when the opening transition starts.                                                                                                                                                                                                                                                                                                                                                                                     |                       `() => void`                       |   `undefined`   |
| onTransitionInComplete       | Called when the opening transition completes.                                                                                                                                                                                                                                                                                                                                                                                  |                       `() => void`                       |   `undefined`   |
| onTransitionOut              | Called when the closing transition starts.                                                                                                                                                                                                                                                                                                                                                                                     |                       `() => void`                       |   `undefined`   |
| onTransitionOutComplete      | Called when the closing transition completes, including immediate dismissal after a full-height swipe.                                                                                                                                                                                                                                                                                                                         |                       `() => void`                       |   `undefined`   |
| open                         | Controlled open state. Without it the sheet closes itself on dismissal and `onOpenChange` only reports the change.                                                                                                                                                                                                                                                                                                             |                        `boolean`                         |   `undefined`   |
| returnFocus                  | Element to return focus to, or `false` to disable it.                                                                                                                                                                                                                                                                                                                                                                          | `boolean \| React.MutableRefObject<HTMLElement \| null>` |     `true`      |
| swipeAreaClassName           | `class` HTML attribute for the swipe area.                                                                                                                                                                                                                                                                                                                                                                                     |                         `string`                         |   `undefined`   |
| title                        | Sheet window title.                                                                                                                                                                                                                                                                                                                                                                                                            |                         `string`                         |   `undefined`   |

A touch that starts on a drag handle — an element with `draggable="true"` or a handle of `@hello-pangea/dnd` — is left to the drag and does not swipe the sheet.

## CSS API

| Name                         | Description                                                                                                                                                            |
| :--------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--g-sheet-content-padding`  | Content padding. The default value automatically includes `env(safe-area-inset-bottom)` for the bottom and `max(10px, env(safe-area-inset-left/right))` for the sides. |
| `--g-sheet-background-color` | Background color                                                                                                                                                       |
