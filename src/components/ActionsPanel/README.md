<!--GITHUB_BLOCK-->

# ActionsPanel

<!--/GITHUB_BLOCK-->

Use an `ActionsPanel` to render multiple buttons in a row.
When there is not enough space, buttons that don't fit will be added to an overflow menu.
The overflow uses `Menu`; `dropdown.item` accepts `MenuItemProps`.

## Example

<!--SANDBOX
import type {ActionsPanelProps} from '@gravity-ui/uikit';
import {ActionsPanel} from '@gravity-ui/uikit';

const actions: ActionsPanelProps['actions'] = [
    {
        id: 'action_1',
        button: {
            props: {
                children: 'Action 1',
                onClick: () => console.log('click button action 1'),
            },
        },
        dropdown: {
            item: {
                onClick: () => console.log('click dropdown action 1'),
                children: 'Action 1',
            },
        },
    },
    {
        id: 'action_2',
        button: {
            props: {
                children: 'Action 2',
                onClick: () => console.log('click button action 2'),
            },
        },
        dropdown: {
            item: {
                onClick: () => console.log('click dropdown action 2'),
                children: 'Action 2',
            },
        },
    },
];

export default function () {
    return <ActionsPanel actions={actions} />;
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```jsx
const actions: ActionsPanelProps['actions'] = [
    {
        id: 'action_1',
        button: {
            props: {
                children: 'Action 1',
                onClick: () => console.log('click button action 1'),
            },
        },
        dropdown: {
            item: {
                onClick: () => console.log('click dropdown action 1'),
                children: 'Action 1',
            },
        },
    },
    {
        id: 'action_2',
        button: {
            props: {
                children: 'Action 2',
                onClick: () => console.log('click button action 2'),
            },
        },
        dropdown: {
            item: {
                onClick: () => console.log('click dropdown action 2'),
                children: 'Action 2',
            },
        },
    },
];

<ActionsPanel {...args} actions={actions} />
```

<!-- Storybook example -->

<ActionsPanelExample />

<!--/GITHUB_BLOCK-->

## Action icons

Use `Button` or `dropdown.item` properties to set icons.

<!--SANDBOX
import {Files, PencilToSquare, TrashBin} from '@gravity-ui/icons';
import type {ActionsPanelProps} from '@gravity-ui/uikit';
import {ActionsPanel, Flex, Icon} from '@gravity-ui/uikit';

const actions: ActionsPanelProps['actions'] = [
    {
        id: 'edit',
        button: {
            props: {
                children: [<Icon key="icon" data={PencilToSquare} />, 'Edit'],
                onClick: () => console.log('Edit'),
            },
        },
        dropdown: {
            item: {
                onClick: () => console.log('Edit'),
                children: (
                    <Flex alignItems="center" gap={1}>
                        <Icon data={PencilToSquare} />
                        Edit
                    </Flex>
                ),
            },
        },
    },
    {
        id: 'copy',
        button: {
            props: {
                children: [<Icon key="icon" data={Files} />, 'Copy'],
                onClick: () => console.log('Copy'),
            },
        },
        dropdown: {
            item: {
                onClick: () => console.log('Copy'),
                children: (
                    <Flex alignItems="center" gap={1}>
                        <Icon data={Files} />
                        Copy
                    </Flex>
                ),
            },
        },
    },
    {
        id: 'delete',
        collapsed: true,
        button: {
            props: {
                children: [<Icon key="icon" data={TrashBin} />, 'Delete'],
                onClick: () => console.log('Delete'),
            },
        },
        dropdown: {
            item: {
                onClick: () => console.log('Delete'),
                children: (
                    <Flex alignItems="center" gap={1}>
                        <Icon data={TrashBin} />
                        Delete
                    </Flex>
                ),
            },
        },
    },
];

export default function () {
    return <ActionsPanel actions={actions} />;
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```jsx
const actions: ActionsPanelProps['actions'] = [
    {
        id: 'edit',
        button: {
            props: {
                children: [<Icon key="icon" data={PencilToSquare} />, 'Edit'],
                onClick: () => console.log('Edit'),
            },
        },
        dropdown: {
            item: {
                onClick: () => console.log('Edit'),
                children: (
                    <Flex alignItems="center" gap={1}>
                        <Icon data={PencilToSquare} />
                        Edit
                    </Flex>
                ),
            },
        },
    },
    {
        id: 'copy',
        button: {
            props: {
                children: [<Icon key="icon" data={Files} />, 'Copy'],
                onClick: () => console.log('Copy'),
            },
        },
        dropdown: {
            item: {
                onClick: () => console.log('Copy'),
                children: (
                    <Flex alignItems="center" gap={1}>
                        <Icon data={Files} />
                        Copy
                    </Flex>
                ),
            },
        },
    },
    {
        id: 'delete',
        collapsed: true,
        button: {
            props: {
                children: [<Icon key="icon" data={TrashBin} />, 'Delete'],
                onClick: () => console.log('Delete'),
            },
        },
        dropdown: {
            item: {
                onClick: () => console.log('Delete'),
                children: (
                    <Flex alignItems="center" gap={1}>
                        <Icon data={TrashBin} />
                        Delete
                    </Flex>
                ),
            },
        },
    },
];

<ActionsPanel actions={actions} />
```

<!-- Storybook example -->

<ActionsPanelWithIcons />

<!--/GITHUB_BLOCK-->

## Note

Use the `renderNote` property to render a note.

<!--SANDBOX
import type {ActionsPanelProps} from '@gravity-ui/uikit';
import {ActionsPanel} from '@gravity-ui/uikit';

const actions: ActionsPanelProps['actions'] = [
    {
        id: 'action_1',
        button: {
            props: {
                children: 'Action 1',
                onClick: () => console.log('click button action 1'),
                view: 'normal-contrast',
            },
        },
        dropdown: {
            item: {
                onClick: () => console.log('click dropdown action 1'),
                children: 'Action 1',
            },
        },
    },
    {
        id: 'action_2',
        button: {
            props: {
                children: 'Action 2',
                onClick: () => console.log('click button action 2'),
            },
        },
        dropdown: {
            item: {
                onClick: () => console.log('click dropdown action 2'),
                children: 'Action 2',
            },
        },
    },
    {
        id: 'action_3',
        button: {
            props: {
                children: 'Action 3',
                onClick: () => console.log('click button action 3'),
            },
        },
        dropdown: {
            item: {
                onClick: () => console.log('click dropdown action 3'),
                children: 'Action 3',
            },
        },
    },
    {
        id: 'action_4',
        button: {
            props: {
                children: 'Action 4',
                onClick: () => console.log('click button action 4'),
            },
        },
        dropdown: {
            item: {
                onClick: () => console.log('click dropdown action 4'),
                children: 'Action 4',
            },
        },
    },
];

export default function () {
    return <ActionsPanel actions={actions} renderNote={() => '10 items'} maxRowActions={2} />;
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```jsx
const actions: ActionsPanelProps['actions'] = [
    {
        id: 'action_1',
        button: {
            props: {
                children: 'Action 1',
                onClick: () => console.log('click button action 1'),
                view: 'normal-contrast',
            },
        },
        dropdown: {
            item: {
                onClick: () => console.log('click dropdown action 1'),
                children: 'Action 1',
            },
        },
    },
    {
        id: 'action_2',
        button: {
            props: {
                children: 'Action 2',
                onClick: () => console.log('click button action 2'),
            },
        },
        dropdown: {
            item: {
                onClick: () => console.log('click dropdown action 2'),
                children: 'Action 2',
            },
        },
    },
    {
        id: 'action_3',
        button: {
            props: {
                children: 'Action 3',
                onClick: () => console.log('click button action 3'),
            },
        },
        dropdown: {
            item: {
                onClick: () => console.log('click dropdown action 3'),
                children: 'Action 3',
            },
        },
    },
    {
        id: 'action_4',
        button: {
            props: {
                children: 'Action 4',
                onClick: () => console.log('click button action 4'),
            },
        },
        dropdown: {
            item: {
                onClick: () => console.log('click dropdown action 4'),
                children: 'Action 4',
            },
        },
    },
];

<ActionsPanel
  actions={actions}
  onClose={() => console.log('click close handle')}
  renderNote={() => '10 items'}
  maxRowActions={2}
/>
```

<!-- Storybook example -->

<ActionsPanelWithNote />

<!--/GITHUB_BLOCK-->

## Groups in dropdown menu

Use `action.dropdown.group` for groping actions in dropdown menu.

<!--SANDBOX
import type {ActionsPanelProps} from '@gravity-ui/uikit';
import {ActionsPanel} from '@gravity-ui/uikit';

const actions: ActionsPanelProps['actions'] = [
    {
        id: 'action_1',
        collapsed: true,
        button: {
            props: {
                children: 'Action 1',
                onClick: () => console.log('click button action 1'),
            },
        },
        dropdown: {
            item: {
                onClick: () => console.log('click dropdown action 1'),
                children: 'Action 1',
            },
            group: '1',
        },
    },
    {
        id: 'action_2',
        collapsed: true,
        button: {
            props: {
                children: 'Action 2',
                onClick: () => console.log('click button action 2'),
            },
        },
        dropdown: {
            item: {
                onClick: () => console.log('click dropdown action 2'),
                children: 'Action 2',
            },
            group: '2',
        },
    },
    {
        id: 'action_3',
        collapsed: true,
        button: {
            props: {
                children: 'Action 3',
                onClick: () => console.log('click button action 3'),
            },
        },
        dropdown: {
            item: {
                onClick: () => console.log('click dropdown action 3'),
                children: 'Action 3',
            },
            group: '1',
        },
    },
];

export default function () {
    return <ActionsPanel actions={actions} />;
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```jsx
const actions: ActionsPanelProps['actions'] = [
    {
        id: 'action_1',
        collapsed: true,
        button: {
            props: {
                children: 'Action 1',
                onClick: () => console.log('click button action 1'),
            },
        },
        dropdown: {
            item: {
                onClick: () => console.log('click dropdown action 1'),
                children: 'Action 1',
            },
            group: '1',
        },
    },
    {
        id: 'action_2',
        collapsed: true,
        button: {
            props: {
                children: 'Action 2',
                onClick: () => console.log('click button action 2'),
            },
        },
        dropdown: {
            item: {
                onClick: () => console.log('click dropdown action 2'),
                children: 'Action 2',
            },
            group: '2',
        },
    },
    {
        id: 'action_3',
        collapsed: true,
        button: {
            props: {
                children: 'Action 3',
                onClick: () => console.log('click button action 3'),
            },
        },
        dropdown: {
            item: {
                onClick: () => console.log('click dropdown action 3'),
                children: 'Action 3',
            },
            group: '1',
        },
    },
];

<ActionsPanel actions={actions} />
```

<!-- Storybook example -->

<ActionsPanelGroups />

<!--/GITHUB_BLOCK-->

## Action sub-menu and nested dropdown menu

Pass a `Menu` as a direct child of `dropdown.item.children` to add a submenu. A visible action button uses the same submenu.

<!--SANDBOX
import {ActionsPanel, Menu, MenuItem} from '@gravity-ui/uikit';
import type {ActionsPanelProps} from '@gravity-ui/uikit';

const actions: ActionsPanelProps['actions'] = [
    {
        id: 'button-with-sub-menu',
        button: {props: {children: 'Sub-menu'}},
        dropdown: {
            item: {
                children: [
                    'Sub-menu',
                    <Menu key="submenu" size="s">
                        <MenuItem onClick={() => console.log('Edit')}>Edit</MenuItem>
                        <MenuItem onClick={() => console.log('Delete')} theme="danger">
                            Delete
                        </MenuItem>
                    </Menu>,
                ],
            },
        },
    },
    {
        id: 'nested-menu',
        collapsed: true,
        button: {props: {children: 'Nested'}},
        dropdown: {
            item: {
                children: [
                    'Other',
                    <Menu key="submenu" size="s">
                        <MenuItem>
                            Select
                            <Menu size="s">
                                <MenuItem onClick={() => console.log('Select One')}>One</MenuItem>
                                <MenuItem onClick={() => console.log('Select All')}>All</MenuItem>
                            </Menu>
                        </MenuItem>
                        <MenuItem onClick={() => console.log('Copy')}>Copy</MenuItem>
                    </Menu>,
                ],
            },
        },
    },
];

export default function () {
    return <ActionsPanel actions={actions} />;
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```jsx
const actions: ActionsPanelProps['actions'] = [
    {
        id: 'button-with-sub-menu',
        button: {props: {children: 'Sub-menu'}},
        dropdown: {
            item: {
                children: [
                    'Sub-menu',
                    <Menu key="submenu" size="s">
                        <MenuItem onClick={() => console.log('Edit')}>Edit</MenuItem>
                        <MenuItem onClick={() => console.log('Delete')} theme="danger">
                            Delete
                        </MenuItem>
                    </Menu>,
                ],
            },
        },
    },
    {
        id: 'nested-menu',
        collapsed: true,
        button: {props: {children: 'Nested'}},
        dropdown: {
            item: {
                children: [
                    'Other',
                    <Menu key="submenu" size="s">
                        <MenuItem>
                            Select
                            <Menu size="s">
                                <MenuItem onClick={() => console.log('Select One')}>One</MenuItem>
                                <MenuItem onClick={() => console.log('Select All')}>All</MenuItem>
                            </Menu>
                        </MenuItem>
                        <MenuItem onClick={() => console.log('Copy')}>Copy</MenuItem>
                    </Menu>,
                ],
            },
        },
    },
];

<ActionsPanel actions={actions} />
```

<!-- Storybook example -->

<ActionsPanelSubmenu />

<!--/GITHUB_BLOCK-->

## Properties

| Name          | Description                                               |          Type           | Default |
| :------------ | :-------------------------------------------------------- | :---------------------: | :-----: |
| actions       | Array of actions                                          |  `ActionsPanelItem[]`   |         |
| onClose       | Optional close button click handler                       |      `() => void`       |         |
| renderNote    | Optional render-prop for displaying the content of a note | `() => React.ReactNode` |         |
| className     | Optional HTML `class` attribute                           |        `string`         |         |
| noteClassName | Optional HTML `class` attribute                           |        `string`         |         |
| maxRowActions | Maximum number of actions in a row                        |        `number`         |   `4`   |

## ActionsPanelItem:

| Name      | Description                                   |                  Type                   | Default |
| :-------- | :-------------------------------------------- | :-------------------------------------: | :-----: |
| id        | Unique action id                              |                `string`                 |         |
| dropdown  | Settings for dropdown action in overflow menu | `{item: MenuItemProps; group?: string}` |         |
| button    | Settings for button action                    |         `{props: ButtonProps}`          |         |
| collapsed | If true, then item always inside the dropdown |                `boolean`                |         |
