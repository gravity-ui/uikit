<!--GITHUB_BLOCK-->

# ClipboardButton

<!--/GITHUB_BLOCK-->

```tsx
import {ClipboardButton} from '@gravity-ui/uikit';
```

A component that puts all together: [`CopyToClipboard`](../CopyToClipboard/README.md) and [`ClipboardIcon`](../ClipboardIcon/README.md). [`CopyToClipboard`](../CopyToClipboard/README.md) component takes given text into the clipboard and as a wrapper uses [`ClipboardIcon`](../ClipboardIcon/README.md) as a content for itself to display animation when copy-paste happening.

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

`ClipboardButton` properties are inherited from `Button` [properties](../Button/README.md#properties) except `href`, `component`, `target`, `rel`, `loading`, `children`.

| Name               | Description                                                              |                       Type                        |   Default   |
| :----------------- | :----------------------------------------------------------------------- | :-----------------------------------------------: | :---------: |
| hasTooltip         | Disable tooltip. Tooltip won't be shown                                  |                     `boolean`                     |   `true`    |
| nativeCopy         | Use native clipboard methods instead of `copy-to-clipboard` lib          |                    `Function`                     |             |
| onCopy             | Callback after copy `(text: string, result: boolean) => void`            |                    `Function`                     |             |
| options            | Copy to clipboard options                                                | [CopyToClipboardOptions](#copytoclipboardoptions) |             |
| text               | Text to copy                                                             |                     `string`                      |             |
| timeout            | Time before state bounces back to its normal after the button is clicked |                     `number`                      |   `1000`    |
| tooltipInitialText | Text shown before copy                                                   |                     `string`                      |  `"Copy"`   |
| tooltipSuccessText | Text shown after copy                                                    |                     `string`                      | `"Copied!"` |

### CopyToClipboardOptions

| Name    | Description                                                                                                                                                       |   Type    |    Default    |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------: | :-----------: |
| debug   | Enable output to console                                                                                                                                          | `boolean` |    `false`    |
| message | Prompt message                                                                                                                                                    | `string`  |               |
| format  | Set the MIME type of what you want to copy as. Use `text/html` to copy as HTML, `text/plain` to avoid inherited styles showing when pasted into rich text editor. | `string`  | `"text/html"` |
