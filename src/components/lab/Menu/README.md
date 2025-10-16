# unstable_Menu

> The `unstable_Menu` component is future replacement of current components `Menu` and `DropdownMenu`. The component is unstable,
> so it means breaking changes can occur during minor or patch releases. Be aware of that.

The `unstable_Menu` component displays list of choices in the `Popup` when interacting with its trigger, typically a button.

There are a collection of related components:

- `unstable_Menu` - the container of the menu
- `unstable_MenuItem` - an option to select from the menu
- `unstable_MenuDivider` - a divider for grouping options
- `unstable_MenuTrigger` - a built-in default trigger, `Button` with ellipsis icon

## Basic usage

```jsx
import {
  unstable_Menu as Menu,
  unstable_MenuItem as MenuItem,
  unstable_MenuDvivider as MenuDivider,
  unstable_MenuTrigger as MenuTrigger,
} from '@gravity-ui/uikit/unstable';

function BasicMenu() {
  return (
    <Menu trigger={<MenuTrigger />}>
      <MenuItem>Copy</MenuItem>
      <MenuItem>Move</MenuItem>
      <MenuDivider />
      <MenuItem theme="danger">Delete</MenuItem>
    </Menu>
  );
}
```

## Custom trigger

You can render any kind of component as a trigger if it accepts basic HTMLAttributes as props and a ref for HTMLElement.
For more complex components you can use a function variant of `trigger` prop that have `triggerProps` as the first argument
and `triggerRef` as the second argument which you should pass to your component.

## Context menu

To implement context menu pattern you should use "virtual element" as a trigger:

```jsx
import {
  unstable_Menu as Menu,
  unstable_MenuItem as MenuItem,
  unstable_MenuDvivider as MenuDivider,
  unstable_MenuTrigger as MenuTrigger,
} from '@gravity-ui/uikit/unstable';

function ContextMenu() {
  const [trigger, setTrigger] = React.useState(null);

  React.useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();
      setTrigger({
        getBoundingClientRect() {
          return {
            width: 0,
            height: 0,
            x: event.clientX,
            y: event.clientY,
            top: event.clientY,
            right: event.clientX,
            bottom: event.clientY,
            left: event.clientX,
          };
        },
      });
    };
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  return (
    <Menu trigger={trigger}>
      <MenuItem>Copy</MenuItem>
      <MenuItem>Move</MenuItem>
      <MenuDivider />
      <MenuItem theme="danger">Delete</MenuItem>
    </Menu>
  );
}
```

## Inline mode

By default `unstable_Menu` is rendered inside the `Popup`. But you can render it inline using `inline` prop in your own container.

## Properties

| Name         | Description                                     |                                  Type                                   | Default |
| :----------- | :---------------------------------------------- | :---------------------------------------------------------------------: | :-----: |
| className    | HTML `class` attribute                          |                          `React.CSSProperties`                          |         |
| style        | HTML `style` attribute                          |                                `string`                                 |         |
| qa           | Test ID (`data-qa` attribute)                   |                                `string`                                 |         |
| open         | Controlled state for `open`                     |                                `boolean`                                |         |
| defaultOpen  | Uncontrolled state for `open`                   |                                `boolean`                                |         |
| children     | Menu related components (items, dividers, etc.) |                            `React.ReactNode`                            |         |
| disabled     | Disabled state                                  |                                `boolean`                                | `false` |
| inline       | Renders the menu inline                         |                                `boolean`                                | `false` |
| trigger      | Trigger element which opens the menu            | `React.ReactElement` `(triggerProps, triggerRef) => React.ReactElement` |         |
| onOpenChange | Callback for `open` state change                |    `(open: boolean, event: Event, reason: OpenChangeReason) => void`    |         |
| size         | The `unstable_Menu` size                        |                        `"s"` `"m"` `"l"` `"xl"`                         |  `"m"`  |

### unstable_MenuItem

`unstable_MenuItem` accepts any valid `button` or `a` element props in addition to these:

| Name      | Description                         |                                Type                                |  Default   |
| :-------- | :---------------------------------- | :----------------------------------------------------------------: | :--------: |
| qa        | Test ID (`data-qa` attribute)       |                              `string`                              |            |
| theme     | The `unstable_MenuItem` theme       | `"normal"` `"info"` `"success"` `"warning"` `"danger"` `"utility"` | `"normal"` |
| selected  | Selected state                      |                             `boolean`                              |  `false`   |
| disabled  | Disabled state                      |                             `boolean`                              |  `false`   |
| icon      | Render slot for an icon             |                         `React.ReactNode`                          |            |
| arrow     | Render slot for a nested menu arrow |                         `React.ReactNode`                          |            |
| children  | Content                             |                         `React.ReactNode`                          |            |
| component | Custom root component               |                        `React.ElementType`                         |            |

### unstable_MenuTrigger

`unstable_MenuTrigger` accepts any `Button` component props in addition to these:

| Name | Description             |            Type             |    Default     |
| :--- | :---------------------- | :-------------------------: | :------------: |
| icon | Type of icon to display | `"horizontal"` `"vertical"` | `"horizontal"` |
