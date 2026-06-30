<!--GITHUB_BLOCK-->

# DropdownMenu

<!--/GITHUB_BLOCK-->

```tsx
import {DropdownMenu} from '@gravity-ui/uikit';
```

The dropdown menu component provides item grouping, submenus, and a customizable toggle. The dropdown menu items are configured with the `items` property. By default, the menu toggle is a button with the ellipsis icon (**⋯**), which can be overridden with the `renderSwitcher` property.

<!--SANDBOX
import type {DropdownMenuItem} from '@gravity-ui/uikit';
import {DropdownMenu} from '@gravity-ui/uikit';

const items: DropdownMenuItem[] = [
    {
        action: () => console.log('Rename'),
        text: 'Rename',
    },
    {
        action: () => console.log('Delete'),
        text: 'Delete',
        theme: 'danger',
    },
];

export default function () {
    return <DropdownMenu items={items} />;
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```jsx
<DropdownMenu
  items={[
    {
      action: () => console.log('Rename'),
      text: 'Rename',
    },
    {
      action: () => console.log('Delete'),
      text: 'Delete',
      theme: 'danger',
    },
  ]}
/>
```

<!--/GITHUB_BLOCK-->

## Grouped items

`DropdownMenu` items can be grouped and visually separated from other menu items by introducing arrays of menu items nested into the `items` array.

<!--SANDBOX
import type {DropdownMenuItemMixed} from '@gravity-ui/uikit';
import {DropdownMenu} from '@gravity-ui/uikit';

const items: DropdownMenuItemMixed[] = [
    [
        {
            action: () => console.log('Call'),
            text: 'Call',
        },
        {
            action: () => console.log('Send email'),
            text: 'Send email',
        },
    ],
    {
        action: () => console.log('Rename'),
        text: 'Rename',
    },
    {
        action: () => console.log('Delete'),
        text: 'Delete',
        theme: 'danger',
    },
];

export default function () {
    return <DropdownMenu items={items} />;
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```jsx
<DropdownMenu
  items={[
    [
      {
        action: () => console.log('Call'),
        text: 'Call',
      },
      {
        action: () => console.log('Send email'),
        text: 'Send email',
      },
    ],
    {
      action: () => console.log('Rename'),
      text: 'Rename',
    },
    {
      action: () => console.log('Delete'),
      text: 'Delete',
      theme: 'danger',
    },
  ]}
/>
```

<!--/GITHUB_BLOCK-->

## Submenus

The `items` property on an individual menu item adds nested sub-items to such item.

Menu items with submenus get the following additional class names to allow for extra styling:

- `.g-dropdown-menu__menu-item_with-submenu`: For items with more than one nested item.
- `.g-dropdown-menu__menu-item_active-parent`: For the item whose submenu is currently open.

<!--SANDBOX
import type {DropdownMenuItem} from '@gravity-ui/uikit';
import {DropdownMenu} from '@gravity-ui/uikit';

const items: DropdownMenuItem[] = [
    {
        action: () => console.log('Rename'),
        text: 'Rename',
    },
    {
        action: () => console.log('Delete'),
        text: 'Delete',
        theme: 'danger',
    },
    {
        text: 'More',
        items: [
            {
                action: () => console.log('Mark as'),
                text: 'Mark as',
                items: [
                    {
                        action: () => console.log('Important'),
                        text: 'Important',
                    },
                    {
                        action: () => console.log('Favorite'),
                        text: 'Favorite',
                    },
                ],
            },
            {
                action: () => console.log('Copy'),
                text: 'Copy',
            },
            {
                text: 'Move to',
                items: [
                    {
                        action: () => console.log('Location #1'),
                        text: 'Location #1',
                    },
                    {
                        action: () => console.log('Location #2'),
                        text: 'Location #2',
                    },
                ],
            },
        ],
    },
];

export default function () {
    return <DropdownMenu items={items} />;
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```jsx
<DropdownMenu
  items={[
    {
      action: () => console.log('Rename'),
      text: 'Rename',
    },
    {
      action: () => console.log('Delete'),
      text: 'Delete',
      theme: 'danger',
    },
    {
      text: 'More',
      items: [
        {
          action: () => console.log('Mark as'),
          text: 'Mark as',
          items: [
            {
              action: () => console.log('Important'),
              text: 'Important',
            },
            {
              action: () => console.log('Favorite'),
              text: 'Favorite',
            },
          ],
        },
        {
          action: () => console.log('Copy'),
          text: 'Copy',
        },
        {
          text: 'Move to',
          items: [
            {
              action: () => console.log('Location #1'),
              text: 'Location #1',
            },
            {
              action: () => console.log('Location #2'),
              text: 'Location #2',
            },
          ],
        },
      ],
    },
  ]}
/>
```

<!--/GITHUB_BLOCK-->

## Custom menu toggle

To configure the menu toggle, use the `renderSwitcher` property. It can be any function that returns a React component (or any `(props: SwitcherProps) => React.ReactNode` in the TypeScript terms, see [`SwitcherProps`](#switcherprops) below). By default, the menu toggle is a button with the ellipsis icon (**⋯**).

<!--SANDBOX
import type {DropdownMenuItem} from '@gravity-ui/uikit';
import {DropdownMenu} from '@gravity-ui/uikit';

const items: DropdownMenuItem[] = [
    {
        action: () => console.log('Rename'),
        text: 'Rename',
    },
    {
        action: () => console.log('Delete'),
        text: 'Delete',
        theme: 'danger',
    },
];

export default function () {
    return (
        <DropdownMenu
            renderSwitcher={(props) => (
                <div {...props} style={{cursor: 'pointer', borderBottom: '1px dotted'}}>
                    John Doe
                </div>
            )}
            items={items}
        />
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```jsx
<DropdownMenu
  renderSwitcher={(props) => (
    <div {...props} style={{cursor: 'pointer', borderBottom: '1px dotted'}}>
      John Doe
    </div>
  )}
  items={[
    {
      action: () => console.log('Rename'),
      text: 'Rename',
    },
    {
      action: () => console.log('Delete'),
      text: 'Delete',
      theme: 'danger',
    },
  ]}
/>
```

<!--/GITHUB_BLOCK-->

The example above is oversimplified to demonstrate the idea of the customizable menu toggle. In a real-life application, it is generally recommended that the clickable menu toggle should be a component accessible with a keyboard and other assistive technologies such as a button.

## Custom icons

You can add custom icons to a `DropdownMenu` item using the `iconStart` or `iconEnd` property. By default, the `DropdownMenu` items go without icons.

You can change the menu toggle icon with the `DropdownMenu`'s `renderSwitcher` properties. By default, the menu toggle is a button with the ellipsis icon (**⋯**).

<!--SANDBOX
import {Bars, Pencil, TrashBin} from '@gravity-ui/icons';
import type {DropdownMenuItem} from '@gravity-ui/uikit';
import {Button, DropdownMenu, Icon} from '@gravity-ui/uikit';

const items: DropdownMenuItem[] = [
    {
        iconStart: <Icon size={16} data={Pencil} />,
        action: () => console.log('Rename'),
        text: 'Rename',
    },
    {
        iconStart: <Icon size={16} data={TrashBin} />,
        action: () => console.log('Delete'),
        text: 'Delete',
        theme: 'danger',
    },
];

export default function () {
    return (
        <DropdownMenu
            renderSwitcher={(props) => (
                <Button {...props} view="flat">
                    <Icon size={16} data={Bars} />
                </Button>
            )}
            items={items}
        />
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```jsx
<DropdownMenu
  renderSwitcher={(props) => (
    <Button {...props} view="flat">
      <Icon size={16} data={Bars} />
    </Button>
  )}
  items={[
    {
      iconStart: <Icon size={16} data={Pencil} />,
      action: () => console.log('Rename'),
      text: 'Rename',
    },
    {
      iconStart: <Icon size={16} data={TrashBin} />,
      action: () => console.log('Delete'),
      text: 'Delete',
      theme: 'danger',
    },
  ]}
/>
```

<!--/GITHUB_BLOCK-->

## Properties

| Name                       | Description                                                                                        |                        Type                        |    Default    |
| :------------------------- | :------------------------------------------------------------------------------------------------- | :------------------------------------------------: | :-----------: |
| `items`                    | Array of items. Nested arrays of items represent visually separated groups.                        | `(DropdownMenuItem \| DropdownMenuItem[])[] \| []` |               |
| `data`                     | A payload provided to the actions called from the menu. (This can be useful for context menus.)    |                       `any`                        |               |
| `icon`                     | Icon of the default `switcher`.                                                                    |                 `React.ReactNode`                  | Ellipsis icon |
| `size`                     | Applied both to the default `switcher` and the menu.                                               |            `'s' \| 'm' \| 'l' \| 'xl'`             |     `'m'`     |
| `disabled`                 | Setting this property to `true` disables the `switcher` button and prevents the menu from opening. |                     `boolean`                      |               |
| `renderSwitcher`           | Render function for the menu toggle control.                                                       |                 `React.ReactNode`                  |               |
| `switcherWrapperClassName` | Value for the `className` property of the `switcher`'s parent component.                           |                      `string`                      |               |
| `defaultSwitcherProps`     | Default `switcher` properties.                                                                     |                   `ButtonProps`                    |               |
| `defaultSwitcherClassName` | Value for the `className` property of the default `switcher`.                                      |                      `string`                      |               |
| `menuProps`                | Overrides the default dropdown menu popup properties.                                              |                    `MenuProps`                     |               |
| `popupProps`               | Overrides the default popup properties.                                                            |                    `PopupProps`                    |               |
| `open`                     | Toggles dropdown menu visibility.                                                                  |                     `boolean`                      |               |
| `onOpenToggle`             | Called when the menu is opened or closed.                                                          |                    `() => void`                    |               |
| `onSwitcherClick`          | Called when `switcher` is clicked.                                                                 |       `React.MouseEventHandler<HTMLElement>`       |               |
| `hideOnScroll`             | Specifies whether to hide the menu when a parent element is scrolled.                              |                     `boolean`                      |    `true`     |
| `children`                 | Custom content inside the menu popup.                                                              |                 `React.ReactNode`                  |               |

### DropdownMenuItem

This type describes individual dropdown menu items.

| Name         | Description                                                                                                                     |                      Type                      | Default |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------: | :-----: |
| `text`       | Menu item content.                                                                                                              |               `React.ReactNode`                |         |
| `action`     | Menu item click handler. It gets the parameters from the parent dropdown menu component (both `event` and `data`).              | `(event: React.MouseEvent, data: any) => void` |         |
| `iconStart`  | Menu item icon before the item content.                                                                                         |               `React.ReactNode`                |         |
| `iconEnd`    | Menu item icon after the item content. Ignored if the item has a submenu.                                                       |               `React.ReactNode`                |         |
| `hidden`     | Determines whether the item is hidden.                                                                                          |                   `boolean`                    |         |
| `disabled`   | Determines whether the item is disabled.                                                                                        |                   `boolean`                    |         |
| `href`       | Menu item with this property becomes a link to the specified location.                                                          |                    `string`                    |         |
| `target`     | Same as the `target` attribute of the `<a>` tag.                                                                                |                    `string`                    |         |
| `rel`        | Same as the `rel` attribute of the `<a>` tag.                                                                                   |                    `string`                    |         |
| `extraProps` | Additional menu item properties.                                                                                                |                    `object`                    |         |
| `title`      | Tooltip text.                                                                                                                   |                    `string`                    |         |
| `className`  | `class` HTML attribute value.                                                                                                   |                    `string`                    |         |
| `items`      | Submenu items.                                                                                                                  |  `(DropdownMenuItem \| DropdownMenuItem[])[]`  |         |
| `popupProps` | Submenu popup properties.                                                                                                       |                    `string`                    |         |
| `path`       | Path of the indexes from the root to the current item.                                                                          |                   `number[]`                   |         |
| `closeMenu`  | Custom `closeMenu` callback. It can be called instead of closing the main menu and used to close submenus before the main menu. |                  `() => void`                  |         |

### SwitcherProps

| Name        | Description                                                    |     Type     |
| :---------- | :------------------------------------------------------------- | :----------: |
| `onClick`   | Called when the switcher is clicked.                           | `() => void` |
| `onKeyDown` | Called when the switcher is focused and action key is pressed. | `() => void` |
