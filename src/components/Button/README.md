<!--GITHUB_BLOCK-->

# Button

<!--/GITHUB_BLOCK-->

```tsx
import {Button} from '@gravity-ui/uikit';
```

Buttons act as a trigger for certain actions. While this is their main purpose, in some very rare cases, they can be used as links to navigate to other pages.

## Appearance

There are four `Button` types in terms of appearance: basic, outlined, flat, and contrast.
The `Button` appearance is determined by the `view` property.

### Basic

`action`: The most distinctive type of `Button`. It is used for the primary action on a screen that requires the most attention.
We recommend using only one such button per page.

`normal`: Default type of `Button` designed for secondary actions or to maintain the importance of an action without drawing too much attention to it.

`raised`: Placed above the content as a floating element, usually with a fixed location.

<!--SANDBOX
import {Button} from '@gravity-ui/uikit'

export default function () {
    return (
        <>
            <Button view="action" size="l">Action</Button>
            <Button view="normal" size="l">Normal</Button>
            <Button view="raised" size="l">Raised</Button>
        </>
    )
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Button view="action" size="l">Action</Button>
<Button view="normal" size="l">Normal</Button>
<Button view="raised" size="l">Raised</Button>
```

<!--/GITHUB_BLOCK-->

### Outlined

`outlined`: Used for secondary actions that require less attention. It can be used with or without a main button; in the former case, it must be an emphasized one.

`outlined-action`: Usually used as a link to another page or external resource.

This type also has semantic variations that can be used when additional semantics are needed: `outlined-info`, `outlined-success`, `outlined-warning`, and `outlined-danger`.

<!--SANDBOX
import {Button} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Button view="outlined" size="l">Outlined</Button>
            <Button view="outlined-action" size="l">Outlined Action</Button>
            <Button view="outlined-info" size="l">Outlined Info</Button>
            <Button view="outlined-success" size="l">Outlined Success</Button>
            <Button view="outlined-warning" size="l">Outlined Warning</Button>
            <Button view="outlined-danger" size="l">Outlined Danger</Button>
            <Button view="outlined-utility" size="l">Outlined Utility</Button>
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Button view="outlined" size="l">Outlined</Button>
<Button view="outlined-action" size="l">Outlined Action</Button>
<Button view="outlined-info" size="l">Outlined Info</Button>
<Button view="outlined-success" size="l">Outlined Success</Button>
<Button view="outlined-warning" size="l">Outlined Warning</Button>
<Button view="outlined-danger" size="l">Outlined Danger</Button>
<Button view="outlined-utility" size="l">Outlined Utility</Button>
```

<!--/GITHUB_BLOCK-->

### Flat

`flat`: Used for auxiliary actions that require the least attention. It is often used in a list of buttons or action icons (without text) in an editor.

`flat-secondary`: Less emphasized than the `flat` button. It is often used as a secondary button in dialog boxes and modal windows.

`flat-action`: Usually used as a link to another page or external resource.

It also has semantic variations that can be used where additional semantics are needed: `outlined-info`, `outlined-success`, `outlined-warning`, and `outlined-danger`.

<!--SANDBOX
import {Button} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Button view="flat" size="l">Flat</Button>
            <Button view="flat-action" size="l">Flat Action</Button>
            <Button view="flat-info" size="l">Flat Info</Button>
            <Button view="flat-success" size="l">Flat Success</Button>
            <Button view="flat-warning" size="l">Flat Warning</Button>
            <Button view="flat-danger" size="l">Flat Danger</Button>
            <Button view="flat-utility" size="l">Flat Utility</Button>
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Button view="flat" size="l">Flat</Button>
<Button view="flat-secondary" size="l">Flat Secondary</Button>
<Button view="flat-action" size="l">Flat Action</Button>
<Button view="flat-info" size="l">Flat Info</Button>
<Button view="flat-success" size="l">Flat Success</Button>
<Button view="flat-warning" size="l">Flat Warning</Button>
<Button view="flat-danger" size="l">Flat Danger</Button>
<Button view="flat-utility" size="l">Flat Utility</Button>
```

<!--/GITHUB_BLOCK-->

### Contrast

The `normal-contrast`, `outline-contrast`, and `flat-contrast` buttons highlight actions against complex background, e.g., in a banner, or against an inverse background.

<!--SANDBOX
import {Button} from '@gravity-ui/uikit'
import {type CSSProperties} from 'react';

const containerStyle: CSSProperties = {
    backgroundColor: 'rgb(68, 38, 204)',
    padding: '20px',
    borderRadius: '8px'
}

export default function () {
    return (
        <div style={containerStyle}>
            <Button view="normal-contrast" size="l">Normal Contrast</Button>
            <Button view="outlined-contrast" size="l">Outlined Contrast</Button>
            <Button view="flat-contrast" size="l">Flat Contrast</Button>
        </div>
    )
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Button view="normal-contrast" size="l">Normal Contrast</Button>
<Button view="outlined-contrast" size="l">Outlined Contrast</Button>
<Button view="flat-contrast" size="l">Flat Contrast</Button>
```

<!--/GITHUB_BLOCK-->

## Icons

To add an icon to a `Button`, use the [`Icon`](../Icon) component, which is a special wrapper for SVGs.

<!--SANDBOX
import {Gear} from '@gravity-ui/icons';
import {Button, Icon} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Button view="outlined" size="l">
                <Icon data={Gear} size={18} />
                Start
            </Button>
            <Button view="outlined" size="l">
                End
                <Icon data={Gear} size={18} />
            </Button>
            <Button view="outlined" size="l">
                <Icon data={Gear} size={18} />
                Both
                <Icon data={Gear} size={18} />
            </Button>
            <Button view="outlined" size="l">
                <Icon data={Gear} size={18} />
            </Button>
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Button view="outlined" size="l">
    <Icon data={Gear} size={18} />
    Start
</Button>
<Button view="outlined" size="l">
    End
    <Icon data={Gear} size={18} />
</Button>
<Button view="outlined" size="l">
    <Icon data={Gear} size={18} />
    Both
    <Icon data={Gear} size={18} />
</Button>
<Button view="outlined" size="l">
    No text:
    <Icon data={Gear} size={18} />
</Button>
```

<!--/GITHUB_BLOCK-->

## States

A `Button` can have different states:

`disabled`: When the button is unavailable for some reason.

`loading`: When some asynchronous processes are running in the background.

`selected`: When the user can **Enable** and **Disable** the button.

<!--SANDBOX
import {Button} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Button size="l" disabled>Disabled</Button>
            <Button size="l" loading>Loading</Button>
            <Button size="l" selected>Selected</Button>
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Button size="l" disabled>Disabled</Button>
<Button size="l" loading>Loading</Button>
<Button size="l" selected>Selected</Button>
```

<!--/GITHUB_BLOCK-->

### Menu trigger

`Button` automatically changes its appearance when corresponding aria-attributes (`aria-haspopup`, `aria-expanded`) are passed:

<!--SANDBOX
import {Button} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Button aria-haspopup="menu" aria-expanded="true">Menu</Button>
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Button aria-haspopup="menu" aria-expanded="true">
  Menu
</Button>
```

<!--/GITHUB_BLOCK-->

## Size

Use the `size` property to manage the `Button` size. The default size is `m`.

<!--SANDBOX
import {Button} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Button size="xs">XS Size</Button>
            <Button size="s">S Size</Button>
            <Button size="m">M Size</Button>
            <Button size="l">L Size</Button>
            <Button size="xl">XL Size</Button>
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Button size="xs">XS Size</Button>
<Button size="s">S Size</Button>
<Button size="m">M Size</Button>
<Button size="l">L Size</Button>
<Button size="xl">XL Size</Button>
```

<!--/GITHUB_BLOCK-->

## Width

Use the `width` property to manage the way the `Button` behaves inside the container:

`auto`: Limits the maximum width of the `Button` by hiding the overflowing content with an ellipsis.

`max`: Matches the `Button` width to the width of the parent container, also hiding the overflowing content with an ellipsis.

<!--SANDBOX
import {Button} from '@gravity-ui/uikit';
import {type CSSProperties} from 'react';

const containerStyle: CSSProperties = {
    width: 100,
    border: '2px dashed gray',
};

const titleStyle: CSSProperties = {
    textAlign: 'center',
};

export default function () {
    return (
        <>
            <div style={containerStyle}>
                <h4 style={titleStyle}>Default</h4>
                <p>
                    <Button>Text</Button>
                </p>
                <p>
                    <Button>Very Long Text</Button>
                </p>
            </div>
            <div style={containerStyle}>
                <h4 style={titleStyle}>Auto</h4>
                <p>
                    <Button width="auto">Text</Button>
                </p>
                <p>
                    <Button width="auto">Very Long Text</Button>
                </p>
            </div>
            <div style={containerStyle}>
                <h4 style={titleStyle}>Max</h4>
                <p>
                    <Button width="max">Text</Button>
                </p>
                <p>
                    <Button width="max">Very Long Text</Button>
                </p>
            </div>
        </>
    );
}
SANDBOX-->

## Pin

The `pin` property allows you to manage the shape of the _start_ and _end_ edges and is usually used for combining multiple buttons in a single unit.
The `pin` property value consists of the _start_ and _end_ style names separated by a hyphen, e.g., `round-brick`.
The edge styles are: `round` (default), `circle`, `brick`, and `clear`.

<!--SANDBOX
import {Button} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <div>
                <Button view="action" size="l" pin="round-clear">Create</Button>
                <Button view="action" size="l" pin="brick-round">...</Button>
            </div>
            <div>
                <Button view="normal" size="l" pin="circle-clear">Start</Button>
                <Button view="normal" size="l" pin="brick-brick" selected>Center</Button>
                <Button view="normal" size="l" pin="clear-circle">End</Button>
            </div>
            <div>
                <Button view="outlined" pin="brick-clear">1</Button>
                <Button view="outlined" pin="clear-clear">2</Button>
                <Button view="outlined" pin="clear-clear">3</Button>
                <Button view="outlined" pin="clear-brick">4</Button>
            </div>
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<div>
    <Button view="action" size="l" pin="round-brick">Create</Button>
    <Button view="action" size="l" pin="brick-round">...</Button>
</div>
<div>
    <Button view="normal" size="l" pin="circle-clear">Start</Button>
    <Button view="normal" size="l" pin="brick-brick" selected>Center</Button>
    <Button view="normal" size="l" pin="clear-circle">End</Button>
</div>
<div>
    <Button view="outlined" pin="brick-clear">1</Button>
    <Button view="outlined" pin="clear-clear">2</Button>
    <Button view="outlined" pin="clear-clear">3</Button>
    <Button view="outlined" pin="clear-brick">4</Button>
</div>
```

<!--/GITHUB_BLOCK-->

## Properties

`Button` accepts any valid `button` or `a` element props in addition to these:

| Name      | Description                                                          |              Type               |     Default     |
| :-------- | :------------------------------------------------------------------- | :-----------------------------: | :-------------: |
| children  | `Button` content. You can use both text and the `<Icon/>` component. |        `React.ReactNode`        |                 |
| component | Overrides the root component                                         |       `React.ElementType`       |                 |
| disabled  | Toggles the `disabled` state                                         |            `boolean`            |     `false`     |
| href      | Pass this to make the root component a link                          |            `string`             |                 |
| loading   | Toggles the `loading` state                                          |            `boolean`            |     `false`     |
| pin       | Sets the `Button` edge style                                         |            `string`             | `"round-round"` |
| qa        | `data-qa` HTML attribute, used for testing                           |            `string`             |                 |
| selected  | Toggles the `selected` state                                         |            `boolean`            |                 |
| size      | Sets the`Button` size                                                | `"xs"` `"s"` `"m"` `"l"` `"xl"` |      `"m"`      |
| view      | Sets the `Button` appearance                                         |          `ButtonView`           |   `"normal"`    |
| width     | Controls how `Button` uses parent's space                            |        `"auto"` `"max"`         |                 |

## CSS API

| Name                                | Description               |
| :---------------------------------- | :------------------------ |
| `--g-button-text-color`             | Text color                |
| `--g-button-text-color-hover`       | Text color on hover       |
| `--g-button-background-color`       | Background color          |
| `--g-button-background-color-hover` | Background color on hover |
| `--g-button-border-width`           | Border width              |
| `--g-button-border-color`           | Border color              |
| `--g-button-border-style`           | Border style              |
| `--g-button-focus-outline-width`    | Focus outline width       |
| `--g-button-focus-outline-color`    | Focus outline color       |
| `--g-button-focus-outline-style`    | Focus outline style       |
| `--g-button-focus-outline-offset`   | Focus outline offset      |
| `--g-button-height`                 | Height (line height)      |
| `--g-button-padding`                | Side paddings             |
| `--g-button-border-radius`          | Border radius             |
| `--g-button-font-size`              | Text font size            |
| `--g-button-icon-space`             | Icon available space      |
| `--g-button-icon-offset`            | Icon offset               |
