<!--GITHUB_BLOCK-->

# Modal

<!--/GITHUB_BLOCK-->

```tsx
import {Modal} from '@gravity-ui/uikit';
```

The `Modal` component serves as base for creating pop-up windows with a backdrop above the rest of the content on a page.
It disables scrolling while opening and manages focus for content. The `Modal` child components are rendered inside the [`Portal`](../Portal) component.
With `Modal`, you can implement dialogs, alerts, confirmations, and more.

## Usage

```tsx
import {useState} from 'react';
import {Button, Modal} from '@gravity-ui/uikit';

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Modal</Button>
<Modal open={open} onClose={() => setOpen(false)}>
    Content
</Modal>
```

## Properties

| Name                  | Description                                                                                  |       Type        |     Default     |
| :-------------------- | :------------------------------------------------------------------------------------------- | :---------------: | :-------------: |
| autoFocus             | While open, the focus will be set to the first interactive element in the content            |     `boolean`     |     `true`      |
| children              | Any React content                                                                            | `React.ReactNode` |                 |
| className             | `class` HTML attribute for the root node                                                     |     `string`      |                 |
| container             | DOM element to which component is mounted via `Portal`                                       |   `HTMLElement`   | `document.body` |
| contentClassName      | `class` HTML attribute for the content node                                                  |     `string`      |                 |
| disableBodyScrollLock | Disables locking scroll while open                                                           |     `boolean`     |     `false`     |
| disableEscapeKeyDown  | Disables triggering close on `Esc`                                                           |     `boolean`     |     `false`     |
| disableOutsideClick   | Disables triggering close on outside clicks                                                  |     `boolean`     |     `false`     |
| disablePortal         | Disables using `Portal`                                                                      |     `boolean`     |     `false`     |
| focusTrap             | Enables focus trapping behavior                                                              |     `boolean`     |     `true`      |
| keepMounted           | `Modal` will not be removed from the DOM upon hiding                                         |     `boolean`     |     `false`     |
| onClose               | Handles `Modal` close event                                                                  |    `Function`     |                 |
| onEnterKeyDown        | `Enter` press event handler                                                                  |    `Function`     |                 |
| onEscapeKeyDown       | `Esc` press event handler                                                                    |    `Function`     |                 |
| onTransitionEnter     | Open transition start event handler                                                          |    `Function`     |                 |
| onTransitionExit      | Close transition start event handler                                                         |    `Function`     |                 |
| onTransitionEntered   | Open transition end event handler                                                            |    `Function`     |                 |
| onTransitionExited    | Close transition end event handler                                                           |    `Function`     |                 |
| onOutsideClick        | Outside click event handler                                                                  |    `Function`     |                 |
| open                  | Manages `Modal` visibility                                                                   |     `boolean`     |     `false`     |
| qa                    | Test attribute (`data-qa`)                                                                   |     `string`      |                 |
| restoreFocusRef       | Element the focus will be restored to                                                        | `React.RefObject` |                 |
| style                 | `style` HTML attribute for the root node                                                     |     `string`      |                 |
| aria-label            | `aria-label` HTML attribute to describe `Modal`                                              |     `string`      |                 |
| aria-labelledby       | ID of the visible `Modal` caption element                                                    |     `string`      |                 |
| contentOverflow       | Determines whether the `Modal` has a scroll indicator inside or gets larger with the content | `visible` `auto`  |    `visible`    |

## CSS API

| Name                      | Description                       |
| :------------------------ | :-------------------------------- |
| `--g-modal-margin`        | Margin around the `Modal` content |
| `--g-modal-border-radius` | `Modal` content border radius     |
| `--g-modal-width`         | `Modal` content width             |
| `--g-modal-height`        | `Modal` content height            |
