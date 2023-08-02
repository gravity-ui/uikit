<!--GITHUB_BLOCK-->

# Label

<!--/GITHUB_BLOCK-->

```tsx
import {Label} from '@gravity-ui/uikit';
```

## Description

Label component can be used for display some marking information. Label with close button or copy button may be usefull for for various simple actions.

Label component is best designed to display one line text information with different color indication of its importance.

## Appearance

Label can be displayed with multiple styled combination

- theme (`normal`, `info`, `danger`, `warning`, `success`, `unknown`, `clear`)
- type (`default`, `copy`, `close`)

### Theme

Used for specify theme of the label. Info, Warning, Danger and Success are standard types for display varios statuses.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Label theme="normal" size="s">Normal</Label>
<Label theme="info" size="s">Info</Label>
<Label theme="warning" size="s">Warning</Label>
<Label theme="danger" size="s">Danger</Label>
<Label theme="success" size="s">Success</Label>
<Label theme="unknown" size="s">Unknown</Label>
<Label theme="clear" size="s">Clear</Label>
`}
>
    <UIKit.Label theme="normal" size="s">Normal</UIKit.Label>
    <UIKit.Label theme="info" size="s">Info</UIKit.Label>
    <UIKit.Label theme="warning" size="s">Warning</UIKit.Label>
    <UIKit.Label theme="danger" size="s">Danger</UIKit.Label>
    <UIKit.Label theme="success" size="s">Success</UIKit.Label>
    <UIKit.Label theme="unknown" size="s">Unknown</UIKit.Label>
    <UIKit.Label theme="clear" size="s">Clear</UIKit.Label>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Label theme="normal" size="s">Normal</Label>
<Label theme="info" size="s">Info</Label>
<Label theme="warning" size="s">Warning</Label>
<Label theme="danger" size="s">Danger</Label>
<Label theme="success" size="s">Success</Label>
<Label theme="unknown" size="s">Unknown</Label>
<Label theme="clear" size="s">Clear</Label>
```

<!--/GITHUB_BLOCK-->

### Type

Used for add close or copy button after label for user interaction. Button of copy type automatically copy `copyText` property value to clipboard.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Label type="default" onClick={() => alert('On click label')} size="s">Click on label</Label>
<Label type="close" onClose={() => alert('On click close')} size="s">Click on close</Label>
<Label type="copy" copyText="Copy" onCopy={() => alert('On click copy')} size="s">Click on copy</Label>
`}
>
    <UIKit.Label type="default" onClick={() => alert('On click label')} size="s">Click on label</UIKit.Label>
    <UIKit.Label type="close" onClose={() => alert('On click close')} size="s">Click on close</UIKit.Label>
    <UIKit.Label type="copy" copyText="Copy" onCopy={() => alert('On click copy')} size="s">Click on copy</UIKit.Label>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Label type="default" onClick={() => alert('On click label')} size="s">Click on label</Label>
<Label type="close" onClose={() => alert('On click close')} size="s">Click on close</Label>
<Label type="copy" copyText="Copy" onCopy={() => alert('On click copy')} size="s">Click on copy</Label>
```

<!--/GITHUB_BLOCK-->

### Icon

