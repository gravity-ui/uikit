## DropdownMenu

Dropdown menu with adjustable toggle (button with horizontal ellipsis by default).

### PropTypes

| Property                 | Type                         | Required | Default | Description                                                                       |
| :----------------------- | :--------------------------- | :------: | :------ | :-------------------------------------------------------------------------------- |
| [items](#items)          | `DropdownMenuItem[]`         |          | []      | Menu items                                                                        |
| data                     | `T`                          |          |         | Menu context                                                                      |
| icon                     | `JSX node`                   |          |         | `<Icon/>` component that overrides default icon of `switcher`.                    |
| size                     | `DropdownMenuSize`           |          |         | Size used for switcher and menu                                                   |
| disabled                 | `Boolean`                    |          |         | `switcher` disabled state.                                                        |
| switcher                 | `JSX node`                   |          |         | `switcher` component.                                                             |
| switcherWrapperClassName | `string`                     |          |         | Default className for parent of the `switcher`                                    |
| defaultSwitcherProps     | `ButtonProps`                |          |         | `switcher` props, when default component used (except `disabled` and `className`) |
| defaultSwitcherClassName | `string`                     |          |         | Class name for default `switcher`                                                 |
| menuProps                | `MenuProps`                  |          |         | Allows to override the properties of the dropdown Menu                            |
| onMenuToggle             | `() => void`                 |          |         | Handler called when menu open or close.                                           |
| onSwitcherClick          | `(React.MouseEvent) => void` |          |         | Handler for click on `switcher`                                                   |
| hideOnScroll             | `Boolean`                    |          | true    | Hide menu on scroll on parent elements                                            |
| popupPlacement           | `PopupPlacement`             |          |         | Allowed menu open placement                                                       |
| popupClassName           | `String`                     |          |         | Menu class name                                                                   |
| children                 | `JSX node`                   |          |         | Menu component override                                                           |

### Items

Array of `DropdownMenuItem` objects or array of arrays for groups. Groups are divided with horizontal separators. `DropdownMenuItem` props:

| Property   | Type                            | Required | Default | Description                                                              |
| :--------- | :------------------------------ | :------: | :------ | :----------------------------------------------------------------------- |
| text       | `JSX node`                      |   yes    |         | Menu item text                                                           |
| action     | `(React.MouseEvent, T) => void` |   yes    |         | Click handler for menu item. Recieves event and `data` of `DropdownMenu` |
| icon       | `JSX node`                      |          |         | Menu item icon                                                           |
| hidden     | `boolean`                       |          |         | Hide menu item                                                           |
| disabled   | `boolean`                       |          |         | Disabled state                                                           |
| href       | `string`                        |          |         | Render menu item as `<a>`                                                |
| target     | `string`                        |          |         | `target` attribute of `<a>`                                              |
| rel        | `string`                        |          |         | `rel` attribute of `<a>`                                                 |
| extraProps | `object`                        |          |         | Additional props for menu item                                           |
| title      | `string`                        |          |         | HTML `title`                                                             |
| className  | `string`                        |          |         | Class name                                                               |

Example:

```jsx harmony
<DropdownMenu
  items={[
    {
      action: () => console.log('==> calls "Open"'),
      text: 'Open',
      icon: <Icon data={iconOpen} />,
    },
    [
      {
        action: () => console.log('==> calls "Remove"'),
        text: 'Remove',
        icon: <Icon data={iconTrash} />,
      },
      {
        action: () => console.log('==> calls "Rename"'),
        text: 'Rename',
        icon: <Icon data={iconRename} />,
        hidden: true,
      },
    ],
    {
      action: () => console.log('==> calls "Properties"'),
      text: 'Properties',
      icon: <Icon data={iconProperties} />,
    },
  ]}
/>
```
