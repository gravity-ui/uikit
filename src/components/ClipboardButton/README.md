<!--GITHUB_BLOCK-->

# ClipboardButton

<!--/GITHUB_BLOCK-->

`ClipboardButton` is a ready-made button that copies given text to the clipboard and plays a success animation. It combines [`CopyToClipboard`](../CopyToClipboard/README.md) (the copy behavior) with [`ClipboardIcon`](../ClipboardIcon/README.md) (the animated icon).

```tsx
import {ClipboardButton} from '@gravity-ui/uikit';
```

<!--SANDBOX
import {ClipboardButton} from '@gravity-ui/uikit';

export default function () {
    return <ClipboardButton text="Some text to copy" />;
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<ClipboardButton text="Some text to copy" />
```

<!--/GITHUB_BLOCK-->

## Tooltip

Use `tooltipProps` to configure the underlying [`ActionTooltip`](../ActionTooltip/README.md),
for example its placement or portal behavior:

```tsx
<ClipboardButton text="Some text to copy" tooltipProps={{placement: 'top', disablePortal: true}} />
```

Supported properties are `onOpenChange`, `strategy`, `placement`, `offset`, `disabled`,
`container`, `disablePortal`, and the `DOMProps` (`className`, `style`) and `QAProps` (`qa`) properties.

Set `tooltipProps.disabled` to `true` to disable the tooltip. `hasTooltip={false}` and the copy
feedback timeout also disable it, even when `tooltipProps.disabled` is `false`. Use
`tooltipInitialText`, `tooltipSuccessText`, and `timeout` to configure copy feedback.

## Properties

The `ClipboardButton` properties are inherited from the `Button` [properties](../Button/README.md#properties).

| Name               | Description                                                               |            Type            |   Default   |
| :----------------- | :------------------------------------------------------------------------ | :------------------------: | :---------: |
| hasTooltip         | Toggles displaying the tooltip                                            |         `boolean`          |   `true`    |
| onCopy             | Callback after copying `(text: string, result: boolean) => void`          |         `Function`         |             |
| text               | Text to copy (can be a string or a function that returns a string)        |  `string \| () => string`  |             |
| timeout            | Time before the state switches back to normal after the button is clicked |          `number`          |   `1000`    |
| tooltipInitialText | Text shown before copying                                                 |          `string`          |  `"Copy"`   |
| tooltipSuccessText | Text shown after copying                                                  |          `string`          | `"Copied!"` |
| tooltipProps       | Tooltip configuration. See [supported properties](#tooltip).              |          `object`          |             |
| icon               | Custom icon                                                               |     `React.ReactNode`      |             |
| iconPosition       | Position of icon                                                          | `start          \|    end` |   `start`   |
