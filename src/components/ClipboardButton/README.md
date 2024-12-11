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

The `ClipboardButton` properties are inherited from the `Button` [properties](../Button/README.md#properties), except for `href`, `component`, `target`, `rel`, `loading`, and `children`.

| Name               | Description                                                               |                       Type                        |   Default   |
| :----------------- | :------------------------------------------------------------------------ | :-----------------------------------------------: | :---------: |
| hasTooltip         | Toggles displaying the tooltip                                            |                     `boolean`                     |   `true`    |
| onCopy             | Callback after copying `(text: string, result: boolean) => void`          |                    `Function`                     |             |
| options            | Copy to clipboard options                                                 | [CopyToClipboardOptions](#copytoclipboardoptions) |             |
| text               | Text to copy                                                              |                     `string`                      |             |
| timeout            | Time before the state switches back to normal after the button is clicked |                     `number`                      |   `1000`    |
| tooltipInitialText | Text shown before copying                                                 |                     `string`                      |  `"Copy"`   |
| tooltipSuccessText | Text shown after copying                                                  |                     `string`                      | `"Copied!"` |

### CopyToClipboardOptions

| Name    | Description                                                                                                                                                       |   Type    |    Default    |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------: | :-----------: |
| debug   | Enables output to console                                                                                                                                         | `boolean` |    `false`    |
| message | Prompt message                                                                                                                                                    | `string`  |               |
| format  | Set the MIME type of what you want to copy. Use `text/html` to copy as HTML and `text/plain` to avoid showing inherited styles when pasted into rich text editor. | `string`  | `"text/html"` |
