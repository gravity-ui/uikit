<!--GITHUB_BLOCK-->

# DropdownMenu

<!--/GITHUB_BLOCK-->

```tsx
import {DropdownMenu} from '@gravity-ui/uikit';
```

This is a dropdown menu component with item grouping, submenus, and a customizable toggle. The dropdown menu items are configured with the `items` prop. By default, the menu toggle is a button with the ellipsis icon (**⋯**), which can be overridden with the `switcher` prop.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
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
`}
>
    <UIKit.DropdownMenu
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
</ExampleBlock>

LANDING_BLOCK-->

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

<!--LANDING_BLOCK

<ExampleBlock
    code={`
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
`}
>
    <UIKit.DropdownMenu
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
</ExampleBlock>

LANDING_BLOCK-->

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

The `items` property on an individual menu item adds nested subitems to this menu item.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
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
`}
>
    <UIKit.DropdownMenu
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
</ExampleBlock>

LANDING_BLOCK-->

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

The menu toggle is configured with the `switcher` prop. It can be any React component (or any `React.ReactNode` in the TypeScript terms). By default, the menu toggle is a button with the ellipsis icon (**⋯**).

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<DropdownMenu
    switcher={
        <div style={{cursor: 'pointer', borderBottom: '1px dotted'}}>
            John Doe
        </div>
    }
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
`}
>
    <UIKit.DropdownMenu
        switcher={
            <div style={{cursor: 'pointer', borderBottom: '1px dotted'}}>
                John Doe
            </div>
        }
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
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```jsx
<DropdownMenu
  switcher={<div style={{cursor: 'pointer', borderBottom: '1px dotted'}}>John Doe</div>}
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

The example above is oversimplified to demonstrate the idea of the customizable menu toggle. In a real-life application, it is generally recommended that the clickable menu toggle should be a component accessible with a keyboard and other assistive technologies (such as a button).

## Custom icons

A custom icons can be added to a `DropdownMenu` item by assigning the `iconStart` or `iconEnd` property. By default, `DropdownMenu` items go without icons.

The menu toggle icon can be changed with the `DropdownMenu`'s `switcher` prop. By default, the menu toggle is a button with the ellipsis icon (**⋯**).

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<DropdownMenu
    switcher={
        <Button view="flat">
            <Icon size={16} data={Bars} />
        </Button>
    }
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
`}
>
    <UIKit.DropdownMenu
        switcher={
            <UIKit.Button view="flat">
                <UIKit.Icon
                    data={() => (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M1.25 3.25A.75.75 0 0 1 2 2.5h12A.75.75 0 0 1 14 4H2a.75.75 0 0 1-.75-.75Zm0 4.75A.75.75 0 0 1 2 7.25h12a.75.75 0 0 1 0 1.5H2A.75.75 0 0 1 1.25 8ZM2 12a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5H2Z" clip-rule="evenodd"></path></svg>
                    )}
                    size={16}
                />
            </UIKit.Button>
        }
        items={[
            {
                iconStart: (
                    <UIKit.Icon
                        data={() => (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M11.423 1A3.577 3.577 0 0 1 15 4.577c0 .27-.108.53-.3.722l-.528.529-1.971 1.971-5.059 5.059a3 3 0 0 1-1.533.82l-2.638.528a1 1 0 0 1-1.177-1.177l.528-2.638a3 3 0 0 1 .82-1.533l5.059-5.059 2.5-2.5c.191-.191.451-.299.722-.299Zm-2.31 4.009-4.91 4.91a1.5 1.5 0 0 0-.41.766l-.38 1.903 1.902-.38a1.5 1.5 0 0 0 .767-.41l4.91-4.91a2.077 2.077 0 0 0-1.88-1.88Zm3.098.658a3.59 3.59 0 0 0-1.878-1.879l1.28-1.28c.995.09 1.788.884 1.878 1.88l-1.28 1.28Z" clip-rule="evenodd"></path></svg>
                        )}
                        size={16}
                    />
                ),
                action: () => console.log('Rename'),
                text: 'Rename',
            },
            {
                iconStart: (
                    <UIKit.Icon
                        data={() => (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M9 2H7a.5.5 0 0 0-.5.5V3h3v-.5A.5.5 0 0 0 9 2Zm2 1v-.5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2V3H2.251a.75.75 0 0 0 0 1.5h.312l.317 7.625A3 3 0 0 0 5.878 15h4.245a3 3 0 0 0 2.997-2.875l.318-7.625h.312a.75.75 0 0 0 0-1.5H11Zm.936 1.5H4.064l.315 7.562A1.5 1.5 0 0 0 5.878 13.5h4.245a1.5 1.5 0 0 0 1.498-1.438l.315-7.562Zm-6.186 2v5a.75.75 0 0 0 1.5 0v-5a.75.75 0 0 0-1.5 0Zm3.75-.75a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0v-5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd"></path></svg>
                        )}
                        size={16}
                    />
                ),
                action: () => console.log('Delete'),
                text: 'Delete',
                theme: 'danger',
            },
        ]}
    />
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```jsx
<DropdownMenu
  switcher={
    <Button view="flat">
      <Icon size={16} data={Bars} />
    </Button>
  }
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

