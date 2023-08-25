<!--GITHUB_BLOCK-->

# Menu

<!--/GITHUB_BLOCK-->

```tsx
import {Menu} from '@gravity-ui/uikit';
```

The `Menu` component makes it easy to create view for actions list.

The `Menu` has dedicated components for an item and a group: `Menu.Item`, `Menu.Group`. You can mix them together to create more complex menus.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Menu>
    <Menu.Item>First</Menu.Item>
    <Menu.Item>Second</Menu.Item>
</Menu>
`}
>
    <UIKit.Menu>
        <UIKit.Menu.Item>First</UIKit.Menu.Item>
        <UIKit.Menu.Item>Second</UIKit.Menu.Item>
            <UIKit.Menu.Group label="Group">
                <UIKit.Menu.Item>One</UIKit.Menu.Item>
                <UIKit.Menu.Item>Two</UIKit.Menu.Item>
            </UIKit.Menu.Group>
    </UIKit.Menu>
</ExampleBlock>
LANDING_BLOCK-->

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

Used to select the menu size, default - `m`

<!--LANDING_BLOCK
<ExampleBlock
    code={`
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
`}
>
    <UIKit.Menu size="s">
        <UIKit.Menu.Item>First</UIKit.Menu.Item>
        <UIKit.Menu.Item>Second</UIKit.Menu.Item>
    </UIKit.Menu>
    <UIKit.Menu size="m">
        <UIKit.Menu.Item>First</UIKit.Menu.Item>
        <UIKit.Menu.Item>Second</UIKit.Menu.Item>
    </UIKit.Menu>
    <UIKit.Menu size="l">
        <UIKit.Menu.Item>First</UIKit.Menu.Item>
        <UIKit.Menu.Item>Second</UIKit.Menu.Item>
    </UIKit.Menu>
    <UIKit.Menu size="xl">
        <UIKit.Menu.Item>First</UIKit.Menu.Item>
        <UIKit.Menu.Item>Second</UIKit.Menu.Item>
    </UIKit.Menu>
</ExampleBlock>
LANDING_BLOCK-->

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

| Name      | Description                             |           Type           | Default |
| :-------- | :-------------------------------------- | :----------------------: | :-----: |
| size      | Menu size                               | `"s"` `"m"` `"l"` `"xl"` |  `"m"`  |
| children  | Child element                           |    `React.ReactNode`     |         |
| className | HTML `class` attribute                  |         `string`         |         |
| style     | HTML `style` attribute                  |     `CSSProperties`      |         |
| qa        | HTML `data-qa` attribute, used in tests |         `string`         |         |

## Menu.Item

Used for render menu item

### Icon

Used if you need to display an icon for a menu item

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Menu>
    <Menu.Item icon={<Icon size={16} data={GearIcon} />}>Item with icon</Menu.Item>
    <Menu.Item>Item without icon</Menu.Item>
</Menu>
`}
>
    <UIKit.Menu>
        <UIKit.Menu.Item icon={
            <UIKit.Icon data={() => (
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" class="yc-icon" fill="currentColor" stroke="none" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M7.199 2H8.8a.2.2 0 0 1 .2.2c0 1.808 1.958 2.939 3.524 2.034a.199.199 0 0 1 .271.073l.802 1.388a.199.199 0 0 1-.073.272c-1.566.904-1.566 3.164 0 4.069a.199.199 0 0 1 .073.271l-.802 1.388a.199.199 0 0 1-.271.073C10.958 10.863 9 11.993 9 13.8a.2.2 0 0 1-.199.2H7.2a.199.199 0 0 1-.2-.2c0-1.808-1.958-2.938-3.524-2.034a.199.199 0 0 1-.272-.073l-.8-1.388a.199.199 0 0 1 .072-.271c1.566-.905 1.566-3.165 0-4.07a.199.199 0 0 1-.073-.271l.801-1.388a.199.199 0 0 1 .272-.073C5.042 5.138 7 4.007 7 2.2c0-.11.089-.199.199-.199ZM5.5 2.2c0-.94.76-1.7 1.699-1.7H8.8c.94 0 1.7.76 1.7 1.7a.85.85 0 0 0 1.274.735 1.699 1.699 0 0 1 2.32.622l.802 1.388c.469.813.19 1.851-.622 2.32a.85.85 0 0 0 0 1.472 1.7 1.7 0 0 1 .622 2.32l-.802 1.388a1.699 1.699 0 0 1-2.32.622.85.85 0 0 0-1.274.735c0 .939-.76 1.7-1.699 1.7H7.2a1.7 1.7 0 0 1-1.699-1.7.85.85 0 0 0-1.274-.735 1.698 1.698 0 0 1-2.32-.622l-.802-1.388a1.699 1.699 0 0 1 .622-2.32.85.85 0 0 0 0-1.471 1.699 1.699 0 0 1-.622-2.321l.801-1.388a1.699 1.699 0 0 1 2.32-.622A.85.85 0 0 0 5.5 2.2Zm4 5.8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clip-rule="evenodd"></path></svg></svg>
            )} size={16} />
        }>
            Item with icon
        </UIKit.Menu.Item>
        <UIKit.Menu.Item>Item without icon</UIKit.Menu.Item>
    </UIKit.Menu>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Menu>
  <Menu.Item icon={<Icon size={16} data={GearIcon} />}>Item with icon</Menu.Item>
  <Menu.Item>Item without icon</Menu.Item>
