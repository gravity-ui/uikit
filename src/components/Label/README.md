<!--GITHUB_BLOCK-->

# Label

<!--/GITHUB_BLOCK-->

```tsx
import {Label} from '@gravity-ui/uikit';
```

`Label` can be used for displaying certain marking information. `Label` with the close or copy button may be useful for various simple actions.

`Label` is most suitable for displaying one-line text information with different color codes indicating its importance.

## Appearance

`Label` can be displayed in multiple styles.

### Theme

Apply different themes for various statuses with the `theme` property. You can use the following values: `normal`, `info`, `success`, `warning`, `danger`, `utility`, `unknown`, and `clear`.
The default theme is `normal`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Label theme="normal">Normal</Label>
<Label theme="info">Info</Label>
<Label theme="success">Success</Label>
<Label theme="warning">Warning</Label>
<Label theme="danger">Danger</Label>
<Label theme="utility">Utility</Label>
<Label theme="unknown">Unknown</Label>
<Label theme="clear">Clear</Label>
`}
>
    <UIKit.Label theme="normal">Normal</UIKit.Label>
    <UIKit.Label theme="info">Info</UIKit.Label>
    <UIKit.Label theme="success">Success</UIKit.Label>
    <UIKit.Label theme="warning">Warning</UIKit.Label>
    <UIKit.Label theme="danger">Danger</UIKit.Label>
    <UIKit.Label theme="utility">Utility</UIKit.Label>
    <UIKit.Label theme="unknown">Unknown</UIKit.Label>
    <UIKit.Label theme="clear">Clear</UIKit.Label>
</ExampleBlock>

LANDING_BLOCK-->

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

Adds various options to the `Label` using the `type` property.

`copy`: Adds a copy button; when clicked, it copies the value of the `copyText` property.

`close`: Adds a close button for managing label lists.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Label type="default" onClick={() => alert('On click label')} size="s">Clickable</Label>
<Label type="close" onCloseClick={() => alert('On click close')} size="s">Closable</Label>
<Label type="copy" copyText="Copy" onCopy={() => alert('On copy')} size="s">Copy</Label>
`}
>
    <UIKit.Label type="default" onClick={() => alert('On click label')} size="s">Clickable</UIKit.Label>
    <UIKit.Label type="close" onCloseClick={() => alert('On click close')} size="s">Closable</UIKit.Label>
    <UIKit.Label type="copy" copyText="Copy" onCopy={() => alert('On copy')} size="s">Copy</UIKit.Label>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Label type="default" onClick={() => alert('On click label')} size="s">Clickable</Label>