| Name                       | Description                                                                                    |                        Type                        |    Default    |
| :------------------------- | :--------------------------------------------------------------------------------------------- | :------------------------------------------------: | :-----------: |
| `items`                    | Array of items. Nested arrays of items represent visually separated groups.                    | `(DropdownMenuItem \| DropdownMenuItem[])[] \| []` |               |
| `data`                     | A payload passed to the actions called from the menu. (Can be useful for context menus.)       |                       `any`                        |               |
| `icon`                     | Icon of the default `switcher`.                                                                |                 `React.ReactNode`                  | Ellipsis icon |
| `size`                     | Applied both to the default `switcher` and the menu.                                           |            `'s' \| 'm' \| 'l' \| 'xl'`             |     `'m'`     |
| `disabled`                 | Setting this prop to `true` disables the `switcher` button and prevents the menu from opening. |                     `boolean`                      |               |
| `switcher`                 | Menu toggle control.                                                                           |                 `React.ReactNode`                  |               |
| `switcherWrapperClassName` | Value for the `className` prop of the `switcher`'s parent component.                           |                      `string`                      |               |
| `defaultSwitcherProps`     | Default `switcher` props.                                                                      |                   `ButtonProps`                    |               |
| `defaultSwitcherClassName` | Value for the `className` prop of the default `switcher`.                                      |                      `string`                      |               |
| `menuProps`                | Overrides the default dropdown menu popup props.                                               |                    `MenuProps`                     |               |
| `popupProps`               | Overrides the default popup props.                                                             |                    `PopupProps`                    |               |
| `open`                     | Controls dropdown menu visibility.                                                             |                     `boolean`                      |               |
| `onOpenToggle`             | Called when the menu is opened or closed.                                                      |                    `() => void`                    |               |
| `onSwitcherClick`          | Called when `switcher` is clicked.                                                             |       `React.MouseEventHandler<HTMLElement>`       |               |
| `hideOnScroll`             | Specifies whether to hide the menu when a parent element is scrolled.                          |                     `boolean`                      |    `true`     |
| `children`                 | Custom content inside the menu popup.                                                          |                 `React.ReactNode`                  |               |

### DropdownMenuItem

This type describes individual dropdown menu items.

| Name         | Description                                                                                                                     |                      Type                      | Default |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------: | :-----: |
| `text`       | Menu item content.                                                                                                              |               `React.ReactNode`                |         |
| `action`     | Menu item click handler. Recieves the parameters from the parent dropdown menu component (both `event` and `data`).             | `(event: React.MouseEvent, data: any) => void` |         |
| `iconStart`  | Menu item icon before item text.                                                                                                |               `React.ReactNode`                |         |
| `iconEnd`    | Menu item icon after item text. Ignored, when item has sub-menu.                                                                |               `React.ReactNode`                |         |
| `hidden`     | Determines whether the item is hidden.                                                                                          |                   `boolean`                    |         |
| `disabled`   | Determines whether the item is disabled.                                                                                        |                   `boolean`                    |         |
| `href`       | Menu item with this prop becomes a link to the specified location.                                                              |                    `string`                    |         |
| `target`     | Same as the `target` attribute of the `<a>` tag.                                                                                |                    `string`                    |         |
| `rel`        | Same as the `rel` attribute of the `<a>` tag.                                                                                   |                    `string`                    |         |
| `extraProps` | Additional menu item props.                                                                                                     |                    `object`                    |         |
| `title`      | Tooltip text.                                                                                                                   |                    `string`                    |         |
| `className`  | HTML `class` attribute value.                                                                                                   |                    `string`                    |         |
| `items`      | Submenu items.                                                                                                                  |  `(DropdownMenuItem \| DropdownMenuItem[])[]`  |         |
| `popupProps` | Submenu popup props.                                                                                                            |                    `string`                    |         |
| `path`       | Path of indexes from the root to the current item.                                                                              |                   `number[]`                   |         |
| `closeMenu`  | Custom `closeMenu` callback. It can be called instead of closing the main menu and used to close submenus before the main menu. |                  `() => void`                  |         |
