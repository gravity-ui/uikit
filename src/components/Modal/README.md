<!--GITHUB_BLOCK-->

# Modal

<!--/GITHUB_BLOCK-->

```tsx
import {Modal} from '@gravity-ui/uikit';
```

The `Modal` component serves as base for creating pop-up windows with a backdrop above the rest of the content on a page.
It disables scrolling while opening and manages focus for content. The child components of `Modal` are rendered inside the [`Portal`](../Portal) component.
Through `Modal`, you can implement dialogs, alerts, confirmations, and more.

## Usage

```tsx
import React from 'react';
import {Button, Modal} from '@gravity-ui/uikit';

const [open, setOpen] = React.useState(false);

<Button onClick={() => setOpen(true)}>Open Modal</Button>
<Modal open={open} onClose={() => setOpen(false)}>
    Content
</Modal>
```

## Properties

| Name                  | Description                                                                         |       Type        |     Default     |
| :-------------------- | :---------------------------------------------------------------------------------- | :---------------: | :-------------: |
| autoFocus             | While opened, the focus will be set to the first interactive element in the content |     `boolean`     |     `true`      |
| children              | Any React content                                                                   | `React.ReactNode` |                 |
| className             | HTML `class` attribute for root node                                                |     `string`      |                 |
| container             | DOM element to which children are to be mounted to                                  |   `HTMLElement`   | `document.body` |
| contentClassName      | HTML `class` atribute for content node                                              |     `string`      |                 |
| disableBodyScrollLock | Do not lock scroll while open                                                       |     `boolean`     |     `false`     |
| disableEscapeKeyDown  | Do not trigger close on `Esc`                                                       |     `boolean`     |     `false`     |
| disableOutsideClick   | Do not trigger close on outside clicks                                              |     `boolean`     |     `false`     |
| focusTrap             | Enable focus trapping behavior                                                      |     `boolean`     |     `true`      |
| keepMounted           | `Modal` will not be removed from the DOM upon hiding                                |     `boolean`     |     `false`     |
| onClose               | Handle `Modal` close event                                                          |    `Function`     |                 |
| onEnterKeyDown        | `Enter` press event handler                                                         |    `Function`     |                 |
| onEscapeKeyDown       | `Esc` press event handler                                                           |    `Function`     |                 |
| onTransitionEnter     | Open transition start event handler                                                 |    `Function`     |                 |
| onTransitionExit      | Close transition start event handler                                                |    `Function`     |                 |
| onTransitionEntered   | Open transition end event handler                                                   |    `Function`     |                 |
| onTransitionExited    | Close transition end event handler                                                  |    `Function`     |                 |
| onOutsideClick        | Outside click event handler                                                         |    `Function`     |                 |
| open                  | Manages `Modal` visibility                                                          |     `boolean`     |     `false`     |
| qa                    | Test attribute (`data-qa`)                                                          |     `string`      |                 |
| restoreFocusRef       | Element the focus will be restored to                                               | `React.RefObject` |                 |
| style                 | HTML `style` atribute for root node                                                 |     `string`      |                 |
| aria-label            | HTML `aria-label` attribute to describe the `Modal`                                 |     `string`      |                 |
| aria-labelledby       | Id of the visible `Modal` caption element                                           |     `string`      |                 |
| scroll                | Define scroll position when the modal becomes too long to fit the screen            |  `inner` `outer`  |     `outer`     |
