# Drawer

```tsx
import {Drawer} from '@gravity-ui/uikit';
```

The Drawer component is a versatile interface element used in web applications to provide a sliding panel that emerges from the edge of the screen. This panel can house navigations, tools, or additional content. The component is implemented using React and CSS transitions for smooth animations.

## Usage

Here is a simple example of how to use the Drawer component:

```tsx
import React from 'react';
import {Drawer, DrawerItem} from '@gravity-ui/uikit';

const App = () => {
  const [isVisible, setVisible] = React.useState(false);

  return (
    <div>
      <button onClick={() => setVisible(true)}>Open Drawer</button>
      <Drawer onEscape={() => setVisible(false)} onVeilClick={() => setVisible(false)}>
        <DrawerItem id="item1" visible={isVisible}>
          <p>Content of the drawer</p>
        </DrawerItem>
      </Drawer>
    </div>
  );
};

export default App;
```

An example of a resizable drawer item

```tsx
import React from 'react';
import {Drawer, DrawerItem} from '@gravity-ui/uikit';

const App = () => {
  const [isVisible, setVisible] = React.useState(false);
  const [width, setWidth] = React.useState(400);

  return (
    <div>
      <button onClick={() => setVisible(true)}>Open Drawer</button>
      <Drawer onEscape={() => setVisible(false)} onVeilClick={() => setVisible(false)}>
        <DrawerItem id="item1" visible={isVisible} resizable width={width} onResize={setWidth}>
          <p>Content of the drawer</p>
        </DrawerItem>
      </Drawer>
    </div>
  );
};

export default App;
```

## Components

The Drawer module consists of two primary components: `Drawer` and `DrawerItem`.

### `DrawerItem` Props

| Name             | Description                                                                               |           Type            | Default |
| :--------------- | :---------------------------------------------------------------------------------------- | :-----------------------: | :-----: |
| id               | Unique identifier for the drawer item.                                                    |         `string`          |         |
| children         | Content to be displayed within the drawer item.                                           |     `React.ReactNode`     |         |
| visible          | Determines whether the drawer item is visible or hidden.                                  |         `boolean`         |         |
| direction        | Specifies the direction from which the drawer should slide in (left, right, top, bottom). |     `DrawerDirection`     | `left`  |
| className        | HTML `class` attribute                                                                    |         `string`          |         |
| resizable        | Determines whether the drawer item can be resized                                         |         `boolean`         |         |
| width            | The width of the resizable drawer item                                                    |         `number`          |         |
| onResizeStart    | Callback function called at the start of resizing.                                        |       `() => void`        |         |
| onResize         | Callback function called at the end of resizing. Can be used to save the new width.       | `(width: number) => void` |         |
| onResizeContinue | Callback function called each time when the drawer item is resizing.                      | `(width: number) => void` |         |
| minResizeWidth   | The minimum width of the resizable drawer item                                            |         `number`          |         |
| maxResizeWidth   | The maximum width of the resizable drawer item                                            |         `number`          |         |
| keepMounted      | Keep child components mounted when closed, prioritized over Drawer.keepMounted property   |         `boolean`         | `false` |
| style            | Optional inline styles to be applied to the DrawerItem component.                         |   `React.CSSProperties`   |         |
| qa               | `data-qa` HTML attribute, used for testing                                                |         `string`          |

### `Drawer` Props

| Name          | Description                                                                                      |                Type                 | Default |
| :------------ | :----------------------------------------------------------------------------------------------- | :---------------------------------: | :-----: |
| children      | Child components to be rendered within the drawer.                                               |   `'DrawerChild' 'DrawerChild[]'`   |         |
| className     | Optional additional class names to style the drawer component.                                   |              `string`               |         |
| veilClassName | Optional additional class names to style the veil (overlay) element.                             |              `string`               |         |
| style         | Optional inline styles to be applied to the drawer component.                                    |        `React.CSSProperties`        |         |
| onVeilClick   | Optional callback function that is called when the veil (overlay) is clicked.                    | `(event: React.MouseEvent) => void` |         |
| onEscape      | Optional callback function that is called when the escape key is pressed, if the drawer is open. |  `(event: KeyboardEvent) => void`   |         |
| hideVeil      | Optional flag to hide the background darkening                                                   |              `boolean`              |         |
| usePortal     | Optional flag to render drawer inside `Portal`                                                   |              `boolean`              | `false` |
| keepMounted   | Keep child components mounted when closed                                                        |              `boolean`              | `false` |
| qa            | `data-qa` HTML attribute, used for testing                                                       |              `string`               |         |

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
| `--g-drawer-item-z-index`                    | z-index of the drawer item                                  |                `"auto"`                 |
