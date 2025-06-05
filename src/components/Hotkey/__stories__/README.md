<!--GITHUB_BLOCK-->

# Hotkey

<!--/GITHUB_BLOCK-->

```tsx
import {Hotkey} from '@gravity-ui/uikit';
```

You can use the `Hotkey` component to display keyboard shortcuts for both Mac and PC.

### Value

Keyboard shortcuts are set in the `<key>+<key>` format, which means you need to specify multiple keys separated by a plus sign, e.g., `shift+tab`.

The sequence of key combinations can be separated by a space: `<shortcut> <shortcut>`, e.g., `ctrl+a ctrl+c ctrl+v`.

You can use `mod` as a shorthand for `cmd` on Mac and `ctrl` for other platforms. For example, `mod+v` is rendered as ⌘+A for Mac and Ctrl+A for PC.

To render plus or minus literal use `plus` or `minus` keyword, e.q. `mod+plus mod+minus`

### View

`light`: Used if the component is displayed on a light background (used by default).

`dark`: Used if the component is displayed on a dark background.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Hotkey view="light" value="mod+a mod+c mod+v" />
<Hotkey view="dark" value="mod+a mod+c mod+v" />
`}
>
    <UIKit.Hotkey view="light" value="mod+a mod+c mod+v" />
    <UIKit.Hotkey view="dark" value="mod+a mod+c mod+v" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```
<Hotkey view="light" value="mod+a mod+c mod+v" />
<Hotkey view="dark" value="mod+a mod+c mod+v" />
```

<!--/GITHUB_BLOCK-->

### Platform

`pc`: Used to display keyboard shortcuts for a regular PC keyboard.

`mac`: Used to display keyboard shortcuts for a Macintosh keyboard.

By default, the platform is detected automatically.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Hotkey value="mod+a mod+c mod+v" />
<Hotkey platform="pc" value="mod+a mod+c mod+v" />
<Hotkey platform="mac" value="mod+a mod+c mod+v" />
`}
>
    <UIKit.Hotkey value="mod+a mod+c mod+v" />
    <UIKit.Hotkey platform="pc" value="mod+a mod+c mod+v" />
    <UIKit.Hotkey platform="mac" value="mod+a mod+c mod+v" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```
<Hotkey value="mod+a mod+c mod+v" />
<Hotkey platform="pc" value="mod+a mod+c mod+v" />
<Hotkey platform="mac" value="mod+a mod+c mod+v" />
```

<!--/GITHUB_BLOCK-->

## Properties

| Name      | Description                                                                    |         Type          |        Default         |
| :-------- | :----------------------------------------------------------------------------- | :-------------------: | :--------------------: |
| view      | Used to set the color scheme                                                   |  `"light"` `"dark"`   |       `"light"`        |
| platform  | Used to select the platform (PC or Macintosh) to display the keyboard shortcut |    `"pc"` `"mac"`     | Detected automatically |
| title     | Keyboard shortcut value                                                        |       `string`        |                        |
| style     | HTML style attribute                                                           | `React.CSSProperties` |                        |
| className | Alert class name                                                               |       `string`        |                        |
