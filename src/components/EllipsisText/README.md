<!--GITHUB_BLOCK-->

# EllipsisText

<!--/GITHUB_BLOCK-->

The `EllipsisText` component truncates a single line of text that is too long to fit its container, replacing the hidden part with an ellipsis character (`…`). Unlike a plain CSS `text-overflow: ellipsis`, it lets you choose where the text is cut off — at the `start`, `center`, or `end` — and keeps the full text available for screen readers (via visually hidden text) and for copying.

```tsx
import {EllipsisText} from '@gravity-ui/uikit';
```

As with CSS ellipsis, truncation requires a definite width somewhere in the layout.

## Position

Use the `position` property to control where the text is truncated. The default value is `end`. The possible values are `start`, `center`, and `end`.

The `start` and `end` positions are rendered with pure CSS, while `center` measures the text and rebuilds it to keep both ends visible.

<!--SANDBOX
import {EllipsisText} from '@gravity-ui/uikit';

export default function () {
    return (
        <div style={{width: 200, display: 'grid', gap: 8}}>
            <EllipsisText position="start">a-very-long-long-text-that-should-be-truncated-in-somewhere.tar.gz</EllipsisText>
            <EllipsisText position="center">a-very-long-long-text-that-should-be-truncated-in-somewhere.tar.gz</EllipsisText>
            <EllipsisText position="end">a-very-long-long-text-that-should-be-truncated-in-somewhere.tar.gz</EllipsisText>
        </div>
    );
}
SANDBOX-->

## Offsets

Use the `offsetStart` and `offsetEnd` properties to keep a fixed number of characters (or separator-delimited parts, see below) at the beginning and end of the text untruncated. This is useful for preserving meaningful edges such as a file extension.

<!--SANDBOX
import {EllipsisText} from '@gravity-ui/uikit';

export default function () {
    return (
        <div style={{width: 200, display: 'grid'}}>
            <EllipsisText position="center" offsetEnd={7}>
                a-very-long-long-text-that-should-be-truncated-in-somewhere.tar.gz
            </EllipsisText>
        </div>
    );
}
SANDBOX-->

## Separator

By default, offsets count user-perceived characters (grapheme clusters), keeping emoji and combining marks together. Environments without `Intl.Segmenter` fall back to Unicode code points, which still preserve surrogate pairs. With `separator`, they count parts as with `split(separator)`; an array supplies alternative separator tokens. The first `offsetStart` and last `offsetEnd` parts are kept with their original separators between them. The remaining text can be truncated within a part.

No match means one part. Offsets covering all parts preserve the whole string without duplication. Multi-character tokens are supported; matching proceeds left to right, preferring the longest match. Empty tokens are ignored; if none remain, offsets count characters.

<!--SANDBOX
import {EllipsisText} from '@gravity-ui/uikit';

export default function () {
    return (
        <div style={{width: 240, display: 'grid'}}>
            <EllipsisText position="center" separator="/" offsetStart={1} offsetEnd={1}>
                path/to/some/deeply/nested/folder/file-name.tsx
            </EllipsisText>
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
