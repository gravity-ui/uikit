<!--GITHUB_BLOCK-->

# Label

<!--/GITHUB_BLOCK-->

```tsx
import {Label} from '@gravity-ui/uikit';
```

You can use `Label`s for highlighting certain information. A `Label` with the `Close` or `Copy` button may be useful for various simple actions.

`Label`s are most suitable for displaying one-line text information with different color codes that show its importance.

## Appearance

A `Label` can be displayed in multiple styles.

### Theme

Use the `theme` property to apply different themes for various statuses. You can use the following values: `normal`, `info`, `success`, `warning`, `danger`, `utility`, `unknown`, and `clear`.
The default theme is `normal`.

<!--SANDBOX
import {Label} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Label theme="normal">Normal</Label>
            <Label theme="info">Info</Label>
            <Label theme="success">Success</Label>
            <Label theme="warning">Warning</Label>
            <Label theme="danger">Danger</Label>
            <Label theme="utility">Utility</Label>
            <Label theme="unknown">Unknown</Label>
            <Label theme="clear">Clear</Label>
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Label theme="normal">Normal</Label>
<Label theme="info">Info</Label>
<Label theme="success">Success</Label>
<Label theme="warning">Warning</Label>
<Label theme="danger">Danger</Label>
<Label theme="utility">Utility</Label>
<Label theme="unknown">Unknown</Label>
<Label theme="clear">Clear</Label>
```

<!--/GITHUB_BLOCK-->

### Type

The `type` property adds various options to a `Label`:

`copy`: Adds a copy button; when clicked, it copies the value of the `copyText` property.

`close`: Adds a close button for managing label lists.

`info`: Adds an info icon to the label.

<!--SANDBOX
import {Label} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Label type="default" onClick={() => alert('On click label')} size="s">
                Clickable
            </Label>
            <Label type="close" onCloseClick={() => alert('On click close')} size="s">
                Closable
            </Label>
            <Label type="copy" copyText="Copy" onCopy={() => alert('On copy')} size="s">
                Copy
            </Label>
            <Label type="info" size="s">Info</Label>
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Label type="default" onClick={() => alert('On click label')} size="s">Clickable</Label>
<Label type="close" onCloseClick={() => alert('On click close')} size="s">Closable</Label>
<Label type="copy" copyText="Copy" onCopy={() => alert('On copy')} size="s">Copy</Label>
<Label type="info" size="s">Info</Label>
```

<!--/GITHUB_BLOCK-->

### Icon

You can add an icon with the `icon` property. To do so, use the [`Icon`](../Icon) component, which is a special wrapper for SVGs.

<!--SANDBOX
import {Icon, Label} from '@gravity-ui/uikit';
import {Gear} from '@gravity-ui/icons';

export default function () {
    return (
        <>
            <Label icon={<Icon size={16} data={Gear} />}>Icon</Label>
            <Label type="close" icon={<Icon size={16} data={Gear} />}>Icon and close</Label>
            <Label type="copy" icon={<Icon size={16} data={Gear} />}>Icon and copy</Label>
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Label icon={<Icon size={16} data={GearIcon} />}>Icon</Label>
<Label type="close" icon={<Icon size={16} data={GearIcon} />}>Icon and close</Label>
<Label type="copy" icon={<Icon size={16} data={GearIcon} />}>Icon and copy</Label>
```

<!--/GITHUB_BLOCK-->

## Value

You can use `Label`s for displaying key-value information. For that, you need to provide the key to the `children` poperty, and value, to `value`:

<!--SANDBOX
import {Label} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Label theme="normal" value="Value">Key</Label>
            <Label theme="info" value="Value">Key</Label>
            <Label theme="success" value="Value">Key</Label>
            <Label theme="warning" value="Value">Key</Label>
            <Label theme="danger" value="Value">Key</Label>
            <Label theme="utility" value="Value">Key</Label>
            <Label theme="unknown" value="Value">Key</Label>
            <Label theme="clear" value="Value">Key</Label>
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Label theme="normal" value="Value">Key</Label>
<Label theme="info" value="Value">Key</Label>
<Label theme="success" value="Value">Key</Label>
<Label theme="warning" value="Value">Key</Label>
<Label theme="danger" value="Value">Key</Label>
<Label theme="utility" value="Value">Key</Label>
<Label theme="unknown" value="Value">Key</Label>
<Label theme="clear" value="Value">Key</Label>
```

<!--/GITHUB_BLOCK-->

## State

A `label` can have different states:

- `disabled`: No interactions allowed.
- `interactive`: Makes the label hoverable.
- `loading`: Shows a loading state.

<!--SANDBOX
import {Label} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Label>Default</Label>
            <Label disabled>Disabled</Label>
            <Label interactive>Interactive</Label>
            <Label loading>Loading</Label>
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Label>Default</Label>
<Label disabled>Disabled</Label>
<Label interactive>Interactive</Label>
<Label loading>Loading</Label>
```

<!--/GITHUB_BLOCK-->

## Size

<!--SANDBOX
import {Label} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Label size="xxs">XXS size</Label>
            <Label size="xs">XS size</Label>
            <Label size="s">S size</Label>
            <Label size="m">M size</Label>
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Label size="xxs">XXS size</Label>
<Label size="xs">XS size</Label>
<Label size="s">S size</Label>
<Label size="m">M size</Label>
```

<!--/GITHUB_BLOCK-->

## Properties

| Name             | Description                                     |                  Type                   |   Default   |
| :--------------- | :---------------------------------------------- | :-------------------------------------: | :---------: |
| children         | Content                                         |            `React.ReactNode`            |             |
| className        | `class` HTML attribute                          |                `string`                 |             |
| closeButtonLabel | `aria-label` of the close button                |                `string`                 |             |
| copyButtonLabel  | `aria-label` of the copy button                 |                `string`                 |             |
| copyText         | Text to copy                                    |                `string`                 |             |
| disabled         | Disabled state                                  |                `boolean`                |             |
| icon             | Label icon (on the left)                        |            `React.ReactNode`            |             |
| interactive      | Enables hover effect                            |                `boolean`                |             |
| loading          | Loading state                                   |                `boolean`                |   `false`   |
| onClick          | `click` event handler                           |               `Function`                |             |
| onCloseClick     | Close button `click` event handler              |               `Function`                |             |
| onCopy           | `copy` event handler                            |               `Function`                |             |
| qa               | `data-qa` HTML attribute, used for testing      |                `string`                 |             |
| size             | Label size                                      |       `"xxs"` `"xs"` `"s"` `"m"`        |   `"xs"`    |
| theme            | Label theme                                     |                `string`                 | `"normal"`  |
| title            | `title` HTML attribute                          |                `string`                 |             |
| type             | Label type                                      | `"default"` `"copy"` `"close"` `"info"` | `"default"` |
| value            | Label value (displayed as `"children : value"`) |            `React.ReactNode`            |             |
| width            | Controls how Label uses parent's space          |                `"auto"`                 |             |