Used for add prefix icon for the label, works combined with all other properties.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Label size="s" icon={<Icon size={16} data={GearIcon} />}>Default with icon</Label>
<Label theme="info" size="s" icon={<Icon size={16} data={GearIcon} />}>Info with icon</Label>
<Label type="close" size="s" icon={<Icon size={16} data={GearIcon} />}>Close action and icon</Label>
<Label size="m" icon={<Icon data={GearIcon} />}>M-size icon</Label>
`}
>
    <UIKit.Label size="s" icon={
        <UIKit.Icon data={() => (
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" class="yc-icon" fill="currentColor" stroke="none" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M7.199 2H8.8a.2.2 0 0 1 .2.2c0 1.808 1.958 2.939 3.524 2.034a.199.199 0 0 1 .271.073l.802 1.388a.199.199 0 0 1-.073.272c-1.566.904-1.566 3.164 0 4.069a.199.199 0 0 1 .073.271l-.802 1.388a.199.199 0 0 1-.271.073C10.958 10.863 9 11.993 9 13.8a.2.2 0 0 1-.199.2H7.2a.199.199 0 0 1-.2-.2c0-1.808-1.958-2.938-3.524-2.034a.199.199 0 0 1-.272-.073l-.8-1.388a.199.199 0 0 1 .072-.271c1.566-.905 1.566-3.165 0-4.07a.199.199 0 0 1-.073-.271l.801-1.388a.199.199 0 0 1 .272-.073C5.042 5.138 7 4.007 7 2.2c0-.11.089-.199.199-.199ZM5.5 2.2c0-.94.76-1.7 1.699-1.7H8.8c.94 0 1.7.76 1.7 1.7a.85.85 0 0 0 1.274.735 1.699 1.699 0 0 1 2.32.622l.802 1.388c.469.813.19 1.851-.622 2.32a.85.85 0 0 0 0 1.472 1.7 1.7 0 0 1 .622 2.32l-.802 1.388a1.699 1.699 0 0 1-2.32.622.85.85 0 0 0-1.274.735c0 .939-.76 1.7-1.699 1.7H7.2a1.7 1.7 0 0 1-1.699-1.7.85.85 0 0 0-1.274-.735 1.698 1.698 0 0 1-2.32-.622l-.802-1.388a1.699 1.699 0 0 1 .622-2.32.85.85 0 0 0 0-1.471 1.699 1.699 0 0 1-.622-2.321l.801-1.388a1.699 1.699 0 0 1 2.32-.622A.85.85 0 0 0 5.5 2.2Zm4 5.8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clip-rule="evenodd"></path></svg></svg>
        )} size={16} />
    }>
        <span>Default with Icon</span>
    </UIKit.Label>
    <UIKit.Label theme="info" size="s" icon={
        <UIKit.Icon data={() => (
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" class="yc-icon" fill="currentColor" stroke="none" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M7.199 2H8.8a.2.2 0 0 1 .2.2c0 1.808 1.958 2.939 3.524 2.034a.199.199 0 0 1 .271.073l.802 1.388a.199.199 0 0 1-.073.272c-1.566.904-1.566 3.164 0 4.069a.199.199 0 0 1 .073.271l-.802 1.388a.199.199 0 0 1-.271.073C10.958 10.863 9 11.993 9 13.8a.2.2 0 0 1-.199.2H7.2a.199.199 0 0 1-.2-.2c0-1.808-1.958-2.938-3.524-2.034a.199.199 0 0 1-.272-.073l-.8-1.388a.199.199 0 0 1 .072-.271c1.566-.905 1.566-3.165 0-4.07a.199.199 0 0 1-.073-.271l.801-1.388a.199.199 0 0 1 .272-.073C5.042 5.138 7 4.007 7 2.2c0-.11.089-.199.199-.199ZM5.5 2.2c0-.94.76-1.7 1.699-1.7H8.8c.94 0 1.7.76 1.7 1.7a.85.85 0 0 0 1.274.735 1.699 1.699 0 0 1 2.32.622l.802 1.388c.469.813.19 1.851-.622 2.32a.85.85 0 0 0 0 1.472 1.7 1.7 0 0 1 .622 2.32l-.802 1.388a1.699 1.699 0 0 1-2.32.622.85.85 0 0 0-1.274.735c0 .939-.76 1.7-1.699 1.7H7.2a1.7 1.7 0 0 1-1.699-1.7.85.85 0 0 0-1.274-.735 1.698 1.698 0 0 1-2.32-.622l-.802-1.388a1.699 1.699 0 0 1 .622-2.32.85.85 0 0 0 0-1.471 1.699 1.699 0 0 1-.622-2.321l.801-1.388a1.699 1.699 0 0 1 2.32-.622A.85.85 0 0 0 5.5 2.2Zm4 5.8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clip-rule="evenodd"></path></svg></svg>
        )} size={16} />
    }>
        <span>Info with icon</span>
    </UIKit.Label>
    <UIKit.Label type="close" size="s" icon={
        <UIKit.Icon data={() => (
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" class="yc-icon" fill="currentColor" stroke="none" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M7.199 2H8.8a.2.2 0 0 1 .2.2c0 1.808 1.958 2.939 3.524 2.034a.199.199 0 0 1 .271.073l.802 1.388a.199.199 0 0 1-.073.272c-1.566.904-1.566 3.164 0 4.069a.199.199 0 0 1 .073.271l-.802 1.388a.199.199 0 0 1-.271.073C10.958 10.863 9 11.993 9 13.8a.2.2 0 0 1-.199.2H7.2a.199.199 0 0 1-.2-.2c0-1.808-1.958-2.938-3.524-2.034a.199.199 0 0 1-.272-.073l-.8-1.388a.199.199 0 0 1 .072-.271c1.566-.905 1.566-3.165 0-4.07a.199.199 0 0 1-.073-.271l.801-1.388a.199.199 0 0 1 .272-.073C5.042 5.138 7 4.007 7 2.2c0-.11.089-.199.199-.199ZM5.5 2.2c0-.94.76-1.7 1.699-1.7H8.8c.94 0 1.7.76 1.7 1.7a.85.85 0 0 0 1.274.735 1.699 1.699 0 0 1 2.32.622l.802 1.388c.469.813.19 1.851-.622 2.32a.85.85 0 0 0 0 1.472 1.7 1.7 0 0 1 .622 2.32l-.802 1.388a1.699 1.699 0 0 1-2.32.622.85.85 0 0 0-1.274.735c0 .939-.76 1.7-1.699 1.7H7.2a1.7 1.7 0 0 1-1.699-1.7.85.85 0 0 0-1.274-.735 1.698 1.698 0 0 1-2.32-.622l-.802-1.388a1.699 1.699 0 0 1 .622-2.32.85.85 0 0 0 0-1.471 1.699 1.699 0 0 1-.622-2.321l.801-1.388a1.699 1.699 0 0 1 2.32-.622A.85.85 0 0 0 5.5 2.2Zm4 5.8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clip-rule="evenodd"></path></svg></svg>
        )} size={16} />
    }>
        <span>Close action and icon</span>
    </UIKit.Label>
    <UIKit.Label size="m" icon={
        <UIKit.Icon data={() => (
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" class="yc-icon" fill="currentColor" stroke="none" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M7.199 2H8.8a.2.2 0 0 1 .2.2c0 1.808 1.958 2.939 3.524 2.034a.199.199 0 0 1 .271.073l.802 1.388a.199.199 0 0 1-.073.272c-1.566.904-1.566 3.164 0 4.069a.199.199 0 0 1 .073.271l-.802 1.388a.199.199 0 0 1-.271.073C10.958 10.863 9 11.993 9 13.8a.2.2 0 0 1-.199.2H7.2a.199.199 0 0 1-.2-.2c0-1.808-1.958-2.938-3.524-2.034a.199.199 0 0 1-.272-.073l-.8-1.388a.199.199 0 0 1 .072-.271c1.566-.905 1.566-3.165 0-4.07a.199.199 0 0 1-.073-.271l.801-1.388a.199.199 0 0 1 .272-.073C5.042 5.138 7 4.007 7 2.2c0-.11.089-.199.199-.199ZM5.5 2.2c0-.94.76-1.7 1.699-1.7H8.8c.94 0 1.7.76 1.7 1.7a.85.85 0 0 0 1.274.735 1.699 1.699 0 0 1 2.32.622l.802 1.388c.469.813.19 1.851-.622 2.32a.85.85 0 0 0 0 1.472 1.7 1.7 0 0 1 .622 2.32l-.802 1.388a1.699 1.699 0 0 1-2.32.622.85.85 0 0 0-1.274.735c0 .939-.76 1.7-1.699 1.7H7.2a1.7 1.7 0 0 1-1.699-1.7.85.85 0 0 0-1.274-.735 1.698 1.698 0 0 1-2.32-.622l-.802-1.388a1.699 1.699 0 0 1 .622-2.32.85.85 0 0 0 0-1.471 1.699 1.699 0 0 1-.622-2.321l.801-1.388a1.699 1.699 0 0 1 2.32-.622A.85.85 0 0 0 5.5 2.2Zm4 5.8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clip-rule="evenodd"></path></svg></svg>
        )} size={16} />
    }>
        <span>M-size icon</span>
    </UIKit.Label>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Label size="s" icon={<Icon size={16} data={GearIcon} />}>Default with icon</Label>
<Label theme="info" size="s" icon={<Icon size={16} data={GearIcon} />}>Info with icon</Label>
<Label type="close" size="s" icon={<Icon size={16} data={GearIcon} />}>Close action and icon</Label>
<Label size="m" icon={<Icon data={GearIcon} />}>M-size icon</Label>
```

