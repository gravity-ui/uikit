# Menu

The `Menu` component displays list of choices in the `Popup` when interacting with its trigger, typically a button.

There are a collection of related components:

- `Menu` - the container of the menu
- `MenuItem` - an option to select from the menu
- `MenuDivider` - a divider for grouping options
- `MenuTrigger` - a built-in default trigger, `Button` with ellipsis icon

## Basic usage

```jsx
import {Menu, MenuItem, MenuDivider, MenuTrigger} from '@gravity-ui/uikit';

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
import {Menu, MenuItem, MenuDivider, MenuTrigger} from '@gravity-ui/uikit';

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

By default `Menu` is rendered inside the `Popup`. But you can render it inline using `inline` prop in your own container.

## Properties

| Name            | Description                                     |                                              Type                                               |     Default      |
| :-------------- | :---------------------------------------------- | :---------------------------------------------------------------------------------------------: | :--------------: |
| className       | HTML `class` attribute                          |                                            `string`                                             |                  |
| style           | HTML `style` attribute                          |                                      `React.CSSProperties`                                      |                  |
| aria-label      | Accessible name for the menu                    |                                            `string`                                             |                  |
| aria-labelledby | ID of an element that names the menu            |                                            `string`                                             |                  |
| qa              | Test ID (`data-qa` attribute)                   |                                            `string`                                             |                  |
| open            | Controlled state for `open`                     |                                            `boolean`                                            |                  |
| defaultOpen     | Uncontrolled state for `open`                   |                                            `boolean`                                            |                  |
| children        | Menu related components (items, dividers, etc.) |                                        `React.ReactNode`                                        |                  |
| disabled        | Disabled state                                  |                                            `boolean`                                            |     `false`      |
| inline          | Renders the menu inline                         |                                            `boolean`                                            |     `false`      |
| trigger         | Trigger element which opens the menu            | `React.ReactElement` `(triggerProps, triggerRef) => React.ReactElement` `VirtualElement` `null` |                  |
| placement       | Popup placement                                 |                                        `PopupPlacement`                                         | `"bottom-start"` |
| onOpenChange    | Callback for `open` state change                |                `(open: boolean, event: Event, reason: OpenChangeReason) => void`                |                  |
| size            | The `Menu` size                                 |                                    `"s"` `"m"` `"l"` `"xl"`                                     |      `"m"`       |

### MenuItem

`MenuItem` accepts any valid `button` or `a` element props in addition to these:

When an `Icon` without an explicit size is passed to the `icon` property, its size is selected
automatically according to the `Menu` size. Set the `Icon` `size`, `width`, or `height` explicitly
to override it.

| Name      | Description                         |                                Type                                |  Default   |
| :-------- | :---------------------------------- | :----------------------------------------------------------------: | :--------: |
| qa        | Test ID (`data-qa` attribute)       |                              `string`                              |            |
| theme     | The `MenuItem` theme                | `"normal"` `"info"` `"success"` `"warning"` `"danger"` `"utility"` | `"normal"` |
| selected  | Selected state (`menuitemcheckbox`) |                             `boolean`                              |            |
| disabled  | Disabled state                      |                             `boolean`                              |  `false`   |
| icon      | Render slot for an icon             |                        `React.ReactElement`                        |            |
| arrow     | Render slot for a nested menu arrow |                        `React.ReactElement`                        |            |
| children  | Content                             |                         `React.ReactNode`                          |            |
| component | Custom root component               |                        `React.ElementType`                         |            |

### MenuTrigger

`MenuTrigger` accepts any `Button` component props in addition to these:

| Name | Description             |            Type             |    Default     |
| :--- | :---------------------- | :-------------------------: | :------------: |
| icon | Type of icon to display | `"horizontal"` `"vertical"` | `"horizontal"` |
