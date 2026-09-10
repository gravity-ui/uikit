<!--GITHUB_BLOCK-->

# Ellipsis

<!--/GITHUB_BLOCK-->

The `Ellipsis` component truncates a single line of text that is too long to fit its container, replacing the hidden part with an ellipsis character (`…`). Unlike a plain CSS `text-overflow: ellipsis`, it lets you choose where the text is cut off — at the `start`, `center`, or `end` — and keeps the full text available for screen readers (via `aria-label`) and for copying.

```tsx
import {Ellipsis} from '@gravity-ui/uikit';
```

## Position

Use the `position` property to control where the text is truncated. The default value is `end`. The possible values are `start`, `center`, and `end`.

The `start` and `end` positions are rendered with pure CSS, while `center` measures the text and rebuilds it to keep both ends visible.

<!--SANDBOX
import {Ellipsis} from '@gravity-ui/uikit';

export default function () {
    return (
        <div style={{width: 200, display: 'grid', gap: 8}}>
            <Ellipsis position="start">a-very-long-long-text-that-should-be-truncated-in-somewhere.tar.gz</Ellipsis>
            <Ellipsis position="center">a-very-long-long-text-that-should-be-truncated-in-somewhere.tar.gz</Ellipsis>
            <Ellipsis position="end">a-very-long-long-text-that-should-be-truncated-in-somewhere.tar.gz</Ellipsis>
        </div>
    );
}
SANDBOX-->

## Offsets

Use the `offsetStart` and `offsetEnd` properties to keep a fixed number of characters (or separator-delimited parts, see below) at the beginning and end of the text untruncated. This is useful for preserving meaningful edges such as a file extension.

<!--SANDBOX
import {Ellipsis} from '@gravity-ui/uikit';

export default function () {
    return (
        <div style={{width: 200}}>
            <Ellipsis position="center" offsetEnd={7}>
                a-very-long-long-text-that-should-be-truncated-in-somewhere.tar.gz
            </Ellipsis>
        </div>
    );
}
SANDBOX-->

## Separator

By default, `offsetStart` and `offsetEnd` count characters. Provide a `separator` (a single string or an array of strings) to count separator-delimited parts instead, so the text is only ever cut on separator boundaries. This is handy for paths, package names, or dotted identifiers.

<!--SANDBOX
import {Ellipsis} from '@gravity-ui/uikit';

export default function () {
    return (
        <div style={{width: 240}}>
            <Ellipsis position="center" separator="/" offsetStart={1} offsetEnd={1}>
                path/to/some/deeply/nested/folder/file-name.tsx
            </Ellipsis>
        </div>
    );
}
SANDBOX-->

## Properties

| Name        | Description                                                                    |             Type             | Default |
| :---------- | :----------------------------------------------------------------------------- | :--------------------------: | :-----: |
| children    | Text to be truncated                                                           |           `string`           |         |
| position    | Where the text is truncated                                                    | `'start'` `'center'` `'end'` | `'end'` |
| offsetStart | Number of leading characters (or `separator` parts) to keep untruncated        |           `number`           |   `0`   |
| offsetEnd   | Number of trailing characters (or `separator` parts) to keep untruncated       |           `number`           |   `0`   |
| separator   | Separator(s) used to count `offsetStart`/`offsetEnd` in parts instead of chars |     `string` `string[]`      |  `''`   |
| className   | Custom CSS class for the root element                                          |           `string`           |         |
| style       | HTML `style` attribute                                                         |    `React.CSSProperties`     |         |
| qa          | `data-qa` HTML attribute, used for testing                                     |           `string`           |         |
