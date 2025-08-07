<!--GITHUB_BLOCK-->

# Drawer

<!--/GITHUB_BLOCK-->

```tsx
import {Drawer} from '@gravity-ui/uikit';
```

The `Drawer` component is a versatile interface element used in web applications to provide a sliding panel that emerges from the edge of the screen. This panel can house navigations, tools, or additional content. The component is implemented using React and CSS transitions for smooth animations.

## Usage

Here is a simple example of how to use the `Drawer` component:

```tsx
import React from 'react';
import {Drawer} from '@gravity-ui/uikit';

const App = () => {
  const [isVisible, setVisible] = React.useState(false);

  return (
    <div>
      <button onClick={() => setVisible(true)}>Open Drawer</button>
      <Drawer onOpenChange={setVisible} open={isVisible}>
        <p>Content of the drawer</p>
      </Drawer>
    </div>
  );
};

export default App;
```

## Properties

| Name                  | Description                                                                                 |         Type          |     Default     |
| :-------------------- | :------------------------------------------------------------------------------------------ | :-------------------: | :-------------: |
| veilClassName         | Optional additional class names to style the veil (overlay) element.                        |       `string`        |                 |
| className             | `class` HTML attribute for the root node                                                    |       `string`        |                 |
| qa                    | Test attribute (`data-qa`)                                                                  |       `string`        |                 |
| style                 | `style` HTML attribute for the root node                                                    | `React.CSSProperties` |                 |
| aria-label            | `aria-label` HTML attribute to describe `Drawer`                                            |       `string`        |                 |
| aria-labelledby       | ID of the visible `Drawer` caption element                                                  |       `string`        |                 |
| direction             | Specifies the direction from which the drawer should slide in                               |       `string`        |     `left`      |
| contentClassName      | `class` HTML attribute for the content node                                                 |       `string`        |                 |
| restoreFocusRef       | Element the focus will be restored to                                                       |   `React.RefObject`   |                 |
| children              | Any React content                                                                           |   `React.ReactNode`   |                 |
| container             | DOM element to which component is mounted via `Portal`                                      |     `HTMLElement`     | `document.body` |
| hideVeil              | Optional flag to hide the background darkening                                              |       `boolean`       |                 |
| autoFocus             | While open, the focus will be set to the first interactive element in the content           |       `boolean`       |     `true`      |
| focusTrap             | Enables focus trapping behavior                                                             |       `boolean`       |     `true`      |
| disableBodyScrollLock | Disables locking scroll while open                                                          |       `boolean`       |     `false`     |
| disableEscapeKeyDown  | Disables triggering close on `Esc`                                                          |       `boolean`       |     `false`     |
| disableOutsideClick   | Disables triggering close on outside clicks                                                 |       `boolean`       |     `false`     |
| disablePortal         | Disables using `Portal`                                                                     |       `boolean`       |     `false`     |
| keepMounted           | `Drawer` will not be removed from the DOM upon hiding                                       |       `boolean`       |     `false`     |
| resizable             | Enables resizing of the drawer via pointer                                                  |       `boolean`       |     `false`     |
| open                  | Manages `Drawer` visibility                                                                 |       `boolean`       |     `false`     |
| showInitialAnimation  | Option that enables first opening animation if the Drawer is being rendered with open state |       `boolean`       |     `false`     |
| onOpenChange          | Callback called at the moment of open state change                                          |      `Function`       |                 |
| onTransitionEnter     | Open transition start event handler                                                         |      `Function`       |                 |
| onTransitionExit      | Close transition start event handler                                                        |      `Function`       |                 |
| onTransitionEntered   | Open transition end event handler                                                           |      `Function`       |                 |
| onTransitionExited    | Close transition end event handler                                                          |      `Function`       |                 |
| onResizeEnd           | Callback called at the end of resizing                                                      |      `Function`       |                 |
| onResize              | Callback called when the drawer is being resized                                            |      `Function`       |                 |
| onResizeStart         | Callback called at the start of resizing                                                    |      `Function`       |                 |
| maxSize               | Max width of the drawer in pixels                                                           |       `number`        |                 |
| minSize               | Min width of the drawer in pixels                                                           |       `number`        |                 |
| size                  | Width of the drawer in pixels                                                               |       `number`        |                 |

## CSS API

| Name                                         | Description                                                 |                 Default                 |
| :------------------------------------------- | :---------------------------------------------------------- | :-------------------------------------: |
| DrawerItem                                   |                                                             |                                         |
| `--g-drawer-item-position`                   | The position of the drawer item on page                     |                 `fixed`                 |
| `--g-drawer-item-shadow`                     | The box-shadow of the drawer item when the veil is hidden   | `0 1px 5px 0 var(--g-color-sfx-shadow)` |
| `--g-drawer-item-left-offset`                | The left offset of the drawer item                          |                   `0`                   |
| `--g-drawer-item-top-offset`                 | The top offset of the drawer item                           |                   `0`                   |
| Veil                                         |                                                             |                                         |
| `--g-drawer-veil-background-color`           | The color of the veil element                               |          `--g-color-sfx-veil`           |
| Resizer                                      |                                                             |                                         |
| `--g-drawer-item-resizer-width`              | The width of the resizer element                            |                   8px                   |
| `--g-drawer-item-resizer-color`              | The color of the resizer element                            |        `--g-color-base-generic`         |
| `--g-drawer-item-resizer-handle-color`       | The color of the resizer handle                             |        `--g-color-line-generic`         |
| `--g-drawer-item-resizer-handle-color-hover` | The color of the resizer handle when the resizer is hovered |     `--g-color-line-generic-hover`      |
| `--g-drawer-item-resizer-z-index`            | z-index of the resizer element                              |                   100                   |
| `--g-drawer-veil-z-index`                    | z-index of the veil                                         |                `"auto"`                 |
| `--g-drawer-item-z-index`                    | z-index of the drawer item                                  |                   110                   |
