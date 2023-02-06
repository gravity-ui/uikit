# DropdownMenu

A dropdown menu with a customizable toggle. By default, the toggle is an ellipsis button (**⋯**).

## Props

| Name                       | Type                                               | Required | Default value | Description                                                                                         |
| :------------------------- | :------------------------------------------------- | :------: | :------------ | :-------------------------------------------------------------------------------------------------- |
| `items`                    | `(DropdownMenuItem \| DropdownMenuItem[])[] \| []` |          |               | Array of items. Nested arrays of items represent visually separated groups.                         |
| `data`                     | `any`                                              |          |               | A payload passed to the actions called from the menu. (Can be useful for context menus.)            |
| `icon`                     | `ReactNode`                                        |          | Ellipsis icon | An icon of the default `switcher`.                                                                  |
| `size`                     | `'s' \| 'm' \| 'l' \| 'xl' \| 'm'`                 |          |               | Applied for the default `switcher` and the menu.                                                    |
| `disabled`                 | `boolean`                                          |          |               | Setting this prop to `true` disables the `switcher` button and prevents the menu from being opened. |
| `switcher`                 | `ReactNode`                                        |          |               | A menu toggle control.                                                                              |
| `switcherWrapperClassName` | `string`                                           |          |               | A value for the `className` prop of the `switcher`'s parent component.                              |
| `defaultSwitcherProps`     | `ButtonProps`                                      |          |               | Default `switcher` props.                                                                           |
| `defaultSwitcherClassName` | `string`                                           |          |               | A value for the `className` prop of the default `switcher`.                                         |
| `menuProps`                | `MenuProps`                                        |          |               | Overrides the default dropdown menu popup props.                                                    |
| `popupProps`               | `PopupProps`                                       |          |               | Overrides the default popup props.                                                                  |
| `open`                     | `boolean`                                          |          |               | Used to control dropdown menu visibility                                                            |
| `onOpenToggle`             | `() => void`                                       |          |               | Called when the menu is opened or closed.                                                           |
| `onSwitcherClick`          | `React.MouseEventHandler<HTMLElement>`             |          |               | Called when `switcher` is clicked.                                                                  |
| `hideOnScroll`             | `boolean`                                          |          | `true`        | Specifies whether to hide the menu when a parent element is scrolled.                               |
| `children`                 | `ReactNode`                                        |          |               | Custom content inside the menu popup.                                                               |

### DropdownMenuItem

This type describes an individual dropdown menu item.

| Name         | Type                                           | Required | Default | Description                                                                                                               |
| :----------- | :--------------------------------------------- | :------: | :------ | :------------------------------------------------------------------------------------------------------------------------ |
| `text`       | `ReactNode`                                    |   yes    |         | Menu item content.                                                                                                        |
| `action`     | `(event: React.MouseEvent, data: any) => void` |   yes    |         | A menu item click handler. Recieves the parameters (both `event` and `data`) from the parent dropdown menu component.     |
| `icon`       | `ReactNode`                                    |          |         | A menu item icon.                                                                                                         |
| `hidden`     | `boolean`                                      |          |         |                                                                                                                           |
| `disabled`   | `boolean`                                      |          |         |                                                                                                                           |
| `href`       | `string`                                       |          |         | A menu item with this prop becomes a link to the specified location.                                                      |
| `target`     | `string`                                       |          |         | Same as the `target` attribute of the `<a>` tag.                                                                          |
| `rel`        | `string`                                       |          |         | Same as the `rel` attribute of the `<a>` tag.                                                                             |
| `extraProps` | `object`                                       |          |         | Additional menu item props.                                                                                               |
| `title`      | `string`                                       |          |         | A tooltip text.                                                                                                           |
| `className`  | `string`                                       |          |         |                                                                                                                           |
| `items`      | `(DropdownMenuItem` or `DropdownMenuItem[])[]` |          |         | Sub-menu items                                                                                                            |
| `popupProps` | `string`                                       |          |         | Sub-menu popup props                                                                                                      |
| `path`       | `number[]`                                     |          |         | Path of indexes from the root to the current item                                                                         |
| `closeMenu`  | `() => void`                                   |          |         | Custom `closeMenu` callback, can be called instead of closing the main menu, used to close sub-menus before the main menu |

## Example

```jsx harmony
<DropdownMenu
  items={[
    {
      action: () => console.log('Open'),
      text: 'Open',
      icon: <Icon data={openIcon} />,
    },
    [
      {
        action: () => console.log('Remove'),
        text: 'Remove',
        icon: <Icon data={trashIcon} />,
      },
      {
        action: () => console.log('Rename'),
        text: 'Rename',
        icon: <Icon data={renameIcon} />,
        hidden: true,
      },
    ],
    {
      action: () => console.log('Properties'),
      text: 'Properties',
      icon: <Icon data={propertiesIcon} />,
    },
  ]}
/>
```

Usage with custom `<Menu/>`

```tsx
import {DropdownMenu, Menu} from './DropdownMenu';

const dropdown = (
  <DropdownMenu>
    <Menu>
      <DropdownMenu.Item icon={<Icon data={openIcon} />} action={() => console.log('Open')}>
        Open
      </DropdownMenu.Item>
      <Menu.Group>
        <DropdownMenu.Item icon={<Icon data={trashIcon} />} action={() => console.log('Remove')}>
          Remove
        </DropdownMenu.Item>
        <DropdownMenu.Item icon={<Icon data={renameIcon} />} action={() => console.log('Rename')}>
          Rename
        </DropdownMenu.Item>
      </Menu.Group>
      <DropdownMenu.Item
        icon={<Icon data={propertiesIcon} />}
        action={() => console.log('Properties')}
      >
        Properties
      </DropdownMenu.Item>
    </Menu>
  </DropdownMenu>
);
```