<!--/GITHUB_BLOCK-->

## Label value

Label with value property for display key-value pairs. Can be useful for display object properties or tags.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Label size="xs" value="Value">Key</Label>
<Label size="s" value="Value">Key</Label>
<Label size="m" value="Value">Key</Label>
`}
>
    <UIKit.Label size="xs" value="Value">Key</UIKit.Label>
    <UIKit.Label size="s" value="Value">Key</UIKit.Label>
    <UIKit.Label size="m" value="Value">Key</UIKit.Label>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Label size="xs" value="Value">Key</Label>
<Label size="s" value="Value">Key</Label>
<Label size="m" value="Value">Key</Label>
```

<!--/GITHUB_BLOCK-->

## States

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Label size="s">Default</Label>
<Label size="s" disabled>Disabled</Label>
<Label size="s" interactive>Interactive</Label>
`}
>
    <UIKit.Label size="s">Default</UIKit.Label>
    <UIKit.Label size="s" disabled>Disabled</UIKit.Label>
    <UIKit.Label size="s" interactive>Interactive</UIKit.Label>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Label size="s">Default</Label>
<Label size="s" disabled>Disabled</Label>
<Label size="s" interactive>Interactive</Label>
```

<!--/GITHUB_BLOCK-->

1. Default – The main state of a label without interactive.
2. Disabled – The state when a label is indicated some property in unavailable.
3. Interactive – The state of a label with hover effect.

