<!--GITHUB_BLOCK-->

# ClipboardButton

<!--/GITHUB_BLOCK-->

```tsx
import {ClipboardButton} from '@gravity-ui/uikit';
```

This component puts [`CopyToClipboard`](../CopyToClipboard/README.md) and [`ClipboardIcon`](../ClipboardIcon/README.md) together. [`CopyToClipboard`](../CopyToClipboard/README.md) sends a text to the clipboard and, as a wrapper, uses [`ClipboardIcon`](../ClipboardIcon/README.md) as content for itself to display animation when a copy-paste event happens.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<ClipboardButton text="Some text to copy" />
`}
>
    <UIKit.ClipboardButton text="Some text to copy" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<ClipboardButton text="Some text to copy" />
```

<!--/GITHUB_BLOCK-->

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
| icon               | Custom icon                                                               |     `React.ReactNode`      |             |
| iconPosition       | Position of icon                                                          | `start          \|    end` |   `start`   |
