<!--GITHUB_BLOCK-->

# Menu

<!--/GITHUB_BLOCK-->

```tsx
import {Menu} from '@gravity-ui/uikit';
```

The `Menu` component enables easily creating views for action lists.

It has dedicated components for items (`Menu.Item`) and groups (`Menu.Group`). You can combine them to create more complex menus.

<!--SANDBOX
import {Menu} from '@gravity-ui/uikit';

export default function () {
    return (
        <Menu>
            <Menu.Item>First</Menu.Item>
            <Menu.Item>Second</Menu.Item>
            <Menu.Group label="Group">
                <Menu.Item>One</Menu.Item>
                <Menu.Item>Two</Menu.Item>
            </Menu.Group>
        </Menu>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Menu>
  <Menu.Item>First</Menu.Item>
  <Menu.Item>Second</Menu.Item>
  <Menu.Group label="Group">
    <Menu.Item>One</Menu.Item>
    <Menu.Item>Two</Menu.Item>
  </Menu.Group>
</Menu>
```

<!--/GITHUB_BLOCK-->

### Size

This property is used to select the menu size. The default value is `m`.

<!--SANDBOX
import {Menu} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Menu size="s">
                <Menu.Item>First</Menu.Item>
                <Menu.Item>Second</Menu.Item>
            </Menu>
            <Menu size="m">
                <Menu.Item>First</Menu.Item>
                <Menu.Item>Second</Menu.Item>
            </Menu>
            <Menu size="l">
                <Menu.Item>First</Menu.Item>
                <Menu.Item>Second</Menu.Item>
            </Menu>
            <Menu size="xl">
                <Menu.Item>First</Menu.Item>
                <Menu.Item>Second</Menu.Item>
            </Menu>
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Menu size="s">
    <Menu.Item>First</Menu.Item>
    <Menu.Item>Second</Menu.Item>
</Menu>

<Menu size="m">
    <Menu.Item>First</Menu.Item>
    <Menu.Item>Second</Menu.Item>
</Menu>

<Menu size="l">
    <Menu.Item>First</Menu.Item>
    <Menu.Item>Second</Menu.Item>
</Menu>

<Menu size="xl">
    <Menu.Item>First</Menu.Item>
    <Menu.Item>Second</Menu.Item>
</Menu>
```

<!--/GITHUB_BLOCK-->

## Properties

| Name      | Description                                |           Type           | Default |
| :-------- | :----------------------------------------- | :----------------------: | :-----: |
| size      | Menu size                                  | `"s"` `"m"` `"l"` `"xl"` |  `"m"`  |
| children  | Child element                              |    `React.ReactNode`     |         |
| className | `class` HTML attribute                     |         `string`         |         |
| style     | `style` HTML attribute                     |  `React.CSSProperties`   |         |
| qa        | `data-qa` HTML attribute, used for testing |         `string`         |         |

## Menu.Item

This property is used to render menu items.

### Icon

Use the `iconStart` or `iconEnd` property to display an icon at the start or end of a menu item:

<!--SANDBOX
import {Gear, TriangleExclamation} from '@gravity-ui/icons';
import {Icon, Menu} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Menu>
                <Menu.Item iconStart={<Icon size={16} data={Gear} />}>Item with icon</Menu.Item>
                <Menu.Item>Item without icon</Menu.Item>
            </Menu>
            <Menu>
                <Menu.Item iconEnd={<Icon size={16} data={TriangleExclamation} />}>
                    Item with icon
                </Menu.Item>
                <Menu.Item>Item without icon</Menu.Item>
            </Menu>
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Menu>
  <Menu.Item iconStart={<Icon size={16} data={GearIcon} />}>Item with icon</Menu.Item>
  <Menu.Item>Item without icon</Menu.Item>
</Menu>
```

```tsx
<Menu>
  <Menu.Item iconEnd={<Icon size={16} data={TriangleExclamation} />}>Item with icon</Menu.Item>
  <Menu.Item>Item without icon</Menu.Item>
</Menu>
```

<!--/GITHUB_BLOCK-->

### States

Using this property, you can enable or disable (gray out) specific menu items:

<!--SANDBOX
import {Menu} from '@gravity-ui/uikit';

export default function () {
    return (
        <Menu>
            <Menu.Item disabled>First</Menu.Item>
            <Menu.Item>Second</Menu.Item>
            <Menu.Item selected>Third</Menu.Item>
        </Menu>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Menu>
  <Menu.Item disabled>First</Menu.Item>
  <Menu.Item>Second</Menu.Item>
  <Menu.Item selected>Third</Menu.Item>
</Menu>
```

<!--/GITHUB_BLOCK-->

### Theme

This allows you to change the menu item theme. The default theme is `normal`.

<!--SANDBOX
import {Menu} from '@gravity-ui/uikit';

export default function () {
    return (
        <Menu>
            <Menu.Item theme="danger">First</Menu.Item>
            <Menu.Item theme="normal">Second</Menu.Item>
            <Menu.Item>Third</Menu.Item>
        </Menu>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Menu>
  <Menu.Item theme="danger">First</Menu.Item>
  <Menu.Item theme="normal">Second</Menu.Item>
  <Menu.Item>Third</Menu.Item>
</Menu>
```

<!--/GITHUB_BLOCK-->

### Properties

| Name             | Description                                    |           Type            |  Default   |
| :--------------- | :--------------------------------------------- | :-----------------------: | :--------: |
| iconStart        | Menu icon before item text                     |        `ReactNode`        |            |
| iconEnd          | Menu icon after item text                      |        `ReactNode`        |            |
| selected         | Menu item selected flag                        |         `boolean`         |  `false`   |
| disabled         | Menu item disabled flag                        |         `boolean`         |  `false`   |
| active           | Menu item active flag                          |         `boolean`         |  `false`   |
| href             | URL                                            |         `string`          |            |
| title            | Title attribute                                |         `string`          |            |
| target           | Target attribute                               |         `string`          |            |
| rel              | Rel attribute                                  |         `string`          |            |
| onClick          | Handler for onclick event                      | `React.MouseEventHandler` |            |
| theme            | Menu item theme                                |   `"normal"` `"danger"`   | `"normal"` |
| children         | Child element                                  |     `React.ReactNode`     |            |
| className        | `class` HTML attribute for the root element    |         `string`          |            |
| contentClassName | `class` HTML attribute for the content element |         `string`          |            |
| style            | `style` HTML attribute                         |   `React.CSSProperties`   |            |
| qa               | `data-qa` HTML attribute, used for testing     |         `string`          |            |
| extraProps       | Additional HTML attributes                     |         `Record`          |            |

## Menu.Group

You can group items by topics within a single menu:

<!--SANDBOX
import {Menu} from '@gravity-ui/uikit';

export default function () {
    return (
        <Menu>
            <Menu.Item>First</Menu.Item>
            <Menu.Group label="Group One">
                <Menu.Item>One</Menu.Item>
                <Menu.Item>Two</Menu.Item>
            </Menu.Group>
            <Menu.Group label="Group Two">
                <Menu.Item>One</Menu.Item>
                <Menu.Item>Two</Menu.Item>
            </Menu.Group>
            <Menu.Item>Middle</Menu.Item>
            <Menu.Group label="Group Three">
                <Menu.Item>One</Menu.Item>
                <Menu.Item>Two</Menu.Item>
            </Menu.Group>
            <Menu.Item>Last</Menu.Item>
        </Menu>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Menu>
  <Menu.Item>First</Menu.Item>
  <Menu.Group label="Group One">
    <Menu.Item>One</Menu.Item>
    <Menu.Item>Two</Menu.Item>
  </Menu.Group>
  <Menu.Group label="Group Two">
    <Menu.Item>One</Menu.Item>
    <Menu.Item>Two</Menu.Item>
  </Menu.Group>
  <Menu.Item>Middle</Menu.Item>
  <Menu.Group label="Group Three">
    <Menu.Item>One</Menu.Item>
    <Menu.Item>Two</Menu.Item>
  </Menu.Group>
  <Menu.Item>Last</Menu.Item>
</Menu>
```

<!--/GITHUB_BLOCK-->

### Properties

| Name      | Description                                |         Type          | Default |
| :-------- | :----------------------------------------- | :-------------------: | :-----: |
| label     | Menu group label                           |       `string`        |         |
| children  | Child element                              |   `React.ReactNode`   |         |
| className | `class` HTML attribute                     |       `string`        |         |
| style     | `style` HTML attribute                     | `React.CSSProperties` |         |
| qa        | `data-qa` HTML attribute, used for testing |       `string`        |         |