## Size

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Label size="xs">XS-size</Label>
<Label size="s">S-size</Label>
<Label size="m">M-size</Label>
`}
>
    <UIKit.Label size="xs">XS-size</UIKit.Label>
    <UIKit.Label size="s">S-size</UIKit.Label>
    <UIKit.Label size="m">M-size</UIKit.Label>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Label size="xs">XS-size</Label>
<Label size="s">S-size</Label>
<Label size="m">M-size</Label>
```

<!--/GITHUB_BLOCK-->

XS – Used for small labels with simple to highlight a some small attribute.

S – Basic size, used in most components.

M – Used when standard labels are too small.

## Properties

| Name                 | Description                                                                                      | Default |
| :------------------- | :----------------------------------------------------------------------------------------------- | :-----: |
| **icon**             | Label icon (at left) `ReactNode`                                                                 |    -    |
| **disabled**         | Disabled state `boolean`                                                                         |    -    |
| **onClose**          | Handler for click on close button `((event: MouseEvent<HTMLButtonElement, MouseEvent>) => void)` |    -    |
| **copyText**         | Text to copy `string`                                                                            |    -    |
| **closeButtonLabel** | `aria-label` of close button `string`                                                            |    -    |
| **copyButtonLabel**  | `aria-label` of copy button `string`                                                             |    -    |
| **onCopy**           | Handler for copy event `((text: string, result: boolean) => void)`                               |    -    |
| **onClick**          | Handler for click on label itself `((event: MouseEvent<HTMLDivElement, MouseEvent>) => void)`    |    -    |
| **className**        | Class name `string`                                                                              |    -    |
| **children**         | Content `ReactNode`                                                                              |    -    |
| **interactive**      | Display hover `boolean`                                                                          |    -    |
| **value**            | Label value (shows as "children : value") `string`                                               |    -    |
| **theme**            | Label color: `"normal"` `"info"` `"danger"` `"warning"` `"success"` `"unknown"` `"clear"`        |    -    |
| **type**             | Label type (plain, with copy text button or with close button): `"default"` `"copy"` `"close"`   |    -    |
| **size**             | Label size: `"xs"` `"s"` `"m"`                                                                   |    -    |