</Menu>
```

<!--/GITHUB_BLOCK-->

### States

Menu item has disabled and selected flags

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Menu>
    <Menu.Item disabled>First</Menu.Item>
    <Menu.Item>Second</Menu.Item>
    <Menu.Item selected>Third</Menu.Item>
</Menu>
`}
>
    <UIKit.Menu>
        <UIKit.Menu.Item disabled>First</UIKit.Menu.Item>
        <UIKit.Menu.Item>Second</UIKit.Menu.Item>
        <UIKit.Menu.Item selected>Third</UIKit.Menu.Item>
    </UIKit.Menu>
</ExampleBlock>
LANDING_BLOCK-->

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

Menu item theme, default - `normal`

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Menu>
    <Menu.Item theme="danger">First</Menu.Item>
    <Menu.Item theme="normal">Second</Menu.Item>
    <Menu.Item>Third</Menu.Item>
</Menu>
`}
>
    <UIKit.Menu>
        <UIKit.Menu.Item theme="danger">First</UIKit.Menu.Item>
        <UIKit.Menu.Item theme="normal">Second</UIKit.Menu.Item>
        <UIKit.Menu.Item>Third</UIKit.Menu.Item>
    </UIKit.Menu>
</ExampleBlock>
LANDING_BLOCK-->

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

| Name       | Description                             |           Type            |  Default   |
| :--------- | :-------------------------------------- | :-----------------------: | :--------: |
| selected   | Menu item selected flag                 |         `boolean`         |  `false`   |
| disabled   | Menu item disabled flag                 |         `boolean`         |  `false`   |
| active     | Menu item active flag                   |         `boolean`         |  `false`   |
| href       | The URL                                 |         `string`          |            |
| title      | Title attribute                         |         `string`          |            |
| target     | Target attribute                        |         `string`          |            |
| rel        | Rel attribute                           |         `string`          |            |
| onClick    | Handler for onclick event               | `React.MouseEventHandler` |            |
| theme      | Menu item theme                         |   `"normal"` `"danger"`   | `"normal"` |
| children   | Child element                           |     `React.ReactNode`     |            |
| className  | HTML `class` attribute                  |         `string`          |            |
| style      | HTML `style` attribute                  |      `CSSProperties`      |            |
| qa         | HTML `data-qa` attribute, used in tests |         `string`          |            |
| extraProps | Extra html attributes                   |         `Record`          |            |

## Menu.Group

You can group items by topics within a single menu

<!--LANDING_BLOCK
<ExampleBlock
    code={`
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
`}
>
    <UIKit.Menu>
        <UIKit.Menu.Item>First</UIKit.Menu.Item>
        <UIKit.Menu.Group label="Group One">
            <UIKit.Menu.Item>One</UIKit.Menu.Item>
            <UIKit.Menu.Item>Two</UIKit.Menu.Item>
        </UIKit.Menu.Group>
        <UIKit.Menu.Group label="Group Two">
            <UIKit.Menu.Item>One</UIKit.Menu.Item>
            <UIKit.Menu.Item>Two</UIKit.Menu.Item>
        </UIKit.Menu.Group>
        <UIKit.Menu.Item>Middle</UIKit.Menu.Item>
        <UIKit.Menu.Group label="Group Three">
            <UIKit.Menu.Item>One</UIKit.Menu.Item>
            <UIKit.Menu.Item>Two</UIKit.Menu.Item>
        </UIKit.Menu.Group>
        <UIKit.Menu.Item>Last</UIKit.Menu.Item>
    </UIKit.Menu>
</ExampleBlock>
LANDING_BLOCK-->

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

| Name      | Description                             |       Type        | Default |
| :-------- | :-------------------------------------- | :---------------: | :-----: |
| label     | Menu group label                        |     `string`      |         |
| children  | Child element                           | `React.ReactNode` |         |
| className | HTML `class` attribute                  |     `string`      |         |
| style     | HTML `style` attribute                  |  `CSSProperties`  |         |
| qa        | HTML `data-qa` attribute, used in tests |     `string`      |         |