<Label type="close" onCloseClick={() => alert('On click close')} size="s">Closable</Label>
<Label type="copy" copyText="Copy" onCopy={() => alert('On copy')} size="s">Copy</Label>
```

<!--/GITHUB_BLOCK-->

### Icon

You can add an icon with the `icon` property. To do so, use the [`Icon`](../Icon) component, a special wrapper for SVGs.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Label icon={<Icon size={16} data={GearIcon} />}>Icon</Label>
<Label type="close" icon={<Icon size={16} data={GearIcon} />}>Icon and close</Label>
<Label type="copy" icon={<Icon size={16} data={GearIcon} />}>Icon and copy</Label>
`}
>
    <UIKit.Label icon={
        <UIKit.Icon data={() => (
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" class="g-icon" fill="currentColor" stroke="none" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M7.199 2H8.8a.2.2 0 0 1 .2.2c0 1.808 1.958 2.939 3.524 2.034a.199.199 0 0 1 .271.073l.802 1.388a.199.199 0 0 1-.073.272c-1.566.904-1.566 3.164 0 4.069a.199.199 0 0 1 .073.271l-.802 1.388a.199.199 0 0 1-.271.073C10.958 10.863 9 11.993 9 13.8a.2.2 0 0 1-.199.2H7.2a.199.199 0 0 1-.2-.2c0-1.808-1.958-2.938-3.524-2.034a.199.199 0 0 1-.272-.073l-.8-1.388a.199.199 0 0 1 .072-.271c1.566-.905 1.566-3.165 0-4.07a.199.199 0 0 1-.073-.271l.801-1.388a.199.199 0 0 1 .272-.073C5.042 5.138 7 4.007 7 2.2c0-.11.089-.199.199-.199ZM5.5 2.2c0-.94.76-1.7 1.699-1.7H8.8c.94 0 1.7.76 1.7 1.7a.85.85 0 0 0 1.274.735 1.699 1.699 0 0 1 2.32.622l.802 1.388c.469.813.19 1.851-.622 2.32a.85.85 0 0 0 0 1.472 1.7 1.7 0 0 1 .622 2.32l-.802 1.388a1.699 1.699 0 0 1-2.32.622.85.85 0 0 0-1.274.735c0 .939-.76 1.7-1.699 1.7H7.2a1.7 1.7 0 0 1-1.699-1.7.85.85 0 0 0-1.274-.735 1.698 1.698 0 0 1-2.32-.622l-.802-1.388a1.699 1.699 0 0 1 .622-2.32.85.85 0 0 0 0-1.471 1.699 1.699 0 0 1-.622-2.321l.801-1.388a1.699 1.699 0 0 1 2.32-.622A.85.85 0 0 0 5.5 2.2Zm4 5.8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clip-rule="evenodd"></path></svg></svg>
        )} size={16} />
    }>
        <span>Icon</span>
    </UIKit.Label>
    <UIKit.Label type="close" icon={
        <UIKit.Icon data={() => (
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" class="g-icon" fill="currentColor" stroke="none" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M7.199 2H8.8a.2.2 0 0 1 .2.2c0 1.808 1.958 2.939 3.524 2.034a.199.199 0 0 1 .271.073l.802 1.388a.199.199 0 0 1-.073.272c-1.566.904-1.566 3.164 0 4.069a.199.199 0 0 1 .073.271l-.802 1.388a.199.199 0 0 1-.271.073C10.958 10.863 9 11.993 9 13.8a.2.2 0 0 1-.199.2H7.2a.199.199 0 0 1-.2-.2c0-1.808-1.958-2.938-3.524-2.034a.199.199 0 0 1-.272-.073l-.8-1.388a.199.199 0 0 1 .072-.271c1.566-.905 1.566-3.165 0-4.07a.199.199 0 0 1-.073-.271l.801-1.388a.199.199 0 0 1 .272-.073C5.042 5.138 7 4.007 7 2.2c0-.11.089-.199.199-.199ZM5.5 2.2c0-.94.76-1.7 1.699-1.7H8.8c.94 0 1.7.76 1.7 1.7a.85.85 0 0 0 1.274.735 1.699 1.699 0 0 1 2.32.622l.802 1.388c.469.813.19 1.851-.622 2.32a.85.85 0 0 0 0 1.472 1.7 1.7 0 0 1 .622 2.32l-.802 1.388a1.699 1.699 0 0 1-2.32.622.85.85 0 0 0-1.274.735c0 .939-.76 1.7-1.699 1.7H7.2a1.7 1.7 0 0 1-1.699-1.7.85.85 0 0 0-1.274-.735 1.698 1.698 0 0 1-2.32-.622l-.802-1.388a1.699 1.699 0 0 1 .622-2.32.85.85 0 0 0 0-1.471 1.699 1.699 0 0 1-.622-2.321l.801-1.388a1.699 1.699 0 0 1 2.32-.622A.85.85 0 0 0 5.5 2.2Zm4 5.8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clip-rule="evenodd"></path></svg></svg>
        )} size={16} />
    }>
        <span>Icon and close</span>
    </UIKit.Label>
    <UIKit.Label type="copy" icon={
        <UIKit.Icon data={() => (
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" class="g-icon" fill="currentColor" stroke="none" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M7.199 2H8.8a.2.2 0 0 1 .2.2c0 1.808 1.958 2.939 3.524 2.034a.199.199 0 0 1 .271.073l.802 1.388a.199.199 0 0 1-.073.272c-1.566.904-1.566 3.164 0 4.069a.199.199 0 0 1 .073.271l-.802 1.388a.199.199 0 0 1-.271.073C10.958 10.863 9 11.993 9 13.8a.2.2 0 0 1-.199.2H7.2a.199.199 0 0 1-.2-.2c0-1.808-1.958-2.938-3.524-2.034a.199.199 0 0 1-.272-.073l-.8-1.388a.199.199 0 0 1 .072-.271c1.566-.905 1.566-3.165 0-4.07a.199.199 0 0 1-.073-.271l.801-1.388a.199.199 0 0 1 .272-.073C5.042 5.138 7 4.007 7 2.2c0-.11.089-.199.199-.199ZM5.5 2.2c0-.94.76-1.7 1.699-1.7H8.8c.94 0 1.7.76 1.7 1.7a.85.85 0 0 0 1.274.735 1.699 1.699 0 0 1 2.32.622l.802 1.388c.469.813.19 1.851-.622 2.32a.85.85 0 0 0 0 1.472 1.7 1.7 0 0 1 .622 2.32l-.802 1.388a1.699 1.699 0 0 1-2.32.622.85.85 0 0 0-1.274.735c0 .939-.76 1.7-1.699 1.7H7.2a1.7 1.7 0 0 1-1.699-1.7.85.85 0 0 0-1.274-.735 1.698 1.698 0 0 1-2.32-.622l-.802-1.388a1.699 1.699 0 0 1 .622-2.32.85.85 0 0 0 0-1.471 1.699 1.699 0 0 1-.622-2.321l.801-1.388a1.699 1.699 0 0 1 2.32-.622A.85.85 0 0 0 5.5 2.2Zm4 5.8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clip-rule="evenodd"></path></svg></svg>
        )} size={16} />
    }>
        <span>Icon and copy</span>
    </UIKit.Label>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Label icon={<Icon size={16} data={GearIcon} />}>Icon</Label>
