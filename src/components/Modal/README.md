<!--GITHUB_BLOCK-->

# Modal

<!--/GITHUB_BLOCK-->

The `Modal` component serves as base for creating pop-up windows with a backdrop above the rest of the content on a page.
It disables scrolling while opening and manages focus for content. The `Modal` child components are rendered inside the [`Portal`](../Portal) component.
With `Modal`, you can implement dialogs, alerts, confirmations, and more.

```tsx
import {Modal} from '@gravity-ui/uikit';
```

## Usage

```tsx
import {useState} from 'react';
import {Button, Modal} from '@gravity-ui/uikit';

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Modal</Button>
<Modal open={open} onOpenChange={setOpen}>
    Content
</Modal>
```

## Properties

| Name                         | Description                                                                                  |                    Type                     |     Default     |
| :--------------------------- | :------------------------------------------------------------------------------------------- | :-----------------------------------------: | :-------------: |
| children                     | Any React content                                                                            |              `React.ReactNode`              |                 |
| className                    | `class` HTML attribute for the root node                                                     |                  `string`                   |                 |
| container                    | DOM element to which component is mounted via `Portal`                                       |                `HTMLElement`                | `document.body` |
| contentClassName             | `class` HTML attribute for the content node                                                  |                  `string`                   |                 |
| disableBodyScrollLock        | Disables locking scroll while open                                                           |                  `boolean`                  |     `false`     |
| disableEscapeKeyDown         | Disables triggering close on `Esc`                                                           |                  `boolean`                  |     `false`     |
| disableOutsideClick          | Disables triggering close on outside clicks                                                  |                  `boolean`                  |     `false`     |
| disablePortal                | Disables using `Portal`                                                                      |                  `boolean`                  |     `false`     |
| keepMounted                  | `Modal` will not be removed from the DOM upon hiding                                         |                  `boolean`                  |     `false`     |
| initialFocus                 | Initial focus target; defaults to the content node                                           | `FloatingFocusManagerProps['initialFocus']` |                 |
| returnFocus                  | Controls where focus returns after closing                                                   | `FloatingFocusManagerProps['returnFocus']`  |                 |
| disableVisuallyHiddenDismiss | Removes the screen-reader dismiss buttons                                                    |                  `boolean`                  |     `false`     |
| floatingRef                  | Ref to the modal content node                                                                |  `React.RefObject<HTMLDivElement \| null>`  |                 |
| onOpenChange                 | Handles `Modal` open state changes                                                           |                 `Function`                  |                 |
| onTransitionIn               | Open transition start event handler                                                          |                 `Function`                  |                 |
| onTransitionOut              | Close transition start event handler                                                         |                 `Function`                  |                 |
| onTransitionInComplete       | Open transition end event handler                                                            |                 `Function`                  |                 |
| onTransitionOutComplete      | Close transition end event handler                                                           |                 `Function`                  |                 |
| open                         | Manages `Modal` visibility                                                                   |                  `boolean`                  |     `false`     |
| qa                           | Test attribute (`data-qa`)                                                                   |                  `string`                   |                 |
| style                        | `style` HTML attribute for the root node                                                     |                  `string`                   |                 |
| aria-label                   | `aria-label` HTML attribute to describe `Modal`                                              |                  `string`                   |                 |
| aria-labelledby              | ID of the visible `Modal` caption element                                                    |                  `string`                   |                 |
| contentOverflow              | Determines whether the `Modal` has a scroll indicator inside or gets larger with the content |              `visible` `auto`               |    `visible`    |

`onOpenChange` receives `escape-key` for Escape, `outside-press` for an outside click, and `undefined` for the screen-reader dismiss button. Close when `open` becomes `false` regardless of the reason.

## CSS API

| Name                      | Description                       |
| :------------------------ | :-------------------------------- |
| `--g-modal-margin`        | Margin around the `Modal` content |
| `--g-modal-border-radius` | `Modal` content border radius     |
| `--g-modal-width`         | `Modal` content width             |
| `--g-modal-min-width`     | `Modal` content min width         |
| `--g-modal-max-width`     | `Modal` content max width         |
| `--g-modal-height`        | `Modal` content height            |
| `--g-modal-min-height`    | `Modal` content min height        |
| `--g-modal-max-height`    | `Modal` content max height        |
