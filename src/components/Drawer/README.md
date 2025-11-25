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

## Direction

To control the direction of the `Drawer`, you can pass the `direction` prop. The possible values are `left`, `right`, `top`, and `bottom`.

```tsx
<Drawer onOpenChange={setVisible} open={isVisible} direction="left">
  <p>Content of the drawer</p>
</Drawer>
<Drawer onOpenChange={setVisible} open={isVisible} direction="right">
  <p>Content of the drawer</p>
</Drawer>
<Drawer onOpenChange={setVisible} open={isVisible} direction="top">
  <p>Content of the drawer</p>
</Drawer>
<Drawer onOpenChange={setVisible} open={isVisible} direction="bottom">
  <p>Content of the drawer</p>
</Drawer>
```

## Resizable

A `Drawer` can be resizable by passing the `resizable` prop.

```tsx
<Drawer onOpenChange={setVisible} open={isVisible} resizable>
  <p>Content of the drawer</p>
</Drawer>
```

## Properties

| Name                    | Description                                                                                  |                Type                |     Default     |
| :---------------------- | :------------------------------------------------------------------------------------------- | :--------------------------------: | :-------------: |
| className               | `class` HTML attribute for the root node                                                     |              `string`              |                 |
| qa                      | Test attribute (`data-qa`)                                                                   |              `string`              |                 |
| style                   | `style` HTML attribute for the root node                                                     |       `React.CSSProperties`        |                 |
| aria-label              | `aria-label` HTML attribute to describe `Drawer`                                             |              `string`              |                 |
| aria-labelledby         | ID of the visible `Drawer` caption element                                                   |              `string`              |                 |
| aria-describedby        | `aria-describedby` for the `Drawer` element                                                  |              `string`              |                 |
| aria-details            | `aria-details` for the user `Drawer` element                                                 |              `string`              |                 |
| returnFocus             | Element to be focused on closing                                                             | `boolean` `React.Ref<HTMLElement>` |     `true`      |
| initialFocus            | Initial element to be focused. Positive number is the index of tabbable element.             | `number` `React.Ref<HTMLElement>`  |                 |
| direction               | Specifies the direction from which the drawer should slide in                                |              `string`              |     `left`      |
| contentClassName        | `class` HTML attribute for the content node                                                  |              `string`              |                 |
| children                | Any React content                                                                            |         `React.ReactNode`          |                 |
| container               | DOM element to which component is mounted via `Portal`                                       |           `HTMLElement`            | `document.body` |
| hideVeil                | Optional flag to hide the background darkening                                               |             `boolean`              |                 |
| disableBodyScrollLock   | Disables locking scroll while open                                                           |             `boolean`              |     `false`     |
| disableEscapeKeyDown    | Disables triggering close on `Esc`                                                           |             `boolean`              |     `false`     |
| disableOutsideClick     | Disables triggering close on outside clicks                                                  |             `boolean`              |     `false`     |
| disablePortal           | Disables using `Portal`                                                                      |             `boolean`              |     `false`     |
| keepMounted             | `Drawer` will not be removed from the DOM upon hiding                                        |             `boolean`              |     `false`     |
| resizable               | Enables resizing of the drawer via pointer                                                   |             `boolean`              |     `false`     |
| open                    | Manages `Drawer` visibility                                                                  |             `boolean`              |     `false`     |
| defaultOpen             | Specifies `Drawer` default visibility state                                                  |             `boolean`              |     `false`     |
| skipInitialAnimation    | Option that disables first opening animation if the Drawer is being rendered with open state |             `boolean`              |     `false`     |
| onOpenChange            | Callback called at the moment of open state change                                           |             `Function`             |                 |
| onTransitionIn          | The callback fired on transition "in" start                                                  |             `Function`             |                 |
| onTransitionInComplete  | The callback fired on transition "in" complete                                               |             `Function`             |                 |
| onTransitionOut         | The callback fired on transition "out" start                                                 |             `Function`             |                 |
| onTransitionOutComplete | The callback fired on transition "out" complete                                              |             `Function`             |                 |
| onResizeEnd             | Callback called at the end of resizing                                                       |             `Function`             |                 |
| onResize                | Callback called when the drawer is being resized                                             |             `Function`             |                 |
| onResizeStart           | Callback called at the start of resizing                                                     |             `Function`             |                 |
| maxSize                 | Max width or height of the drawer in pixels                                                  |              `number`              |                 |
| minSize                 | Min width or height of the drawer in pixels                                                  |              `number`              |                 |
| size                    | Width or height of the drawer in pixels                                                      |              `number`              |                 |

## CSS API

| Name                               | Description                   |
| :--------------------------------- | :---------------------------- |
| `--g-drawer-veil-background-color` | The color of the veil element |