<Label type="close" icon={<Icon size={16} data={GearIcon} />}>Icon and close</Label>
<Label type="copy" icon={<Icon size={16} data={GearIcon} />}>Icon and copy</Label>
```

<!--/GITHUB_BLOCK-->

## Value

`Label` can be used for displaying key-value information. Pass key to the `children` and value to the `value` property.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Label theme="normal" value="Value">Key</Label>
<Label theme="info" value="Value">Key</Label>
<Label theme="success" value="Value">Key</Label>
<Label theme="warning" value="Value">Key</Label>
<Label theme="danger" value="Value">Key</Label>
<Label theme="utility" value="Value">Key</Label>
<Label theme="unknown" value="Value">Key</Label>
<Label theme="clear" value="Value">Key</Label>
`}
>
    <UIKit.Label theme="normal" value="Value">Key</UIKit.Label>
    <UIKit.Label theme="info" value="Value">Key</UIKit.Label>
    <UIKit.Label theme="success" value="Value">Key</UIKit.Label>
    <UIKit.Label theme="warning" value="Value">Key</UIKit.Label>
    <UIKit.Label theme="danger" value="Value">Key</UIKit.Label>
    <UIKit.Label theme="utility" value="Value">Key</UIKit.Label>
    <UIKit.Label theme="unknown" value="Value">Key</UIKit.Label>
    <UIKit.Label theme="clear" value="Value">Key</UIKit.Label>
</ExampleBlock>

LANDING_BLOCK-->

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

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Label>Default</Label>
<Label disabled>Disabled</Label>
<Label interactive>Interactive</Label>
`}
>
    <UIKit.Label>Default</UIKit.Label>
    <UIKit.Label disabled>Disabled</UIKit.Label>
    <UIKit.Label interactive>Interactive</UIKit.Label>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Label>Default</Label>
<Label disabled>Disabled</Label>
<Label interactive>Interactive</Label>
```

<!--/GITHUB_BLOCK-->

## Size

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Label size="xs">XS size</Label>
<Label size="s">S size</Label>
<Label size="m">M size</Label>
`}
>
    <UIKit.Label size="xs">XS size</UIKit.Label>
    <UIKit.Label size="s">S size</UIKit.Label>
    <UIKit.Label size="m">M size</UIKit.Label>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Label size="xs">XS size</Label>
<Label size="s">S size</Label>
<Label size="m">M size</Label>
```

<!--/GITHUB_BLOCK-->

## Properties

| Name             | Description                                                     |              Type              |   Default   |
| :--------------- | :-------------------------------------------------------------- | :----------------------------: | :---------: |
| children         | Content                                                         |       `React.ReactNode`        |             |
| className        | HTML `class` attribute                                          |            `string`            |             |
| closeButtonLabel | `aria-label` of the close button                                |            `string`            |             |
| copyButtonLabel  | `aria-label` of the copy button                                 |            `string`            |             |
| copyText         | Text to copy                                                    |            `string`            |             |
| nativeCopy       | Use native clipboard methods instead of `copy-to-clipboard` lib |            `string`            |             |
| disabled         | Disabled state                                                  |           `boolean`            |             |
| icon             | Label icon (on the left)                                        |       `React.ReactNode`        |             |
| interactive      | Enable hover effect                                             |           `boolean`            |             |
| onClick          | `click` event handler                                           |           `Function`           |             |
| onCloseClick     | Close button `click` event handler                              |           `Function`           |             |
| onCopy           | `copy` event handler                                            |           `Function`           |             |
| size             | Label size                                                      |       `"xs"` `"s"` `"m"`       |    `"s"`    |
| theme            | Label theme                                                     |            `string`            | `"normal"`  |
| type             | Label type                                                      | `"default"` `"copy"` `"close"` | `"default"` |
| value            | Label value (displayed as "children : value")                   |            `string`            |             |
| title            | HTML `title` attribute                                          |            `string`            |             |
| qa               | HTML `data-qa` attribute, used in tests                         |            `string`            |             |
