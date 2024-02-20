<!--GITHUB_BLOCK-->

# Hotkey

<!--/GITHUB_BLOCK-->

```tsx
import {Hotkey} from '@gravity-ui/uikit';
```

`Hotkey` component can be used for display keyboard shortcuts for different platforms: Mac or PC.

### Value

Keyboard shortcuts are set in the format `<key>+<key>` – specify a set of keys separated by a plus. Example: `shift+tab`.

The sequence of key combinations can be separated by a space: `<shortcut> <shortcut>`. Example: `ctrl+a ctrl+c ctrl+v`.

You can use `mod` as a shorthand for `cmd` on Mac and `ctrl` on other platforms. Example: `mod+v` is rendered as ⌘+A for Mac, and as Ctrl+A for PC.

### View

`light` - used if the component is drawn on a light background (used by default).

`dark` - used if the component is drawn on a dark background.

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

`pc` - used to display keyboard shortcuts for a regular PC keyboard.

`mac` - used to display keyboard shortcuts for a Macintosh keyboard.

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
| title     | The value of the keyboard shortcut                                             |       `string`        |                        |
| style     | HTML style attribute                                                           | `React.CSSProperties` |                        |
| className | The alert class name                                                           |       `string`        |                        |
