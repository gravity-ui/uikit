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

## Placement

To control the placement of the `Drawer`, you can pass the `placement` prop. The possible values are `left`, `right`, `top`, and `bottom`.

```tsx
<Drawer onOpenChange={setVisible} open={isVisible} placement="left">
  <p>Content of the drawer</p>
</Drawer>
<Drawer onOpenChange={setVisible} open={isVisible} placement="right">
  <p>Content of the drawer</p>
</Drawer>
<Drawer onOpenChange={setVisible} open={isVisible} placement="top">
  <p>Content of the drawer</p>
</Drawer>
<Drawer onOpenChange={setVisible} open={isVisible} placement="bottom">
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

Additionally, you can use the `size` prop to control the size of the `Drawer` and pass the `onResize` handler to store the resized value.

```tsx
const [size, setSize] = useState(500);

<Drawer onOpenChange={setVisible} open={isVisible} resizable size={size} onResize={setSize}>
  <p>Content of the drawer</p>
</Drawer>;
```

## Properties

| Name                    | Description                                                                                                                       |                Type                |     Default     |
| :---------------------- | :-------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------: | :-------------: |
| className               | `class` HTML attribute for the root node                                                                                          |              `string`              |                 |
| qa                      | Test attribute (`data-qa`)                                                                                                        |              `string`              |                 |
| style                   | `style` HTML attribute for the root node                                                                                          |       `React.CSSProperties`        |                 |
| aria-label              | `aria-label` HTML attribute to describe `Drawer`                                                                                  |              `string`              |                 |
| aria-labelledby         | ID of the visible `Drawer` caption element                                                                                        |              `string`              |                 |
| aria-describedby        | `aria-describedby` for the `Drawer` element                                                                                       |              `string`              |                 |
| aria-details            | `aria-details` for the user `Drawer` element                                                                                      |              `string`              |                 |
| returnFocus             | Element to be focused on closing                                                                                                  | `boolean` `React.Ref<HTMLElement>` |     `true`      |
| initialFocus            | Initial element to be focused. Positive number is the index of tabbable element.                                                  | `number` `React.Ref<HTMLElement>`  |                 |
| placement               | Specifies the side from which the drawer should slide in                                                                          |              `string`              |     `left`      |
| contentClassName        | `class` HTML attribute for the content node                                                                                       |              `string`              |                 |
| children                | Any React content                                                                                                                 |         `React.ReactNode`          |                 |
| container               | DOM element to which component is mounted via `Portal`                                                                            |           `HTMLElement`            | `document.body` |
| disableBodyScrollLock   | Disables locking scroll while open                                                                                                |             `boolean`              |     `false`     |
| disableEscapeKeyDown    | Disables triggering close on `Esc`                                                                                                |             `boolean`              |     `false`     |
| disableOutsideClick     | Disables triggering close on outside clicks                                                                                       |             `boolean`              |     `false`     |
| disablePortal           | Disables using `Portal`                                                                                                           |             `boolean`              |     `false`     |
| keepMounted             | `Drawer` will not be removed from the DOM upon hiding                                                                             |             `boolean`              |     `false`     |
| resizable               | Enables resizing of the drawer via pointer                                                                                        |             `boolean`              |     `false`     |
| open                    | Manages `Drawer` visibility                                                                                                       |             `boolean`              |     `false`     |
| hideVeil                | Removes the `Drawer`'s veil                                                                                                       |             `boolean`              |     `false`     |
| onOpenChange            | Callback called at the moment of open state change                                                                                |             `Function`             |                 |
| onTransitionIn          | The callback fired on transition "in" start                                                                                       |             `Function`             |                 |
| onTransitionInComplete  | The callback fired on transition "in" complete                                                                                    |             `Function`             |                 |
| onTransitionOut         | The callback fired on transition "out" start                                                                                      |             `Function`             |                 |
| onTransitionOutComplete | The callback fired on transition "out" complete                                                                                   |             `Function`             |                 |
| onResizeEnd             | Callback called at the end of resizing                                                                                            |             `Function`             |                 |
| onResize                | Callback called when the drawer is being resized                                                                                  |             `Function`             |                 |
| onResizeStart           | Callback called at the start of resizing                                                                                          |             `Function`             |                 |
| maxSize                 | Max width or height of the drawer in pixels                                                                                       |              `number`              |                 |
| minSize                 | Min width or height of the drawer in pixels                                                                                       |              `number`              |                 |
| size                    | Width or height of the drawer in pixels. When the `auto` option is passed, the Drawer's width or height will auto to its content. |         `number \| 'auto'`         |                 |
